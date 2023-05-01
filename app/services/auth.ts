import { baseUrl } from "@/config/backend";
import endpoints from "@/config/endpoints";
import { Cookie, getFormattedCookiesForHeader } from "@/services/cookies";
import { createRoute } from "@/services/route";

export interface IUser {
  id: number;
  email: string;
  name: string;
}

export async function getAuthUser(
  cookies: Array<Cookie>
): Promise<IUser | null> {
  const headers = new Headers();
  headers.append("Cookie", getFormattedCookiesForHeader(cookies));
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");
  headers.append("Referer", "http://localhost:3000");

  const url = createRoute(baseUrl, endpoints.auth.me);

  console.log("1. Fetching User");

  const response = await fetch(url, {
    credentials: "include",
    headers,
  });

  console.log("2. Request Completed");

  if (!response.ok) {
    console.log("3. Error in request");
    // TODO: Redirect
    return null;
  }

  console.log("3. Converting request to json");
  const user = await response.json();

  console.log("4. Conversion success", { user });

  return user;
}
