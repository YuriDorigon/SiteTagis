// src/lib/imageUtils.ts
import type { PixelCrop } from 'react-image-crop';

export async function getCroppedImg(
  image: HTMLImageElement,
  pixelCrop: PixelCrop,
  outputWidth: number,
  outputHeight: number
): Promise<string | null> {
  const canvas = document.createElement('canvas');
  canvas.width = outputWidth;
  canvas.height = outputHeight;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    console.error('Failed to get canvas context');
    return null;
  }

  if (!image.naturalWidth || !image.naturalHeight) {
    console.warn("Image natural dimensions not available for cropping.");
    // Attempt to use the image as is if crop data is minimal but image exists
    if (image.src && (pixelCrop.width < 1 || pixelCrop.height < 1)) {
        try {
            ctx.drawImage(image, 0, 0, outputWidth, outputHeight);
            return canvas.toDataURL('image/png');
        } catch (e) {
            console.error("Error drawing image directly to canvas", e);
            return null;
        }
    }
    return null; 
  }

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  const sourceX = pixelCrop.x * scaleX;
  const sourceY = pixelCrop.y * scaleY;
  const sourceWidth = pixelCrop.width * scaleX;
  const sourceHeight = pixelCrop.height * scaleY;

  if (sourceWidth <= 0 || sourceHeight <= 0) {
    console.warn("Skipping crop due to zero or negative dimensions in selection.");
    // Attempt to use the image as is
     try {
        ctx.drawImage(image, 0, 0, outputWidth, outputHeight);
        return canvas.toDataURL('image/png');
    } catch (e) {
        console.error("Error drawing image directly to canvas after invalid crop", e);
        return null;
    }
  }

  try {
    ctx.drawImage(
      image,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      0,
      0,
      outputWidth,
      outputHeight
    );
    return canvas.toDataURL('image/png');
  } catch (e) {
      console.error("Error during canvas drawImage operation", e);
      return null;
  }
}
