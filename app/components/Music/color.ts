export type RGB = { r: number; g: number; b: number };

const DEFAULT_ACCENT: RGB = { r: 185, g: 28, b: 65 };
const colorCache = new Map<string, RGB>();

function clamp(value: number) {
  return Math.max(0, Math.min(255, Math.round(value)));
}

export function rgbToCss(color: RGB) {
  return `${clamp(color.r)} ${clamp(color.g)} ${clamp(color.b)}`;
}

function fallbackColor(seed: string): RGB {
  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) {
    hash = seed.charCodeAt(index) + ((hash << 5) - hash);
  }
  const palette: RGB[] = [
    { r: 225, g: 29, b: 72 },
    { r: 219, g: 39, b: 119 },
    { r: 168, g: 85, b: 247 },
    { r: 79, g: 70, b: 229 },
    { r: 2, g: 132, b: 199 },
    { r: 13, g: 148, b: 136 },
    { r: 234, g: 88, b: 12 },
  ];
  return palette[Math.abs(hash) % palette.length];
}

function enhance(color: RGB): RGB {
  const max = Math.max(color.r, color.g, color.b);
  const min = Math.min(color.r, color.g, color.b);
  if (max < 42 || max - min < 16) return DEFAULT_ACCENT;
  const boost = max < 150 ? 1.45 : 1.18;
  return {
    r: clamp(color.r * boost),
    g: clamp(color.g * boost),
    b: clamp(color.b * boost),
  };
}

export async function extractArtworkColor(
  imageUrl: string,
  seed = imageUrl,
): Promise<RGB> {
  if (!imageUrl) return fallbackColor(seed);
  const cached = colorCache.get(imageUrl);
  if (cached) return cached;

  const color = await new Promise<RGB>((resolve) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.decoding = "async";
    image.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d", { willReadFrequently: true });
        if (!context) return resolve(fallbackColor(seed));
        const size = 52;
        canvas.width = size;
        canvas.height = size;
        context.drawImage(image, 0, 0, size, size);
        const pixels = context.getImageData(0, 0, size, size).data;
        let r = 0;
        let g = 0;
        let b = 0;
        let total = 0;
        for (let index = 0; index < pixels.length; index += 16) {
          const red = pixels[index];
          const green = pixels[index + 1];
          const blue = pixels[index + 2];
          const alpha = pixels[index + 3];
          if (alpha < 160) continue;
          const max = Math.max(red, green, blue);
          const min = Math.min(red, green, blue);
          const saturation = max - min;
          const brightness = (red + green + blue) / 3;
          if (brightness < 18 || brightness > 242 || saturation < 12) continue;
          const weight = 1 + saturation / 70 + brightness / 440;
          r += red * weight;
          g += green * weight;
          b += blue * weight;
          total += weight;
        }
        resolve(
          total
            ? enhance({ r: r / total, g: g / total, b: b / total })
            : fallbackColor(seed),
        );
      } catch {
        resolve(fallbackColor(seed));
      }
    };
    image.onerror = () => resolve(fallbackColor(seed));
    image.src = imageUrl;
  });

  colorCache.set(imageUrl, color);
  return color;
}
