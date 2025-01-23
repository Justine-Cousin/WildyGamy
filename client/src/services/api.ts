const API_URL = import.meta.env.VITE_API_URL;

interface RequestOptions {
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit | Record<string, unknown> | null | undefined;
  token?: string;
  [key: string]: unknown;
}

function getAuthToken(): string | null {
  const cookies = document.cookie.split(";");
  const tokenCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("authToken="),
  );
  return tokenCookie ? decodeURIComponent(tokenCookie.split("=")[1]) : null;
}

function setAuthToken(token: string, remember = false): void {
  const expires = remember
    ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    : undefined;

  document.cookie = `authToken=${encodeURIComponent(token)}${expires ? `;expires=${expires.toUTCString()}` : ""};path=/;SameSite=Strict`;
}

function removeAuthToken(): void {
  document.cookie = "authToken=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
}

export async function apiRequest(
  endpoint: string,
  options: RequestOptions = {},
) {
  const token = options.token || getAuthToken();

  const config: RequestInit = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body:
      options.body instanceof FormData
        ? options.body
        : options.body
          ? JSON.stringify(options.body)
          : undefined,
  };

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  if (options.body) {
    if (options.body instanceof FormData) {
      const { "Content-Type": _, ...headersWithoutContentType } =
        config.headers as Record<string, string>;
      config.headers = headersWithoutContentType;
      config.body = options.body as BodyInit;
    } else {
      config.body = JSON.stringify(options.body) as BodyInit;
    }
  }

  const response = await fetch(`${API_URL}${endpoint}`, config);

  if (response.status === 401) {
    removeAuthToken();
    window.location.href = "/login";
    return null;
  }

  return response;
}

export const api = {
  get: (endpoint: string, options?: RequestOptions) =>
    apiRequest(endpoint, { ...options, method: "GET" }),

  post: (
    endpoint: string,
    data?: Record<string, unknown>,
    options?: RequestOptions,
  ) => apiRequest(endpoint, { ...options, method: "POST", body: data }),

  put: (
    endpoint: string,
    data?: Record<string, unknown>,
    options?: RequestOptions,
  ) => apiRequest(endpoint, { ...options, method: "PUT", body: data }),

  delete: (endpoint: string, options?: RequestOptions) =>
    apiRequest(endpoint, { ...options, method: "DELETE" }),
};

export const auth = {
  setToken: setAuthToken,
  getToken: getAuthToken,
  removeToken: removeAuthToken,
};
