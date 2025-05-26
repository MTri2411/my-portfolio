import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function để kết hợp className một cách thông minh với Tailwind CSS
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
} 