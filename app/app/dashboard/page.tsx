import { getAuthUser } from "@/services/auth";
import { cookies } from "next/headers";

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
