import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractBozumRate(price: string | number): number {
  if (typeof price === "number") {
    // If it's a number like 63, treat as 0.63
    // But if it's already a decimal like 0.63, we need to be careful.
    // Business logic: rates are stored as percentages in admin (1-100)
    return price > 5 ? price / 100 : price;
  }

  // Extract number from string like "%97.2 Oran" or "97.2"
  const match = price.match(/(\d+(\.\d+)?)/);
  if (match) {
    const val = parseFloat(match[0]);
    return val > 5 ? val / 100 : val;
  }

  return 1; // Default to 100% if no rate found
}
