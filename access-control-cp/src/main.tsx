import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Importa o Provedor de Autenticação (Item 9)
import { AuthProvider } from './context/AuthContext'; 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    
    {/* CORREÇÃO: Envolve a aplicação com o AuthProvider */}
    <AuthProvider>
      <App />
    </AuthProvider>
    
  </React.StrictMode>,
);