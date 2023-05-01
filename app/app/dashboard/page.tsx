import { cookies } from "next/headers";
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

interface Cookie {
  name: string;
  value: string;
}

interface IUser {
  id: number;
  email: string;
  name: string;
}

function getFormattedCookiesForHeader(cookies: Array<Cookie>) {
  return (
    cookies
      ?.map(({ name, value }) => `${name}=${encodeURIComponent(value)}`)
      .join("; ") ?? ""
  );
}

async function getAuthUser(cookies: Array<Cookie>): Promise<IUser | null> {
  const headers = new Headers();
  headers.append("Cookie", getFormattedCookiesForHeader(cookies));
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");
  headers.append("Referer", "http://localhost:3000");

  const user = await fetch(`${baseUrl}/api/user`, {
    credentials: "include",
    headers,
  });

  if (!user.ok) {
    // redirect
    return null;
  }

  return await user.json();
}

export default async function DashboardPage() {
  const user = await getAuthUser(cookies().getAll());

  if (!user) {
    return <h1>Not Logged In</h1>;
  }

  return (
    <div>
      <ul>
        <li>
          ID:
          <b>{user.id}</b>
        </li>
        <li>
          Name:
          <b>{user.name}</b>
        </li>
        <li>
          Email:
          <b>{user.email}</b>
        </li>
      </ul>
    </div>
  );
}
