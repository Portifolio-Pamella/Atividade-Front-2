// src/App.tsx

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Importa o hook de autenticação (Item 9)
import { useAuth } from './context/AuthContext'; 

// Importa as páginas
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Home from './pages/Home';

// Componente Wrapper para Rotas Protegidas (Item 9)
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  
  // Se o usuário NÃO está logado, redireciona para o login
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* Item 2: Rota /login - Página inicial */}
        <Route path="/login" element={<Login />} />
        
        {/* Item 3: Rota /cadastro */}
        <Route path="/cadastro" element={<Cadastro />} />
        
        {/* Rota Protegida (Home - /) */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        
        {/* Rota para lidar com caminhos não encontrados */}
        <Route path="*" element={
          <div className="flex justify-center items-center min-h-screen bg-gray-100">
             <h1 className="text-4xl text-gray-700">Erro 404 - Página Não Encontrada</h1>
          </div>
        } />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;