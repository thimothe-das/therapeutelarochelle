import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getPosts(slug: string) {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pages?slug=${slug}`)
  const post = await data.json()
  return post[0]
}

export  const fetcher = (...args: any[]) => fetch(...args).then(res => {
  const data = res.json().then(data => {
    return data[0]
  })
  return data
})

// ... existing code ...

/**
 * Formats a phone number to a standardized international format without any separators
 * Handles formats like: (+33) 07.49.10.82.83, 07 49 10 82 83, 07.49.10.82.83, 0749108283
 * Returns format: 33749108283
 */
export function formatPhoneNumber(phoneNumber: string): string {
  // Remove all non-digit characters
  let cleaned = phoneNumber.replace(/\D/g, '');
  
  // If the number starts with a 0, replace it with 33 (French country code)
  if (cleaned.startsWith('0')) {
    cleaned = '33' + cleaned.substring(1);
  }
  
  // Handle case where country code is already included without leading 0
  // but we need to check it's not a number that's already been formatted
  if (!cleaned.startsWith('33') && cleaned.length === 10) {
    cleaned = '33' + cleaned.substring(1);
  }
  
  return cleaned;
}

