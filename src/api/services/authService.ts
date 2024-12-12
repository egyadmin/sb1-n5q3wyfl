import apiClient from '../client';
import { API_ENDPOINTS } from '../config';

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    role: string;
  };
}

// Mock authentication for development
const MOCK_USERS = [
  {
    username: 'admin',
    password: '123456',
    id: '1',
    role: 'admin'
  }
];

const MOCK_TOKEN = 'mock-jwt-token';

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    // For development, use mock authentication
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = MOCK_USERS.find(
          u => u.username === credentials.username && u.password === credentials.password
        );

        if (!user) {
          reject(new Error('اسم المستخدم أو كلمة المرور غير صحيحة'));
          return;
        }

        const response: LoginResponse = {
          token: MOCK_TOKEN,
          user: {
            id: user.id,
            username: user.username,
            role: user.role
          }
        };

        // Store auth data in localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(response.user));

        resolve(response);
      }, 500);
    });
  },

  async logout(): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');
        resolve();
      }, 500);
    });
  },

  isAuthenticated(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  clearAuth(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  }
};