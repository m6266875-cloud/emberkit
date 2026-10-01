export async function apiFetch<T>(
  url: string,
  method: 'POST' | 'PATCH' | 'DELETE',
  data: unknown = {},
) {
  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'same-origin',
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || 'The request failed. Please try again.');
  return result as T;
}
