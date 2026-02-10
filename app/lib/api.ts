export async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://be-sporton.agunacourse.com";
  const res = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    cache: options?.cache || "no-store",
    headers: {
      ...options?.headers,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    let errorMessage = `Failed to fetch data from ${endpoint}`;
    try {
      const errorData = await res.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch (e) {
      console.log(e);
    }

    throw new Error(errorMessage);
  }

  return res.json();
}

export function getImageUrl(path: string) {
  if (!path) return "/images/logo.svg";
  if (path.startsWith("http")) return path;
  const baseUrl = process.env.NEXT_PUBLIC_API_ROOT || "https://be-sporton.agunacourse.com";
  return `${baseUrl}/${path}`;
}
