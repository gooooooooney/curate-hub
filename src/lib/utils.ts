import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { createId } from '@paralleldrive/cuid2';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createCuid() {
  return createId();
}
