const assert = require("node:assert/strict");
const { test } = require("node:test");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

const helperPath = path.resolve(__dirname, "../lib/page-readiness.ts");
const compiled = ts.transpileModule(fs.readFileSync(helperPath, "utf8"), {
  compilerOptions: {
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.CommonJS,
  },
}).outputText;
const helperModule = { exports: {} };
vm.runInNewContext(
  compiled,
  { module: helperModule, exports: helperModule.exports },
  { filename: helperPath },
);
const { preparePageAssets } = helperModule.exports;

function deferred() {
  let resolve;
  let reject;
  const promise = new Promise((done, fail) => {
    resolve = done;
    reject = fail;
  });
  return { promise, resolve, reject };
}

const flush = () => new Promise(setImmediate);

class ControlledImage extends EventTarget {
  constructor(name, options = {}) {
    super();
    this.name = name;
    this.src = `/images/${name}-master.jpg`;
    this.currentSrc = `/_next/image?url=${name}&w=640&q=75`;
    this.complete = options.complete ?? false;
    this.naturalWidth = this.complete ? 640 : 0;
    this._loading = "lazy";
    this.decodeCalls = 0;
    this.decodeSettled = false;
    this.failed = false;
    this.handlers = new Map();
    this.decodeWait = deferred();
    this.onPromotion = () => {};
  }

  addEventListener(type, listener, options) {
    if (!this.handlers.has(type)) this.handlers.set(type, new Set());
    this.handlers.get(type).add(listener);
    super.addEventListener(type, listener, options);
  }

  removeEventListener(type, listener, options) {
    this.handlers.get(type)?.delete(listener);
    super.removeEventListener(type, listener, options);
  }

  get listenerCount() {
    return [...this.handlers.values()].reduce(
      (total, set) => total + set.size,
      0,
    );
  }

  get loading() {
    return this._loading;
  }
  set loading(value) {
    this._loading = value;
    if (value === "eager") this.onPromotion(this);
  }

  getAttribute(name) {
    return name === "src" ? this.src : null;
  }

  decode() {
    this.decodeCalls++;
    return this.decodeWait.promise.then(
      () => {
        this.decodeSettled = true;
      },
      (error) => {
        this.decodeSettled = true;
        throw error;
      },
    );
  }

  loaded() {
    this.complete = true;
    this.naturalWidth = 640;
    this.dispatchEvent(new Event("load"));
  }

  broken() {
    this.complete = true;
    this.naturalWidth = 0;
    this.failed = true;
    this.dispatchEvent(new Event("error"));
  }
}

function observeSignal(signal) {
  const listeners = new Set();
  const add = signal.addEventListener.bind(signal);
  const remove = signal.removeEventListener.bind(signal);
  signal.addEventListener = (type, listener, options) => {
    if (type === "abort") listeners.add(listener);
    add(type, listener, options);
  };
  signal.removeEventListener = (type, listener, options) => {
    if (type === "abort") listeners.delete(listener);
    remove(type, listener, options);
  };
  return listeners;
}

for (const concurrency of [1, 2]) {
  test(`prepares at most ${concurrency} photos concurrently, waiting for decoding before promoting the next`, async () => {
    const controller = new AbortController();
    const images = Array.from(
      { length: 5 },
      (_, index) => new ControlledImage(`photo-${index}`),
    );
    const sources = images.map((image) => [image.src, image.currentSrc]);
    const promoted = [];
    let maxConcurrent = 0;
    for (const image of images) {
      image.onPromotion = (current) => {
        promoted.push(current);
        maxConcurrent = Math.max(
          maxConcurrent,
          images.filter(
            (candidate) =>
              candidate.loading === "eager" && !candidate.decodeSettled,
          ).length,
        );
      };
    }
    const ready = preparePageAssets({
      images,
      fontReady: Promise.resolve(),
      concurrency,
      signal: controller.signal,
    });
    await flush();
    assert.equal(
      promoted.length,
      concurrency,
      "remaining lazy photos should not all start at once",
    );

    while (
      promoted.some((image) => !image.decodeSettled) ||
      promoted.length < images.length
    ) {
      const batch = promoted.filter((image) => !image.decodeSettled);
      const previousPromotions = promoted.length;
      for (const image of batch) image.loaded();
      await flush();
      assert.equal(
        promoted.length,
        previousPromotions,
        "a load event alone should not release a decode slot",
      );
      for (const image of batch) image.decodeWait.resolve();
      await flush();
    }
    await ready;
    assert.equal(maxConcurrent, concurrency);
    assert.deepEqual(
      promoted.map((image) => image.name),
      images.map((image) => image.name),
      "keep the caller's hero-first order",
    );
    assert.deepEqual(
      images.map((image) => [image.src, image.currentSrc]),
      sources,
      "preserve responsive URLs rather than preloading masters",
    );
    assert.ok(
      images.every(
        (image) => image.decodeCalls === 1 && image.listenerCount === 0,
      ),
    );
  });
}

