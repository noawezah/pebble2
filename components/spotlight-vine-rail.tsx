import { useId } from "react";

type Tone = "light" | "dark";

type SpotlightRailProps = {
  variant: number;
  tone?: Tone;
  id?: string;
  className?: string;
  compact?: boolean;
};

type Palette = {
  track: string;
  metal: string;
  highlight: string;
  wire: string;
  leaf: string;
  leafLight: string;
  glow: string;
};

type Point = { x: number; y: number };

const round = (value: number) => Math.round(value * 10) / 10;
const roundScale = (value: number) => Math.round(value * 100) / 100;

// The six section dividers use fixed seeds. This keeps their compositions varied
// while producing identical SVG markup on the server and in the browser.
function seededRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function cubicPoint(start: Point, control1: Point, control2: Point, end: Point, t: number): Point {
  const inverse = 1 - t;
  return {
    x:
      inverse ** 3 * start.x +
      3 * inverse ** 2 * t * control1.x +
      3 * inverse * t ** 2 * control2.x +
      t ** 3 * end.x,
    y:
      inverse ** 3 * start.y +
      3 * inverse ** 2 * t * control1.y +
      3 * inverse * t ** 2 * control2.y +
      t ** 3 * end.y,
  };
}

function IvyLeaf({ x, y, angle, scale, color, shapeId, veinColor }: {
  x: number;
  y: number;
  angle: number;
  scale: number;
  color: string;
  shapeId: string;
  veinColor: string;
}) {
  return (
    <use
      href={`#${shapeId}`}
      transform={`translate(${round(x)} ${round(y)}) rotate(${round(angle)}) scale(${roundScale(scale)})`}
      fill={color}
      color={veinColor}
    />
  );
}

function FernSprig({ x, y, scale, angle, shapeId }: {
  x: number;
  y: number;
  scale: number;
  angle: number;
  shapeId: string;
}) {
  return (
    <use href={`#${shapeId}`} transform={`translate(${round(x)} ${round(y)}) rotate(${round(angle)}) scale(${roundScale(scale)})`} />
  );
}

function HangingVine({ x, railY, length, sway, leafCount, leafScale, palette, seed, ivyId }: {
  x: number;
  railY: number;
  length: number;
  sway: number;
  leafCount: number;
  leafScale: number;
  palette: Palette;
  seed: number;
  ivyId: string;
}) {
  const random = seededRandom(seed);
  const start = { x, y: railY - 5 };
  const control1 = { x: x + sway * 0.6, y: railY + length * 0.2 };
  const control2 = { x: x - sway * 0.85, y: railY + length * 0.74 };
  const end = { x: x + sway, y: railY + length };
  const leaves = Array.from({ length: leafCount }, (_, index) => {
    const t = 0.17 + (index / Math.max(1, leafCount - 1)) * 0.7;
    const point = cubicPoint(start, control1, control2, end, t);
    const side = index % 2 === 0 ? -1 : 1;
    return {
      ...point,
      angle: side * (48 + random() * 30),
      scale: leafScale * (0.7 + random() * 0.5),
      color: index % 3 === 0 ? palette.leafLight : palette.leaf,
    };
  });

  return (
    <>
      <path
        d={`M${round(start.x)} ${round(start.y)} C${round(control1.x)} ${round(control1.y)} ${round(control2.x)} ${round(control2.y)} ${round(end.x)} ${round(end.y)}`}
        fill="none"
        stroke={palette.leaf}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {leaves.map((leaf, index) => <IvyLeaf key={index} {...leaf} shapeId={ivyId} veinColor={palette.track} />)}
    </>
  );
}

function Spotlight({ x, railY, angle, scale, hangerId, fixtureId }: {
  x: number;
  railY: number;
  angle: number;
  scale: number;
  hangerId: string;
  fixtureId: string;
}) {
  return (
    <g transform={`translate(${round(x)} ${railY + 4}) scale(${roundScale(scale)})`}>
      <use href={`#${hangerId}`} />
      <use href={`#${fixtureId}`} transform={`rotate(${round(angle)} 0 14)`} />
    </g>
  );
}

