// src/context/AuthContext.tsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react'; // <--- CORREÇÃO: ReactNode importado como tipo

// 1. Interface do Usuário (Estrutura dos dados a serem salvos)
interface UserData {
  id: number;
  nome: string;
  email: string;
}

// 2. Interface do Context (Estado e Funções)
interface AuthContextType {
  user: UserData | null;
  login: (userData: UserData) => void;
  logout: () => void;
}

// Cria o Context com um valor padrão não definido
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Provider Componente
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const STORAGE_KEY = 'userData';

  // Verifica o localStorage na inicialização (recuperação de sessão)
  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Erro ao parsear dados do usuário no localStorage", e);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Item 8: Função de Login (Salva no Storage e no Estado)
  const login = (userData: UserData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    setUser(userData);
  };

  // Função de Logout (Limpa o Storage e o Estado)
  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. Custom Hook para uso fácil
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};