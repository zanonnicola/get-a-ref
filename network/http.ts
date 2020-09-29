async function http<T>(request: RequestInfo): Promise<T> {
  const response = await fetch(request);
  return ((await response.json()) as unknown) as T;
}

export async function get<T>(path: string, args: RequestInit = { method: 'get' }): Promise<T> {
  return await http<T>(new Request(path, args));
}

export async function post<T>(
  path: string,
  body: unknown,
  args: RequestInit = { method: 'post', body: JSON.stringify(body) }
): Promise<T> {
  return await http<T>(new Request(path, args));
}

export async function put<T>(
  path: string,
  body: unknown,
  args: RequestInit = { method: 'put', body: JSON.stringify(body) }
): Promise<T> {
  return await http<T>(new Request(path, args));
}
