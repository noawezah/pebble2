"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { preparePageAssets } from "@/lib/page-readiness";

type RevealReason = "ready" | "timeout" | "error";
type StaticReason =
  | "reduced-motion"
  | "deep-link"
  | "restored-scroll"
  | "missing-mark"
  | "webgl-unavailable"
  | "context-lost";

export default function LoadingIntro({ locale }: { locale: "en" | "ro" }) {
  const host = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hostElement = host.current;
    if (!hostElement) return;
    const element = hostElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const controller = new AbortController();
    const previousOverflow = document.documentElement.style.overflow;
    const previousFocus = document.activeElement;
    let site: HTMLElement | null = null;
    let mark: HTMLImageElement | null = null;
    let previousInert = false;
    let previousOpacity = "";
    let stopped = false;
    let visualCancelled = false;
    let allReady = false;
    let readinessRatio = 0;
    let readiness: Promise<void> | undefined;
    let timeline: gsap.core.Timeline | undefined;
    let frame = 0;
    let deadline = 0;
    let dispose = () => {};
    let finishAssembly = () => {};

    const stopVisual = () => {
      timeline?.kill();
      timeline = undefined;
      finishAssembly();
      cancelAnimationFrame(frame);
      dispose();
      dispose = () => {};
      if (mark) mark.style.opacity = previousOpacity;
    };
    const restorePage = () => {
      document.documentElement.style.overflow = previousOverflow;
      if (site) {
        site.inert = previousInert;
        site.dataset.introState = "ready";
      }
    };
    const finish = (reason: RevealReason) => {
      if (stopped) return;
      stopped = true;
      clearTimeout(deadline);
      controller.abort();
      stopVisual();
      const moveFocus = element.contains(document.activeElement);
      element.hidden = true;
      restorePage();
      document.dispatchEvent(
        new CustomEvent("pebble:ready", { detail: { reason } }),
      );
      if (moveFocus) {
        if (
          previousFocus instanceof HTMLElement &&
          previousFocus !== document.body &&
          previousFocus.isConnected
        ) {
          previousFocus.focus({ preventScroll: true });
        } else {
          const main = site?.querySelector<HTMLElement>("main");
          if (main) {
            const previousTabIndex = main.getAttribute("tabindex");
            main.tabIndex = -1;
            main.focus({ preventScroll: true });
            if (previousTabIndex === null) main.removeAttribute("tabindex");
            else main.setAttribute("tabindex", previousTabIndex);
          }
        }
      }
    };
    const staticUntilReady = (reason: StaticReason) => {
      if (stopped) return;
      visualCancelled = true;
      stopVisual();
      element.dataset.phase = "static";
      element.dataset.fallbackReason = reason;
      // Reduced motion removes the 3D choreography, while the page still prepares.
      void readiness?.then(() => finish("ready"));
    };
    const motionChanged = () => {
      if (reduced.matches) staticUntilReady("reduced-motion");
    };
    element.hidden = false;
    element.dataset.phase = "preparing";
    delete element.dataset.fallbackReason;
    element.setAttribute("aria-busy", "true");
    reduced.addEventListener("change", motionChanged);
    deadline = window.setTimeout(() => finish("timeout"), 8500);

    // Discover sibling SSR content after mounting, including its real srcset selection.
    frame = requestAnimationFrame(() => {
      if (stopped) return;
      site = document.querySelector<HTMLElement>(".cafe");
      if (!site) return finish("error");
      mark = site.querySelector<HTMLImageElement>(
        ".cafe-header .brand-lockup img",
      );
      previousInert = site.inert;
      previousOpacity = mark?.style.opacity ?? "";
      site.inert = true;
      site.dataset.introState = "loading";
      document.documentElement.style.overflow = "hidden";
      element.focus({ preventScroll: true });

      const images = Array.from(
        site.querySelectorAll<HTMLImageElement>(
          "main img, img[data-preload-image]",
        ),
      );
      const hero = site.querySelector<HTMLImageElement>(
        ".pebble-hero-photo img, .cafe-main-photo img, img[data-preload-image='hero']",
      );
      if (hero) {
        const index = images.indexOf(hero);
        if (index >= 0) images.splice(index, 1);
        images.unshift(hero);
      }
      if (mark && !images.includes(mark)) images.push(mark);
      progress.current?.setAttribute("aria-valuenow", "0");
      const connection = (
        navigator as Navigator & { connection?: { saveData?: boolean } }
      ).connection;
      const weakDevice = Boolean(
        connection?.saveData ||
        (navigator.hardwareConcurrency > 0 &&
          navigator.hardwareConcurrency <= 4),
      );
      readiness = preparePageAssets({
        images,
        fontReady: document.fonts.ready,
        concurrency: weakDevice ? 1 : 2,
        signal: controller.signal,
        onProgress: (completed, total) => {
          if (stopped) return;
          readinessRatio = completed / total;
          progress.current?.setAttribute(
            "aria-valuenow",
            String(Math.round(readinessRatio * 100)),
          );
        },
      }).then(() => {
        if (!stopped) allReady = true;
      });
      if (
        !mark ||
        reduced.matches ||
        location.hash ||
        window.scrollY > 40 ||
        visualCancelled
      ) {
        staticUntilReady(
          !mark
            ? "missing-mark"
            : reduced.matches || visualCancelled
              ? "reduced-motion"
              : location.hash
                ? "deep-link"
                : "restored-scroll",
        );
        return;
      }
      mark.style.opacity = "0";

      async function start() {
        const [
          THREE,
          { SVGLoader },
          { mergeVertices },
          { RoomEnvironment },
          source,
        ] = await Promise.all([
          import("three"),
          import("three/addons/loaders/SVGLoader.js"),
          import("three/addons/utils/BufferGeometryUtils.js"),
          import("three/addons/environments/RoomEnvironment.js"),
          fetch("/images/snail-sculpture.svg", {
            signal: controller.signal,
          }).then((r) => {
            if (!r.ok) throw new Error("Logo unavailable");
            return r.text();
          }),
        ]);
        if (stopped || visualCancelled) return;
        const cleanups: (() => void)[] = [];
        dispose = () => {
          for (const cleanup of cleanups.splice(0).reverse()) {
            try {
              cleanup();
            } catch {
              /* Continue releasing the remaining GPU resources. */
            }
          }
        };
        const renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
        });
        cleanups.push(() => {
          renderer.dispose();
          renderer.forceContextLoss();
          renderer.domElement.remove();
        });
        renderer.setPixelRatio(
          Math.min(devicePixelRatio, weakDevice ? 1.25 : 1.75),
        );
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(
          -innerWidth / 2,
          innerWidth / 2,
          innerHeight / 2,
          -innerHeight / 2,
          1,
          3000,
        );
        camera.position.z = 1500;
        const environment = new RoomEnvironment();
        cleanups.push(() => environment.dispose());
        const pmrem = new THREE.PMREMGenerator(renderer);
        cleanups.push(() => pmrem.dispose());
        const environmentMap = pmrem.fromScene(environment, 0.04);
        cleanups.push(() => environmentMap.dispose());
        scene.environment = environmentMap.texture;
        environment.dispose();
        pmrem.dispose();

        // Original continuous onyx mineral finish and original three-piece geometry.
        const stone = document.createElement("canvas");
        stone.width = stone.height = 512;
        const ctx = stone.getContext("2d")!;
        const pixels = ctx.createImageData(512, 512);
        for (let y = 0; y < 512; y++)
          for (let x = 0; x < 512; x++) {
            const band =
              y * 0.058 +
              Math.sin(x * 0.011) * 3 +
              Math.sin(x * 0.026 + y * 0.008) * 1.2;
            const vein = Math.pow((Math.sin(band) + 1) / 2, 16);
            const tone = 18 + Math.sin(band * 0.4) * 5 + vein * 28;
            const i = (y * 512 + x) * 4;
            pixels.data[i] = tone + 5;
            pixels.data[i + 1] = tone + 7;
            pixels.data[i + 2] = tone;
            pixels.data[i + 3] = 255;
          }
        ctx.putImageData(pixels, 0, 0);
        const texture = new THREE.CanvasTexture(stone);
        cleanups.push(() => texture.dispose());
        texture.colorSpace = THREE.SRGBColorSpace;
        const material = new THREE.MeshPhysicalMaterial({
          map: texture,
          color: 0x181818,
          roughness: 0.36,
          metalness: 0,
          clearcoat: 0.08,
          clearcoatRoughness: 0.2,
          transparent: true,
          opacity: 0.9,
          depthWrite: false,
          side: THREE.FrontSide,
          envMapIntensity: 0.12,
        });
        cleanups.push(() => material.dispose());
        const logo = new THREE.Group();
        scene.add(logo);
        scene.add(new THREE.HemisphereLight(0xffffff, 0x76766e, 2));
        const light = new THREE.DirectionalLight(0xffffff, 3);
        light.position.set(-300, 450, 650);
        scene.add(light);
        const parts: {
          mesh: InstanceType<typeof THREE.Mesh>;
          home: InstanceType<typeof THREE.Vector3>;
          direction: number[];
        }[] = [];
        const directions: Record<string, number[]> = {
          body: [0.85, 0.7],
          shell: [-0.9, 0.2],
          pebble: [0.4, -0.85],
        };
        for (const path of new SVGLoader().parse(source).paths) {
          for (const shape of path.toShapes()) {
            const raw = new THREE.ExtrudeGeometry(shape, {
              depth: 22,
              bevelEnabled: true,
              bevelThickness: 6,
              bevelSize: 2,
              bevelSegments: 12,
              curveSegments: 40,
            });
            cleanups.push(() => raw.dispose());
            raw.deleteAttribute("normal");
            raw.deleteAttribute("uv");
            const geometry = mergeVertices(raw, 0.0001);
            cleanups.push(() => geometry.dispose());
            raw.dispose();
            geometry.computeVertexNormals();
            const positions = geometry.getAttribute("position");
            const uv = new Float32Array(positions.count * 2);
            for (let i = 0; i < positions.count; i++) {
              uv[i * 2] = positions.getX(i) / 250;
              uv[i * 2 + 1] = positions.getY(i) / 312;
            }
            geometry.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
            geometry.translate(-125, -156, -14);
            geometry.scale(1, -1, 1);
            geometry.computeBoundingBox();
            const home = geometry.boundingBox!.getCenter(new THREE.Vector3());
            geometry.translate(-home.x, -home.y, -home.z);
            const mesh = new THREE.Mesh(geometry, material);
            const name =
              (path.userData?.node as Element | undefined)?.id || "body";
            logo.add(mesh);
            parts.push({
              mesh,
              home,
              direction: directions[name] || directions.body,
            });
          }
        }
        element.querySelector(".intro-stage")!.appendChild(renderer.domElement);
        const motion = { assembly: 0, flight: 0, fade: 0 };
        const resize = () => {
          renderer.setSize(innerWidth, innerHeight);
          camera.left = -innerWidth / 2;
          camera.right = innerWidth / 2;
          camera.top = innerHeight / 2;
          camera.bottom = -innerHeight / 2;
          camera.updateProjectionMatrix();
        };
        resize();
        window.addEventListener("resize", resize);
        cleanups.push(() => window.removeEventListener("resize", resize));
        const contextLost = (event: Event) => {
          event.preventDefault();
          staticUntilReady("context-lost");
        };
        renderer.domElement.addEventListener("webglcontextlost", contextLost);
        cleanups.push(() =>
          renderer.domElement.removeEventListener(
            "webglcontextlost",
            contextLost,
          ),
        );

        let assemblyDone = false;
        let pace = allReady ? 1 : 0.8;
        let lastRender = 0;
        let lastPace = performance.now();
        let renderCost = 0;
        let idleAmount = 0;
        const assembled = new Promise<void>((resolve) => {
          finishAssembly = resolve;
        });
        element.dataset.phase = "assembling";
        timeline = gsap.timeline({
          onComplete: () => {
            assemblyDone = true;
            finishAssembly();
          },
        });
        timeline
          .to(motion, { assembly: 1, duration: 2.1, ease: "power3.out" })
          .timeScale(pace);
        const draw = (now: number) => {
          if (stopped || visualCancelled) return;
          frame = requestAnimationFrame(draw);
          // Keep the same geometry and finish, while limiting GPU work on weaker devices.
          if (now - lastRender < (weakDevice ? 1000 / 30 : 1000 / 60) - 1)
            return;
          lastRender = now;
          if (!assemblyDone && timeline) {
            const readyPace = allReady ? 1 : 0.65 + readinessRatio * 0.35;
            const targetPace =
              renderCost > 25 ? Math.min(0.8, readyPace) : readyPace;
            pace += (targetPace - pace) * Math.min(1, (now - lastPace) / 300);
            timeline.timeScale(pace);
          }
          lastPace = now;
          idleAmount +=
            ((assemblyDone && !allReady ? 1 : 0) - idleAmount) * 0.1;
          const size =
            Math.min(innerWidth * 0.58, innerHeight * 0.46, 350) / 312;
          const target = mark!.getBoundingClientRect();
          const scale = THREE.MathUtils.lerp(
            size,
            target.height / 312,
            motion.flight,
          );
          const idle =
            Math.sin(now * 0.0016) * idleAmount * (1 - motion.flight);
          logo.scale.setScalar(scale);
          logo.position.set(
            (target.left + target.width / 2 - innerWidth / 2) * motion.flight,
            (innerHeight / 2 - target.top - target.height / 2) * motion.flight +
              idle * 3,
            0,
          );
          logo.rotation.y =
            (1 - motion.flight) * -0.18 * motion.assembly + idle * 0.025;
          const spread = 1 - motion.assembly;
          parts.forEach(({ mesh, home, direction }, i) => {
            mesh.position.set(
              home.x + ((direction[0] * innerWidth * 0.62) / size) * spread,
              home.y + ((direction[1] * innerHeight * 0.64) / size) * spread,
              home.z,
            );
            mesh.rotation.set(
              spread * (i + 1) * Math.PI,
              spread * Math.PI * (i % 2 ? -2 : 2),
              spread * (i % 2 ? -1 : 1) * Math.PI,
            );
            mesh.scale.setScalar(1 + spread * 1.1);
          });
          material.opacity = 0.9 * (1 - motion.fade);
          mark!.style.opacity = String(motion.fade);
          const renderStarted = performance.now();
          renderer.render(scene, camera);
          renderCost += (performance.now() - renderStarted - renderCost) * 0.15;
        };
        draw(performance.now());
        // Dock only after all displayed photos and fonts have loaded and decoded.
        await Promise.all([assembled, readiness]);
        if (stopped || visualCancelled) return;
        // Readiness can finish near its deadline; let the full docking crossfade complete.
        clearTimeout(deadline);
        deadline = window.setTimeout(() => finish("timeout"), 4000);
        element.dataset.phase = "docking";
        timeline = gsap.timeline({ onComplete: () => finish("ready") });
        timeline
          .to(
            element.querySelector(".intro-backdrop"),
            { opacity: 0, duration: 1.15 },
            0.15,
          )
          .to(motion, { flight: 1, duration: 1.55, ease: "power3.inOut" }, 0.15)
          .to(motion, { fade: 1, duration: 0.28, ease: "power1.inOut" }, 1.53);
      }
      void start().catch((error: unknown) => {
        // If WebGL is unavailable, preserve readiness rather than exposing half-loaded content.
        if (!stopped) {
          if (process.env.NODE_ENV !== "production")
            console.warn(
              "PEBBLE 3D intro used the static readiness fallback.",
              error,
            );
          staticUntilReady("webgl-unavailable");
        }
      });
    });

    return () => {
      stopped = true;
      controller.abort();
      clearTimeout(deadline);
      stopVisual();
      reduced.removeEventListener("change", motionChanged);
      element.hidden = true;
      restorePage();
    };
  }, [locale]);

  const ro = locale === "ro";
  return (
    <div
      className="cafe-intro"
      ref={host}
      role="dialog"
      aria-modal="true"
      aria-label={ro ? "Bine ai venit la PEBBLE" : "Welcome to PEBBLE"}
      aria-busy="true"
      tabIndex={-1}
    >
      <div className="intro-backdrop" />
      <div className="intro-stage" aria-hidden="true" />
      <div className="intro-static" aria-hidden="true">
        <svg viewBox="0 0 250 312" fill="currentColor">
          <path d="M108 41 C103 33 99 18 106 11 C112 5 123 10 118 19 C115 26 108 20 108 24 C108 29 111 34 115 37 C119 36 122 35 127 35 C127 25 132 14 140 11 C150 7 153 20 146 24 C141 28 137 22 137 23 C134 27 133 31 133 35 C153 37 172 55 171 72 C171 84 159 88 159 95 C159 111 194 132 204 151 C218 177 198 193 177 198 C138 204 91 218 38 239 C38 221 47 210 60 204 C81 201 93 191 97 178 C116 181 141 167 144 151 C150 127 123 105 108 92 C88 77 89 54 108 41 Z" />
          <path d="M100 170 C126 174 140 155 132 136 C120 110 93 93 66 93 C36 92 12 117 11 146 C9 171 26 192 49 196 C72 201 89 186 90 165 C90 146 79 134 65 135 C52 135 46 145 47 156 C47 165 53 171 61 169 C66 168 69 163 69 158 C74 166 67 174 57 174 C44 174 39 162 40 150 C40 135 51 125 65 126 C87 124 103 145 100 170 Z" />
          <path d="M22 265 C33 244 85 220 145 210 C191 198 222 221 235 251 C243 273 237 283 218 291 C178 308 90 307 54 300 C25 295 14 282 22 265 Z" />
        </svg>
      </div>
      <div className="intro-live" role="status" aria-live="polite">
        {ro
          ? "Pregătim fotografiile și fonturile."
          : "Preparing the photographs and fonts."}
      </div>
      <div
        className="intro-live"
        ref={progress}
        role="progressbar"
        aria-label={ro ? "Pregătim site-ul" : "Preparing the website"}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={0}
      />
      <noscript>
        <style>{`.cafe-intro { display: none !important; }`}</style>
      </noscript>
    </div>
  );
}
