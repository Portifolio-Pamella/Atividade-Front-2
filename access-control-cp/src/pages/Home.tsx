// src/pages/Home.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom'; // CORRIGIDO: Importação de useNavigate
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate(); // CORRIGIDO: Chamada do hook useNavigate

  // Função para lidar com o logout
  const handleLogout = () => {
    logout();
    navigate('/login'); // Redireciona para o login após o logout
  };

  // Se o usuário não estiver logado, redireciona.
  if (!user) {
    // Redireciona de forma imperativa (se não houver ProtectedRoute)
    navigate('/login');
    return null; 
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg">
        <h1 className="text-3xl font-bold text-indigo-700">Painel Principal</h1>
        <div className="flex items-center space-x-4">
          {/* Item 9: Apresenta o nome e o email do usuário */}
          <span className="text-lg font-medium text-gray-700">
            Olá, <span className="text-indigo-600">{user.nome}</span>
          </span>
          <span className="text-md text-gray-500">
            ({user.email})
          </span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-200"
          >
            Sair
          </button>
        </div>
      </header>
      
      <main className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Conteúdo Protegido</h2>
        <p className="text-gray-600">
          Você está logado e autenticado. Este é o conteúdo que só pode ser visto após o login bem-sucedido.
        </p>
      </main>
    </div>
  );
};

export default Home;