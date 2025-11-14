// Get API URL from environment or use default
// In development, Vite proxy will handle /api requests
// In production, use the full URL
const getApiUrl = () => {
  // Check if we're in development and should use proxy
  if (import.meta.env.DEV) {
    // Use relative path to leverage Vite proxy
    return '/api';
  }
  // Production or explicit API URL
  return import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
};

const API_URL = getApiUrl();

export interface User {
  id: number;
  email: string;
  fullName: string;
  createdAt?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message?: string;
}

export interface SignupData {
  email: string;
  password: string;
  fullName: string;
}

export interface LoginData {
  email: string;
  password: string;
}

class ApiClient {
  private getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  private setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  private removeToken(): void {
    localStorage.removeItem('auth_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Network error' }));
        const errorMessage = error.error || error.message || `Request failed with status ${response.status}`;
        throw new Error(errorMessage);
      }

      return response.json();
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Unable to connect to the server. Please make sure the backend is running on port 3001.');
      }
      throw error;
    }
  }

  async signup(data: SignupData): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    this.setToken(response.token);
    return response;
  }

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    this.setToken(response.token);
    return response;
  }

  async getCurrentUser(): Promise<{ user: User }> {
    return this.request<{ user: User }>('/auth/me');
  }

  async logout(): Promise<void> {
    this.removeToken();
  }

  async getSignals() {
    return this.request('/signals');
  }

  async createSignal(signal: any) {
    return this.request('/signals', {
      method: 'POST',
      body: JSON.stringify(signal),
    });
  }

  async deleteAllSignals() {
    return this.request<{ message: string; deletedCount: number }>('/signals', {
      method: 'DELETE',
    });
  }
}

export const api = new ApiClient();

