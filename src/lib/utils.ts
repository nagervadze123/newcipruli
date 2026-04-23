import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function formatGEL(amount: number | null | undefined): string {
  if (amount === null || amount === undefined) return "—";
  return new Intl.NumberFormat("ka-GE", {
    style: "currency",
    currency: "GEL",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDateKa(dateIso: string): string {
  return new Intl.DateTimeFormat("ka-GE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateIso));
}
