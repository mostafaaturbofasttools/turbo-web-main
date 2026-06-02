/** Do not run — overwrites public/felt/image.png. User asset must stay as uploaded. */
import sharp from "sharp";

const SRC = "public/felt/image.png";
const OUT = "public/felt/image.png";

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

const isOuterBg = (r, g, b) => {
  const whiteDist = Math.sqrt((r - 246) ** 2 + (g - 246) ** 2 + (b - 246) ** 2);
  const siteFill = r <= 12 && g <= 12 && b <= 16;
  return whiteDist < 22 || siteFill;
};

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = (y * width + x) * channels;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (isOuterBg(r, g, b)) {
      data[i] = 0;
      data[i + 1] = 0;
      data[i + 2] = 0;
      data[i + 3] = 0;
    }
  }
}

let minX = width;
let minY = height;
let maxX = 0;
let maxY = 0;

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = (y * width + x) * channels;
    if (data[i + 3] > 0) {
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }
}

const pad = 12;
minX = Math.max(0, minX - pad);
minY = Math.max(0, minY - pad);
maxX = Math.min(width - 1, maxX + pad);
maxY = Math.min(height - 1, maxY + pad);
const cropW = maxX - minX + 1;
const cropH = maxY - minY + 1;

await sharp(data, { raw: { width, height, channels } })
  .extract({ left: minX, top: minY, width: cropW, height: cropH })
  .png()
  .toFile(OUT);

console.log("saved", OUT, cropW, cropH);
