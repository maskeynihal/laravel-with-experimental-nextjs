"use client";

import { baseUrl } from "@/config/backend";
import endpoints from "@/config/endpoints";
import { useRouter } from "next/navigation";
import { createRoute } from "@/services/route";
import { ChangeEvent, FormEvent, useState } from "react";

export default function LoginForm() {
  const [input, setInput] = useState({
    email: "admin@admin.com",
    password: "password",
  });

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    headers.append("X-Requested-With", "XMLHttpRequest");

    await fetch(createRoute(baseUrl, endpoints.sanctum.csrf), {
      credentials: "include",
    });

    const xsrfToken = document.cookie.match(/XSRF-TOKEN=(\w+)/);

    if (xsrfToken) {
      headers.append("X-XSRF-TOKEN", xsrfToken[1]);
    }

    const response = await fetch(createRoute(baseUrl, endpoints.auth.login), {
      method: "POST",
      body: JSON.stringify(input),
      headers: headers,
      credentials: "include",
    });

    if (!response.ok) {
      alert("Login Failed");

      return;
    }

    alert("Login Success");
    router.replace("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <input
        className="m-4 outline outline-1 rounded p-2"
        name="email"
        type="text"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setInput((prev) => ({ ...prev, email: e.target.value }))
        }
        required
        placeholder="Email"
        value={input.email}
      />
      <input
        className="m-4 outline outline-1 rounded p-2"
        name="password"
        type="password"
        required
        placeholder="Password"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setInput((prev) => ({ ...prev, password: e.target.value }))
        }
        value={input.password}
      />

      <button className="mx-4 rounded p-4 bg-green-500 text-white font-bold text-xl hover:bg-green-600">
        Login
      </button>
    </form>
  );
}
