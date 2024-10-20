export const bytesToBase64DataUrlAsync = async (
  bytes: Uint8Array,
  type = 'application/octet-stream'
) => {
  return await new Promise((resolve, reject) => {
    const reader = Object.assign(new FileReader(), {
      onload: () => resolve(reader.result),
      onerror: () => reject(reader.error),
    });
    reader.readAsDataURL(new File([new Blob([bytes])], '', { type }));
  });
};

export const blobToImageAsync = (blob: Blob): Promise<HTMLImageElement> => {
  return new Promise((resolve) => {
    console.log('transform blob', blob);
    const url = URL.createObjectURL(blob);
    let img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.src = url;
  });
};

export const deepToRaw = <T extends Record<string, any>>(sourceObj: T): T => {
  const objectIterator = (input: any): any => {
    if (Array.isArray(input)) {
      return input.map((item) => objectIterator(item));
    }
    if (isRef(input) || isReactive(input) || isProxy(input)) {
      return objectIterator(toRaw(input));
    }
    if (input && typeof input === 'object') {
      return Object.keys(input).reduce((acc, key) => {
        acc[key as keyof typeof acc] = objectIterator(input[key]);
        return acc;
      }, {} as T);
    }
    return input;
  };

  return objectIterator(sourceObj);
};

export const readableFileSize = (sizeInByte: number | string = 0) => {
  if (!sizeInByte) {
    return '0 KB';
  }
  const size =
    typeof sizeInByte === 'string' ? parseInt(sizeInByte) : sizeInByte;
  const sizeInKb = size / 1024;
  const sizeInMb = sizeInKb / 1024;
  const sizeInGb = sizeInMb / 1024;
  const sizeInTb = sizeInGb / 1024;

  if (sizeInTb > 1) return `${sizeInTb.toFixed(2)} TB`;
  if (sizeInGb > 1) return `${sizeInGb.toFixed(2)} GB`;
  if (sizeInMb > 1) return `${sizeInMb.toFixed(2)} MB`;

  return `${sizeInKb.toFixed(2)} KB`;
};
import type { LocationQueryValue } from 'vue-router';
export const getSingleParam = (
  param: string | string[] | LocationQueryValue | LocationQueryValue[]
): string => {
  return Array.isArray(param) ? (param.at(0) ?? '') : (param ?? '');
};
