import { getToken } from "../storage/authStorage";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function apiFetch(
  endpoint: string,
  options?: RequestInit
) {
  const token = await getToken();

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",

      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),

      ...options?.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(
      data.message || "Something went wrong"
    ) as Error & {
      status: number;
      data: any;
    };

    error.status = response.status;
    error.data = data;

    throw error;
  }

  return data;
}