// src/pages/Login.tsx

import React from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form'; // Importação de tipo separada
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

// Tipagem dos dados do formulário (Item 4)
interface LoginFormInputs {
  nomeUsuario: string;
  email: string;
}

const API_URL = 'http://localhost:3004/usuarios';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      // Item 8: Valida o usuário consultando o endpoint
      const response = await fetch(`${API_URL}?nomeUsuario=${data.nomeUsuario}&email=${data.email}`);
      const usuarios = await response.json();

      if (usuarios.length === 0) {
        // Usuário ou e-mail não encontrado/combinado
        setError('email', {
          type: 'manual',
          message: 'Usuário ou E-mail incorretos.',
        }, { shouldFocus: true });
        return;
      }
      
      const user = usuarios[0];
      
      // Item 8 & 9: Simula autenticação e salva no Context
      login({ id: user.id, nome: user.nome, email: user.email });
      
      // Redireciona para a home
      navigate('/'); 

    } catch (error) {
      console.error("Erro no login:", error);
      alert("Ocorreu um erro ao tentar fazer login. Verifique se o json-server está rodando.");
    }
  };

  return (
    // ESTILO: Fundo rosa claro
    <div className="flex items-center justify-center min-h-screen bg-pink-50">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border border-pink-100">
        <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-8">Acessar Conta</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Campo nomeUsuario (Item 4) */}
          <div>
            <label htmlFor="nomeUsuario" className="block text-sm font-medium text-gray-600">Nome de Usuário</label>
            <input
              id="nomeUsuario"
              type="text"
              // ESTILO: Borda rosa/foco rosa
              className={`mt-1 block w-full px-4 py-2 border ${errors.nomeUsuario ? 'border-red-500' : 'border-pink-200'} rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm transition duration-150`}
              {...register('nomeUsuario', {
                required: 'O nome de usuário é obrigatório.', // Item 6
              })}
              disabled={isSubmitting}
            />
            {errors.nomeUsuario && (
              <p className="mt-1 text-xs text-red-600">{errors.nomeUsuario.message}</p>
            )}
          </div>

          {/* Campo email (Item 4) */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              id="email"
              type="email"
              // ESTILO: Borda rosa/foco rosa
              className={`mt-1 block w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-pink-200'} rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm transition duration-150`}
              {...register('email', {
                required: 'O e-mail é obrigatório.', // Item 6
                pattern: {
                  value: /^\S+@\S+?\.\S+$/i,
                  message: 'Formato de e-mail inválido.',
                },
              })}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Botão de Submit (Rosa) */}
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-semibold text-white bg-pink-400 hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-300 disabled:opacity-50 transition duration-150"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        {/* Link para /cadastro (Item 3) */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Ainda não tem conta?{' '}
            <Link to="/cadastro" className="font-semibold text-pink-500 hover:text-pink-600 transition duration-150">
              Cadastre-se aqui
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;