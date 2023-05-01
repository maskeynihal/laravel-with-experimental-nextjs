export interface Cookie {
  name: string;
  value: string;
}

/**
 * Format cookie to send in headers.
 */
export function getFormattedCookiesForHeader(cookies: Array<Cookie>) {
  return (
    cookies
      ?.map(({ name, value }) => `${name}=${encodeURIComponent(value)}`)
      .join("; ") ?? ""
  );
}
