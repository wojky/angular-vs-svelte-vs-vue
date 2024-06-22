import type { UserInfo } from "./useUserState";

export async function login(email: string, password: string) {
  const res = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  return (await res.json()) as { user: UserInfo; token: string };
}

export async function logout() {
  return await fetch("http://localhost:3000/auth/logout", {
    method: "POST",
  });
}

export async function register(
  email: string,
  password: string,
  subscription: boolean
) {
  return await fetch("http://localhost:3000/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password, subscription }),
  });
}

export async function resetCredentials(email: string) {
  return await fetch("http://localhost:3000/auth/reset", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function verifyToken(token: string) {
  const res = await fetch("http://localhost:3000/verify", {
    method: "POST",
    body: JSON.stringify({ token }),
  });

  return (await res.json()) as { user: UserInfo; token: string } | null;
}
