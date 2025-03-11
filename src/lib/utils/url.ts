import { nanoid } from 'nanoid';

/**
 * Normalizes a URL by removing trailing slashes and standardizing the protocol
 * @param url The URL to normalize
 * @returns The normalized URL
 */
export function normalizeUrl(url: string): string {
  // Add protocol if missing
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = `https://${url}`;
  }
  
  try {
    const urlObj = new URL(url);
    // Remove trailing slash
    return urlObj.origin + urlObj.pathname.replace(/\/$/, '') + urlObj.search + urlObj.hash;
  } catch (error) {
    return url;
  }
}

/**
 * Checks if a URL exists by making a HEAD request
 * @param url The URL to check
 * @returns An object with the valid URL (with working protocol) or null if invalid
 */
export async function checkUrlExists(url: string): Promise<{ isValid: boolean; validUrl: string | null }> {
  // Try with https first
  let normalizedUrl = url;
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    normalizedUrl = `https://${url}`;
  }
  
  try {
    const response = await fetch(normalizedUrl, { method: 'HEAD' });
    if (response.ok) {
      return { isValid: true, validUrl: normalizedUrl };
    }
  } catch (error) {
    // If https fails, try http
    if (normalizedUrl.startsWith('https://')) {
      const httpUrl = normalizedUrl.replace('https://', 'http://');
      try {
        const httpResponse = await fetch(httpUrl, { method: 'HEAD' });
        if (httpResponse.ok) {
          return { isValid: true, validUrl: httpUrl };
        }
      } catch (error) {
        // Both protocols failed
      }
    }
  }
  
  return { isValid: false, validUrl: null };
}

/**
 * Generates a unique 5-character alphanumeric code
 * @returns A 5-character alphanumeric code
 */
export function generateCode(): string {
  return nanoid(5);
}
