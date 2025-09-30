// src/pages/Login.tsx

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Define a tipagem dos dados do formulário
interface LoginFormInputs {
  nomeUsuario: string;
  email: string;
}

const API_URL = 'http://localhost:3004/usuarios'; // Seu endpoint do json-server

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
      // Item 8: Valide o usuário consultando o endpoint usuarios
      // Busca usuário com nomeUsuario E email correspondentes
      const response = await fetch(`${API_URL}?nomeUsuario=${data.nomeUsuario}&email=${data.email}`);
      const usuarios = await response.json();

      if (usuarios.length === 0) {
        // Usuário ou e-mail não encontrado/combinado
        setError('email', {
          type: 'manual',
          message: 'Usuário ou E-mail incorretos.',
        }, { shouldFocus: true });
        
        // Também pode ser útil setar um erro global se preferir
        setError('nomeUsuario', {
          type: 'manual',
          message: 'Usuário ou E-mail incorretos.',
        });
        return;
      }
      
      const user = usuarios[0];
      
      // Item 8 & 9: Simula autenticação com localStorage e atualiza o contexto
      login({ id: user.id, nome: user.nome, email: user.email });
      
      // Redireciona para a home
      navigate('/'); 

    } catch (error) {
      console.error("Erro no login:", error);
      alert("Ocorreu um erro ao tentar fazer login. Verifique se o json-server está rodando.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Campo nomeUsuario (Item 4) */}
          <div>
            <label htmlFor="nomeUsuario" className="block text-sm font-medium text-gray-700">Nome de Usuário</label>
            <input
              id="nomeUsuario"
              type="text"
              className={`mt-1 block w-full px-3 py-2 border ${errors.nomeUsuario ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              {...register('nomeUsuario', {
                required: 'O nome de usuário é obrigatório.', // Item 6
              })}
              disabled={isSubmitting}
            />
            {/* Item 6: Mensagem de erro personalizada */}
            {errors.nomeUsuario && (
              <p className="mt-1 text-xs text-red-600">{errors.nomeUsuario.message}</p>
            )}
          </div>

          {/* Campo email (Item 4) */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              {...register('email', {
                required: 'O e-mail é obrigatório.', // Item 6
                pattern: {
                  value: /^\S+@\S+?\.\S+$/i,
                  message: 'Formato de e-mail inválido.', // Item 6
                },
              })}
              disabled={isSubmitting}
            />
            {/* Item 6: Mensagem de erro personalizada */}
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition duration-150"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        {/* Item 3: Link para /cadastro */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Ainda não tem conta?{' '}
            <Link to="/cadastro" className="font-medium text-indigo-600 hover:text-indigo-500">
              Cadastre-se aqui
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;