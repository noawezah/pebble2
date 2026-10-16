import Image from "next/image";

/** Original client vector outlines, exported without raster tracing. */
export default function Brand() {
  return (
    <span className="brand-lockup">
      <Image
        className="brand-snail"
        src="/images/snail.svg"
        alt=""
        width={250}
        height={312}
        preload
      />
      <span className="brand-name">
        <Image
          className="brand-wordmark"
          src="/images/pebble-wordmark.svg"
          alt="PEBBLE"
          width={1080}
          height={200}
          loading="eager"
          unoptimized
        />
      </span>
    </span>
  );
}
