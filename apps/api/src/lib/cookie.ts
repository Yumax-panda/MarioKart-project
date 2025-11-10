/**
 * Check if two URLs are on different domains
 * @param url1 - First URL to compare
 * @param url2 - Second URL to compare
 * @returns true if domains are different, false if same or invalid URLs
 */
export const isCrossDomain = (url1: string, url2: string): boolean => {
  try {
    const parsedUrl1 = new URL(url1);
    const parsedUrl2 = new URL(url2);
    return parsedUrl1.hostname !== parsedUrl2.hostname;
  } catch {
    return false;
  }
};
