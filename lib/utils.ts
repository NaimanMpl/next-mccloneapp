import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type EnumDictionnary<T extends string | symbol | number, Value> = {
  [K in T]: Value;
};

export const upperFirstLetter = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const getBase64Image = async (url: string): Promise<string> => {
  const image = await fetch(url);
  const buffer = await image.arrayBuffer();
  const base64Skin = Buffer.from(buffer).toString('base64');

  return base64Skin;
};
