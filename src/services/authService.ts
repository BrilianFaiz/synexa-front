import { apiFetch } from "./api";
import { setToken } from "../storage/authStorage";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export async function register(data: RegisterData) {
  return apiFetch("/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function login(data: LoginData) {
  const response = await apiFetch("/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

  await setToken(response.token);

  return response;
}

export async function getUser() {
  return apiFetch("/user");
}