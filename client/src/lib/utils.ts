import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// Teach tailwind-merge the project's custom max-width tokens (--container-page/-copy in index.css)
// so `max-w-copy` correctly replaces `max-w-page`.
const twMerge = extendTailwindMerge({
  extend: { theme: { container: ["page", "copy"] } },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
