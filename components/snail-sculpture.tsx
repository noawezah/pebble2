"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { sculptureSilhouettes } from "@/lib/sculpture-silhouette";

export default function SnailSculpture({
  locale = "en",
}: {
  locale?: "en" | "ro";
}) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let disposed = false;
    let cleanup = () => {};
    const controller = new AbortController();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 700px)");
    async function init() {
      const [THREE, { SVGLoader }, { mergeVertices }, svg] = await Promise.all([
        import("three"),
        import("three/addons/loaders/SVGLoader.js"),
        import("three/addons/utils/BufferGeometryUtils.js"),
        fetch("/images/snail-sculpture.svg", {
          signal: controller.signal,
        }).then((r) => {
          if (!r.ok) throw new Error("Sculpture unavailable");
          return r.text();
        }),
      ]);
      if (disposed || !element) return;
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, mobile.matches ? 1.25 : 1.5),
      );
      renderer.setClearColor(0x000000, 0);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, 1, 1, 1600);
      camera.position.set(0, 0, 690);
      const sculpture = new THREE.Group();
      const material = new THREE.MeshStandardMaterial({
        color: 0x969694,
        roughness: 0.94,
        metalness: 0,
      });
      const geometries: InstanceType<typeof THREE.BufferGeometry>[] = [];
      const outlines: {
        part: InstanceType<typeof THREE.Mesh>;
        points: InstanceType<typeof THREE.Vector3>[];
      }[] = [];
      // A failed geometry setup must leave the original SVG visible and release WebGL.
      cleanup = () => {
        geometries.forEach((geometry) => geometry.dispose());
        material.dispose();
        renderer.dispose();
        renderer.domElement.remove();
        delete element.dataset.ready;
      };
      const paths = new SVGLoader().parse(svg).paths;
      for (const path of paths)
        for (const shape of path.toShapes()) {
          const raw = new THREE.ExtrudeGeometry(shape, {
            depth: 22,
            bevelEnabled: true,
            bevelThickness: 6,
            bevelSize: 2,
            bevelSegments: 8,
            steps: 1,
            curveSegments: 28,
          });
          raw.deleteAttribute("normal");
          raw.deleteAttribute("uv");
          const geometry = mergeVertices(raw, 0.0001);
          geometry.computeVertexNormals();
          raw.dispose();
          geometry.translate(-125, -156, -14);
          geometry.scale(1, -1, 1);
          geometries.push(geometry);
          const part = new THREE.Mesh(geometry, material);
          part.name =
            (path.userData?.node as Element | undefined)?.id || "part";
          sculpture.add(part);
          outlines.push({
            part,
            points: shape
              .getPoints(24)
              .map((p) => new THREE.Vector3(p.x - 125, 156 - p.y, 14)),
          });
        }
      scene.add(sculpture);
      scene.add(new THREE.HemisphereLight(0xffffff, 0x555555, 2.2));
      const key = new THREE.DirectionalLight(0xffffff, 3.2);
      key.position.set(-200, 250, 350);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0xffffff, 1.1);
      rim.position.set(220, 0, -100);
      scene.add(rim);
      element.appendChild(renderer.domElement);
      const needsSilhouette = !!element
        .closest("section")
        ?.querySelector(".photo-contrast-text");
      let visible = false,
        frame = 0,
        pointerX = 0,
        pointerY = 0;
      const draw = () => {
        frame = 0;
        if (disposed || !visible || document.hidden) return;
        const bounds = element.getBoundingClientRect();
        const progress = Math.max(
          -1,
          Math.min(
            1,
            (window.innerHeight / 2 - bounds.top - bounds.height / 2) /
              (window.innerHeight * 0.65),
          ),
        );
        const targetY = reduced.matches
          ? -0.18
          : progress * 0.5 + pointerX * 0.16;
        const targetX = reduced.matches ? 0.04 : pointerY * 0.12;
        const moving =
          !reduced.matches &&
          (Math.abs(targetY - sculpture.rotation.y) > 0.0001 ||
            Math.abs(targetX - sculpture.rotation.x) > 0.0001);
        sculpture.rotation.y = moving
          ? sculpture.rotation.y + (targetY - sculpture.rotation.y) * 0.065
          : targetY;
        sculpture.rotation.x = moving
          ? sculpture.rotation.x + (targetX - sculpture.rotation.x) * 0.065
          : targetX;
        sculpture.rotation.z =
          (mobile.matches ? Math.PI / 9 : 0) +
          (reduced.matches ? -0.035 : progress * 0.09);
        sculpture.position.y = reduced.matches ? 0 : progress * 30;
        // Each logo part meets its exact home coordinates at viewport centre.
        const separation = reduced.matches
          ? 0
          : Math.pow(Math.abs(progress), 1.35);
        const travel = {
          body: [12, 18, 7],
          shell: [-20, 5, 12],
          pebble: [8, -18, -7],
        };
        sculpture.children.forEach((part) => {
          const offset = travel[part.name as keyof typeof travel] || [0, 0, 0];
          part.position.set(
            offset[0] * separation,
            offset[1] * separation,
            offset[2] * separation,
          );
          part.rotation.y = separation * (part.name === "shell" ? -0.08 : 0.05);
        });
        element.dataset.assembly = separation < 0.02 ? "joined" : "separated";
        renderer.render(scene, camera);
        element.dataset.ready = "true";
        if (needsSilhouette) {
          sculptureSilhouettes.set(
            element,
            outlines.map(({ part, points }) =>
              points.map((point) => {
                const projected = point
                  .clone()
                  .applyMatrix4(part.matrixWorld)
                  .project(camera);
                return [
                  ((projected.x + 1) * bounds.width) / 2,
                  ((1 - projected.y) * bounds.height) / 2,
                ];
              }),
            ),
          );
        }
        // Once the original easing settles, another interaction restarts drawing.
        if (moving) frame = requestAnimationFrame(draw);
      };
      const requestDraw = () => {
        if (!disposed && !frame && visible && !document.hidden)
          frame = requestAnimationFrame(draw);
      };
      const resize = new ResizeObserver(() => {
        const width = element.clientWidth,
          height = element.clientHeight;
        if (!width || !height) return;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        requestDraw();
      });
      resize.observe(element);
      const observer = new IntersectionObserver(
        (entries) => {
          visible = entries[0].isIntersecting;
          if (visible) requestDraw();
          else {
            cancelAnimationFrame(frame);
            frame = 0;
          }
        },
        { rootMargin: "120px" },
      );
      observer.observe(element);
      const move = (event: PointerEvent) => {
        if (event.pointerType !== "mouse" || reduced.matches) return;
        const b = element.getBoundingClientRect();
        pointerX = (event.clientX - b.left) / b.width - 0.5;
        pointerY = (event.clientY - b.top) / b.height - 0.5;
        requestDraw();
      };
      const leave = () => {
        pointerX = 0;
        pointerY = 0;
        if (!reduced.matches) requestDraw();
      };
      const scroll = () => {
        if (!reduced.matches) requestDraw();
      };
      const visibility = () => {
        if (document.hidden) {
          cancelAnimationFrame(frame);
          frame = 0;
        } else requestDraw();
      };
      element.addEventListener("pointermove", move);
      element.addEventListener("pointerleave", leave);
      window.addEventListener("scroll", scroll, { passive: true });
      window.addEventListener("resize", requestDraw);
      document.addEventListener("visibilitychange", visibility);
      reduced.addEventListener("change", requestDraw);
      mobile.addEventListener("change", requestDraw);
      cleanup = () => {
        sculptureSilhouettes.delete(element);
        cancelAnimationFrame(frame);
        observer.disconnect();
        resize.disconnect();
        element.removeEventListener("pointermove", move);
        element.removeEventListener("pointerleave", leave);
        window.removeEventListener("scroll", scroll);
        window.removeEventListener("resize", requestDraw);
        document.removeEventListener("visibilitychange", visibility);
        reduced.removeEventListener("change", requestDraw);
        mobile.removeEventListener("change", requestDraw);
        geometries.forEach((g) => g.dispose());
        material.dispose();
        renderer.dispose();
        renderer.domElement.remove();
        delete element.dataset.ready;
      };
    }
    let inRange = false;
    let attempted = false;
    const begin = () => {
      if (
        disposed ||
        attempted ||
        !inRange ||
        reduced.matches ||
        document.hidden
      )
        return;
      attempted = true;
      lazy.disconnect();
      init().catch(() => cleanup());
    };
    const lazy = new IntersectionObserver(
      (entries) => {
        inRange = entries[0].isIntersecting;
        begin();
      },
      { rootMargin: "400px" },
    );
    lazy.observe(element);
    reduced.addEventListener("change", begin);
    document.addEventListener("visibilitychange", begin);
    return () => {
      disposed = true;
      controller.abort();
      lazy.disconnect();
      reduced.removeEventListener("change", begin);
      document.removeEventListener("visibilitychange", begin);
      cleanup();
    };
  }, []);
  return (
    <div
      id="snail-sculpture"
      className="snail-sculpture"
      ref={host}
      role="img"
      aria-label={
        locale === "ro"
          ? "Melcul PEBBLE, un mic îndemn să încetinești"
          : "The PEBBLE snail, a little reminder to slow down"
      }
    >
      <Image
        className="snail-fallback"
        src="/images/snail.svg"
        alt=""
        fill
        sizes="(max-width: 700px) 56vw, 240px"
      />
    </div>
  );
}
