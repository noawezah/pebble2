type PageAssetOptions = {
  images: readonly HTMLImageElement[];
  fontReady: Promise<unknown>;
  concurrency: 1 | 2;
  signal: AbortSignal;
  onProgress?: (completed: number, total: number) => void;
};

/** Promote the rendered responsive image, preserving its currentSrc/srcset choice. */
function prepareImage(image: HTMLImageElement, signal: AbortSignal) {
  return new Promise<void>((resolve) => {
    let settled = false;
    let decoding = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      image.removeEventListener("load", loaded);
      image.removeEventListener("error", finish);
      signal.removeEventListener("abort", finish);
      resolve();
    };
    const loaded = async () => {
      if (settled || decoding) return;
      if (signal.aborted || !image.naturalWidth) return finish();
      decoding = true;
      try {
        await image.decode?.();
      } catch {
        // A failed photo or srcset change must not trap the visitor behind a loader.
      }
      decoding = false;
      if (signal.aborted || image.complete) finish();
    };
    image.addEventListener("load", loaded);
    image.addEventListener("error", finish);
    signal.addEventListener("abort", finish, { once: true });
    if (signal.aborted) return finish();
    image.loading = "eager";
    if (!image.currentSrc && !image.getAttribute("src")) return finish();
    // Listen before checking complete so an immediate cached load cannot be missed.
    if (image.complete) void loaded();
  });
}

function settleFont(fontReady: Promise<unknown>, signal: AbortSignal) {
  return new Promise<void>((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      signal.removeEventListener("abort", finish);
      resolve();
    };
    signal.addEventListener("abort", finish, { once: true });
    // Install both outcomes even when already aborted to consume later rejections.
    void fontReady.then(finish, finish);
    if (signal.aborted) finish();
  });
}

/** Prepare page fonts and photos with bounded eager promotion and decode work. */
export async function preparePageAssets({
  images,
  fontReady,
  concurrency,
  signal,
  onProgress,
}: PageAssetOptions): Promise<void> {
  let completed = 0;
  let nextImage = 0;
  const total = images.length + 1;
  const advance = () => {
    if (signal.aborted) return;
    completed++;
    onProgress?.(completed, total);
  };
  if (!signal.aborted) onProgress?.(0, total);
  const fonts = settleFont(fontReady, signal).then(advance);
  const worker = async () => {
    while (nextImage < images.length && !signal.aborted) {
      await prepareImage(images[nextImage++], signal);
      advance();
    }
  };
  await Promise.all([fonts, ...Array.from({ length: concurrency }, worker)]);
}
