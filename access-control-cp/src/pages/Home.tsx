// src/pages/Home.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

const Home: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Se, por alguma falha na rota, o user estiver nulo, redireciona.
  // No App.tsx, o ProtectedRoute já faz isso, mas é uma boa prática
  // manter a verificação aqui também.
  if (!user) {
    navigate('/login');
    return null; 
  }

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redireciona para o login após o logout
  };

  return (
    // Estilo: Fundo rosa suave, mínima altura da tela (min-h-screen)
    <div className="min-h-screen bg-pink-50 p-8"> 
      
      {/* Header com estilo moderno e tons de rosa */}
      <header className="flex justify-between items-center bg-white shadow-lg p-5 rounded-xl border border-pink-200">
        <h1 className="text-3xl font-bold text-purple-600">Painel de Acesso</h1> 
        <div className="flex items-center space-x-4">
          
          {/* Item 9: Apresenta o nome e o email do usuário */}
          <span className="text-lg font-medium text-gray-700">
            Olá, <span className="text-pink-500 font-semibold">{user.nome}</span>
          </span>
          <span className="text-md text-gray-500">
            ({user.email})
          </span>
          
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-pink-400 text-white font-semibold rounded-lg shadow-md hover:bg-pink-500 transition duration-200" // Botão rosa
          >
            Sair
          </button>
        </div>
      </header>
      
      {/* Conteúdo principal */}
      <main className="mt-8 p-10 bg-white rounded-xl shadow-lg border border-pink-100">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Bem-vindo(a) à Área Restrita</h2>
        <p className="text-gray-600">
          Sua autenticação foi confirmada via Context API (Item 9). Você está logado e pode acessar o conteúdo protegido.
        </p>
        <p className="mt-4 text-sm text-gray-500">
          **Status da Sessão:** Ativa e protegida. Os dados do seu usuário (Nome e E-mail) são carregados do `AuthContext`.
        </p>
      </main>
    </div>
  );
};

export default Home;