declare global {
  interface Window {
    env?: {
      BACKEND_URL?: string;
    };
  }
}

export type FetchResult<T> = {
  data: T | null;
  error: GeneDataBackendError | null;
};

const BACKEND_URL = window.env?.BACKEND_URL;

export const makeRequest = async <T>(path: string, options?: RequestInit): Promise<FetchResult<T>> => {
  const response = await fetch(BACKEND_URL + path, options);
  const payload = await response.json();

  if (!response.ok) {
    throw payload;
  }

  return payload;
}