function RailScene({ variant, tone, mobile, compact }: { variant: number; tone: Tone; mobile: boolean; compact: boolean }) {
  // useId keeps fragment references unique even if a layout variant is reused.
  const shapePrefix = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const sprigId = `${shapePrefix}-sprig`;
  const ivyId = `${shapePrefix}-ivy`;
  const hangerId = `${shapePrefix}-hanger`;
  const fixtureId = `${shapePrefix}-fixture`;
  const width = mobile ? 390 : 1800;
  const height = compact ? (mobile ? 104 : 150) : (mobile ? 164 : 250);
  const railY = compact ? (mobile ? 34 : 50) : (mobile ? 52 : 79);
  const foliageScale = compact ? 0.62 : 1;
  const random = seededRandom(0x51a7 + (Math.abs(Math.trunc(variant)) % 6) * 997 + (mobile ? 47 : 0));
  const palette: Palette = tone === "dark"
    ? {
        track: "#aeb5a7",
        metal: "#dddcd1",
        highlight: "#faf7e9",
        wire: "#b8bfb1",
        leaf: "#93aa83",
        leafLight: "#bdcba8",
        glow: "#ffe4ad",
      }
    : {
        track: "#505a50",
        metal: "#aaa99c",
        highlight: "#e8e3d5",
        wire: "#788073",
        leaf: "#36523d",
        leafLight: "#728961",
        glow: "#e8c97e",
      };

  const lampSlots = mobile ? [67, 195, 323] : [145, 445, 745, 1055, 1360, 1655];
  const lamps = lampSlots.map((slot, index) => ({
    x: slot + (random() - 0.5) * (mobile ? 18 : 55),
    angle: (random() - 0.5) * 44 + (index % 2 === 0 ? -6 : 6),
    scale: (mobile ? 0.84 + random() * 0.16 : 1.37 + random() * 0.31) * (compact ? (mobile ? 0.6 : 0.56) : 1),
  }));
  const sprigCount = mobile ? 17 : 42;
  const sprigs = Array.from({ length: sprigCount }, (_, index) => ({
    x: (index / (sprigCount - 1)) * width + (random() - 0.5) * (mobile ? 25 : 60),
    y: railY - 3 + (random() - 0.5) * 12,
    scale: (mobile ? 0.44 + random() * 0.37 : 0.74 + random() * 0.48) * foliageScale,
    angle: (random() - 0.5) * 76,
  }));
  const vineCount = mobile ? 11 : 22;
  const vines = Array.from({ length: vineCount }, (_, index) => ({
    x: ((index + 0.25 + random() * 0.5) / vineCount) * width,
    length: (mobile ? 40 + random() * 72 : 65 + random() * 112) * (compact ? (mobile ? 0.52 : 0.51) : 1),
    sway: (random() - 0.5) * (mobile ? 25 : 65),
    leafCount: mobile ? 3 + Math.floor(random() * 2) : 4 + Math.floor(random() * 3),
    leafScale: (mobile ? 0.42 + random() * 0.18 : 0.5 + random() * 0.27) * foliageScale,
    seed: 0x71af + variant * 997 + index * 53 + (mobile ? 31 : 0),
  }));

  return (
    <svg
      className={mobile ? "spotlight-vine-rail__mobile" : "spotlight-vine-rail__desktop"}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <g id={sprigId}>
          <path d="M0 3 C-4 -11 -1 -24 5 -43" fill="none" stroke={palette.leaf} strokeWidth="1.5" strokeLinecap="round" />
          <g fill={palette.leaf}>
            <path d="M-1 -5 C-17 -5 -25 -12 -28 -19 C-16 -20 -7 -15 -1 -5Z" />
            <path d="M0 -11 C12 -18 22 -19 29 -16 C24 -9 14 -7 0 -11Z" />
            <path d="M0 -18 C-12 -20 -19 -27 -19 -32 C-9 -31 -3 -26 0 -18Z" />
            <path d="M2 -24 C12 -33 20 -34 24 -32 C20 -26 13 -23 2 -24Z" />
            <path d="M4 -32 C-3 -36 -8 -42 -7 -46 C0 -43 3 -39 4 -32Z" />
          </g>
          <path d="M5 -43 C9 -51 14 -53 17 -52 C15 -47 11 -44 5 -43Z" fill={palette.leafLight} />
        </g>
        <g id={ivyId}>
          <path d="M0 0 C-3 -5 -8 -6 -10 -2 C-14 -5 -20 -1 -18 5 C-16 10 -10 11 -5 13 C-1 15 0 19 0 23 C1 19 3 15 7 13 C12 11 18 9 18 4 C18 -2 13 -5 9 -2 C7 -6 3 -5 0 0Z" />
          <path d="M0 2 V17 M0 10 L-9 5 M0 10 L9 4" fill="none" stroke="currentColor" strokeOpacity=".15" strokeWidth="1.2" />
        </g>
        <g id={hangerId}>
          <path d="M0 -8 V14" stroke={palette.track} strokeWidth="3" strokeLinecap="round" />
          <circle cy="14" r="4.5" fill={palette.metal} stroke={palette.track} strokeWidth="1.5" />
        </g>
        <g id={fixtureId}>
          <path d="M-11 16 H11 L14 48 Q0 54 -14 48Z" fill={palette.metal} stroke={palette.track} strokeWidth="1.5" />
          <path d="M-8 19 H8 M-10 23 H10" stroke={palette.highlight} strokeOpacity=".7" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M-14 48 Q0 55 14 48" fill="none" stroke={palette.highlight} strokeWidth="3" strokeLinecap="round" />
          <ellipse cy="50" rx="9" ry="3" fill={palette.glow} opacity=".9" />
          <path d="M-7 52 L-19 92 L20 92 L7 52Z" fill={palette.glow} opacity=".06" />
        </g>
      </defs>
      <g fill="none" stroke={palette.wire} strokeWidth={mobile ? 0.9 : 1.3} opacity=".72">
        <path d={`M${width * 0.17} 0 L${width * 0.17} ${railY - 5}`} strokeDasharray="3 5" />
        <path d={`M${width * 0.83} 0 L${width * 0.83} ${railY - 5}`} strokeDasharray="3 5" />
      </g>
      <g opacity=".97">
        {sprigs.map((sprig, index) => <FernSprig key={index} {...sprig} shapeId={sprigId} />)}
      </g>
      <path d={`M0 ${railY - 6} H${width}`} fill="none" stroke={palette.track} strokeWidth={(mobile ? 9 : 11) * (compact ? 0.7 : 1)} />
      <path d={`M0 ${railY - 9} H${width}`} fill="none" stroke={palette.highlight} strokeWidth="1.5" opacity=".72" />
      <path d={`M0 ${railY - 1} H${width}`} fill="none" stroke={palette.wire} strokeWidth="1" opacity=".8" />
      <g opacity=".96">
        {vines.map((vine, index) => <HangingVine key={index} {...vine} railY={railY} palette={palette} ivyId={ivyId} />)}
      </g>
      {lamps.map((lamp, index) => <Spotlight key={index} {...lamp} railY={railY} hangerId={hangerId} fixtureId={fixtureId} />)}
    </svg>
  );
}

/**
 * A front-facing illustration inspired by the cafe's suspended lighting and plants.
 * `tone` describes the section background: light paper or dark charcoal.
 */
export function SpotlightRail({ variant, tone = "light", id, className, compact = false }: SpotlightRailProps) {
  return (
    <div id={id} className={["spotlight-vine-rail", compact && "spotlight-vine-rail--compact", className].filter(Boolean).join(" ")}>
      <RailScene variant={variant} tone={tone} mobile={false} compact={compact} />
      <RailScene variant={variant} tone={tone} mobile compact={compact} />
    </div>
  );
}
