import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugToTitle(slug: string): string {
  const withoutId = slug.replace(/-[a-f0-9]{8}$/, "");

  const words = withoutId.split("-");

  const capitalized = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  return capitalized.join(" ");
}