test("readiness waits for both fonts and the last photo decode", async () => {
  const controller = new AbortController();
  const fonts = deferred();
  const hero = new ControlledImage("hero");
  const finalPhoto = new ControlledImage("last-photo");
  const progress = [];
  let finished = false;
  const ready = preparePageAssets({
    images: [hero, finalPhoto],
    fontReady: fonts.promise,
    concurrency: 2,
    signal: controller.signal,
    onProgress: (completed, total) => progress.push([completed, total]),
  }).then(() => {
    finished = true;
  });
  hero.loaded();
  finalPhoto.loaded();
  hero.decodeWait.resolve();
  await flush();
  assert.equal(finished, false);
  fonts.resolve();
  await flush();
  assert.equal(
    finished,
    false,
    "fonts finishing should not reveal an undecoded final photo",
  );
  finalPhoto.decodeWait.resolve();
  await ready;
  assert.deepEqual(progress, [
    [0, 3],
    [1, 3],
    [2, 3],
    [3, 3],
  ]);
});

test("finishing every image still waits for pending fonts", async () => {
  const controller = new AbortController();
  const fonts = deferred();
  const image = new ControlledImage("photo");
  let finished = false;
  const ready = preparePageAssets({
    images: [image],
    fontReady: fonts.promise,
    concurrency: 1,
    signal: controller.signal,
  }).then(() => {
    finished = true;
  });
  image.loaded();
  image.decodeWait.resolve();
  await flush();
  assert.equal(finished, false);
  fonts.resolve();
  await ready;
  assert.equal(finished, true);
});

test("already-complete cached photos are decoded without waiting for another load event", async () => {
  const controller = new AbortController();
  const image = new ControlledImage("cached", { complete: true });
  let finished = false;
  const ready = preparePageAssets({
    images: [image],
    fontReady: Promise.resolve(),
    concurrency: 1,
    signal: controller.signal,
  }).then(() => {
    finished = true;
  });
  await flush();
  assert.equal(image.decodeCalls, 1);
  assert.equal(finished, false);
  image.decodeWait.resolve();
  await ready;
  assert.equal(image.listenerCount, 0);
});

test("broken images and rejected fonts settle so the remaining page can become accessible", async () => {
  const controller = new AbortController();
  const broken = new ControlledImage("broken");
  const healthy = new ControlledImage("healthy");
  const progress = [];
  const ready = preparePageAssets({
    images: [broken, healthy],
    fontReady: Promise.reject(new Error("font unavailable")),
    concurrency: 1,
    signal: controller.signal,
    onProgress: (completed, total) => progress.push([completed, total]),
  });
  broken.broken();
  await flush();
  assert.equal(healthy.loading, "eager");
  healthy.loaded();
  healthy.decodeWait.resolve();
  await ready;
  assert.equal(broken.decodeCalls, 0);
  assert.deepEqual(progress.at(-1), [3, 3]);
  assert.equal(broken.listenerCount + healthy.listenerCount, 0);
});

test("a rejected image decode does not leave the preparation queue blocked", async () => {
  const controller = new AbortController();
  const image = new ControlledImage("unsupported-format");
  const ready = preparePageAssets({
    images: [image],
    fontReady: Promise.resolve(),
    concurrency: 1,
    signal: controller.signal,
  });
  image.loaded();
  image.decodeWait.reject(new Error("decode failed"));
  await ready;
  assert.equal(image.listenerCount, 0);
});

test("changing the responsive source during decoding waits for the replacement decode", async () => {
  const controller = new AbortController();
  const image = new ControlledImage("rotated-phone");
  let finished = false;
  const ready = preparePageAssets({
    images: [image],
    fontReady: Promise.resolve(),
    concurrency: 1,
    signal: controller.signal,
  }).then(() => {
    finished = true;
  });
  image.loaded();
  const firstDecode = image.decodeWait;
  image.currentSrc = "/_next/image?url=rotated-phone&w=1080&q=75";
  image.decodeWait = deferred();
  image.loaded();
  firstDecode.reject(new Error("responsive source changed"));
  await flush();
  assert.equal(image.decodeCalls, 2);
  assert.equal(
    finished,
    false,
    "the replacement load event alone must not reveal the page",
  );
  image.decodeWait.resolve();
  await ready;
  assert.equal(finished, true);
  assert.equal(image.listenerCount, 0);
});

test("aborting settles pending fonts and image decoding, removes handlers, and stops queued promotion", async () => {
  const controller = new AbortController();
  const signalListeners = observeSignal(controller.signal);
  const fonts = deferred();
  const active = new ControlledImage("active");
  const queued = new ControlledImage("queued");
  const progress = [];
  const ready = preparePageAssets({
    images: [active, queued],
    fontReady: fonts.promise,
    concurrency: 1,
    signal: controller.signal,
    onProgress: (completed, total) => progress.push([completed, total]),
  });
  active.loaded();
  await flush();
  controller.abort();
  await ready;
  assert.equal(
    queued.loading,
    "lazy",
    "cancelled work should not start offscreen photos",
  );
  assert.equal(active.listenerCount, 0);
  assert.equal(signalListeners.size, 0);
  assert.deepEqual(
    progress,
    [[0, 3]],
    "aborted work must not report completed readiness",
  );
  active.decodeWait.resolve();
  fonts.resolve();
  await flush();
  assert.deepEqual(
    progress,
    [[0, 3]],
    "late results should not update a closed loader",
  );
});

test("an already-aborted request starts no photos or listeners", async () => {
  const controller = new AbortController();
  controller.abort();
  const signalListeners = observeSignal(controller.signal);
  const image = new ControlledImage("never-started");
  await preparePageAssets({
    images: [image],
    fontReady: new Promise(() => {}),
    concurrency: 2,
    signal: controller.signal,
  });
  assert.equal(image.loading, "lazy");
  assert.equal(image.listenerCount, 0);
  assert.equal(signalListeners.size, 0);
});
