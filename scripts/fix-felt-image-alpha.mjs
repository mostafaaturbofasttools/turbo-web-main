/**
 * One-time fix: felt-image.png may be saved as RGB (no alpha). This adds alpha
 * only to the outer canvas via flood-fill from edges — does not alter the phone or app UI.
 */
import sharp from "sharp";

const SRC = "public/felt/felt-image.png";
const OUT = "public/felt/felt-image.png";

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

const bg = [254, 254, 254];
const tolerance = 14;

function matchesBg(r, g, b) {
  return Math.sqrt((r - bg[0]) ** 2 + (g - bg[1]) ** 2 + (b - bg[2]) ** 2) <= tolerance;
}

const transparent = new Uint8Array(width * height);
const queue = [];

function trySeed(x, y) {
  const i = (y * width + x) * channels;
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  if (matchesBg(r, g, b)) {
    const idx = y * width + x;
    if (!transparent[idx]) {
      transparent[idx] = 1;
      queue.push(idx);
    }
  }
}

for (let x = 0; x < width; x++) {
  trySeed(x, 0);
  trySeed(x, height - 1);
}
for (let y = 0; y < height; y++) {
  trySeed(0, y);
  trySeed(width - 1, y);
}

while (queue.length) {
  const idx = queue.pop();
  if (idx === undefined) break;
  const x = idx % width;
  const y = (idx - x) / width;
  for (const [nx, ny] of [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ]) {
    if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
    const ni = ny * width + nx;
    if (transparent[ni]) continue;
    const i = ni * channels;
    if (matchesBg(data[i], data[i + 1], data[i + 2])) {
      transparent[ni] = 1;
      queue.push(ni);
    }
  }
}

for (let idx = 0; idx < width * height; idx++) {
  if (transparent[idx]) {
    const i = idx * channels;
    data[i + 3] = 0;
  }
}

await sharp(data, { raw: { width, height, channels } }).png().toFile(OUT);

const meta = await sharp(OUT).metadata();
console.log("saved", OUT, meta.width, "x", meta.height, "alpha:", meta.hasAlpha);
