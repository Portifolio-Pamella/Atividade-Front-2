// src/App.tsx (Apenas as partes alteradas)

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Home from './pages/Home'; // <--- Importe o Home

function App() {
  return (
    <BrowserRouter>
      {/* ... */}
      <Routes>
        {/* ... (Rotas /login e /cadastro) ... */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        
        {/* Rota principal que leva ao conteúdo protegido */}
        <Route path="/" element={<Home />} /> 
        
        {/* Rota explícita para o Home, caso precise */}
        <Route path="/home" element={<Home />} />

        {/* ... */}
      </Routes>
    </BrowserRouter>
  );
}

// ...