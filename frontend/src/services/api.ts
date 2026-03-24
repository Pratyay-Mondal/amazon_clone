import { useAuthStore } from '../context/authStore';

const API_URL = 'http://localhost:8000/api';

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = useAuthStore.getState().token;
  
  const headers = new Headers(options.headers || {});
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  
  // Set Content-Type only if it's not FormData (which sets its own boundary)
  if (!(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || 'An error occurred');
  }

  return response.json();
}

export const api = {
  get: (url: string) => fetchWithAuth(url),
  post: (url: string, body: any) => fetchWithAuth(url, {
    method: 'POST',
    body: JSON.stringify(body),
  }),
  postForm: async (url: string, formData: FormData) => {
    // Specifically for OAuth2 login which requires application/x-www-form-urlencoded
    const urlEncoded = new URLSearchParams();
    formData.forEach((value, key) => {
      urlEncoded.append(key, value.toString());
    });

    const response = await fetch(`${API_URL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: urlEncoded.toString(),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'An error occurred');
    }
    return response.json();
  }
};
