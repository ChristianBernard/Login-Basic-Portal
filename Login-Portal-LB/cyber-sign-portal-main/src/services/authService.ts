const API_URL = 'http://localhost:8080/api/auth';

// Modo de desenvolvimento: ativa mock quando não conseguir conectar ao backend
const USE_MOCK = true; // Mude para false quando o backend Java estiver rodando

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

// Mock da API para desenvolvimento
const mockLogin = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  // Simula delay de rede
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (credentials.username === 'admin' && credentials.password === '12345') {
    return { token: 'MOCK_JWT_TOKEN_VALIDO' };
  }
  
  throw new Error('Credenciais inválidas');
};

export interface LoginResponse {
  token: string;
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    // Usa mock se configurado
    if (USE_MOCK) {
      return mockLogin(credentials);
    }

    // Caso contrário, tenta conectar ao backend real
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Credenciais inválidas');
        }
        throw new Error('Erro ao fazer login');
      }

      const data: LoginResponse = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Erro ao conectar com o servidor');
    }
  },

  setToken: (token: string) => {
    localStorage.setItem('authToken', token);
  },

  getToken: (): string | null => {
    return localStorage.getItem('authToken');
  },

  removeToken: () => {
    localStorage.removeItem('authToken');
  },

  isAuthenticated: (): boolean => {
    return !!authService.getToken();
  },
};
