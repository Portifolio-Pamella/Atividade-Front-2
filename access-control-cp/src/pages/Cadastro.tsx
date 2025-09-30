// src/pages/Cadastro.tsx

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form'; // <-- Garante SubmitHandler
import { Link, useNavigate } from 'react-router-dom';

// Define a tipagem dos dados do formulário
interface CadastroFormInputs {
  nome: string;
  nomeUsuario: string;
  email: string;
}

const API_URL = 'http://localhost:3004/usuarios'; // Seu endpoint do json-server

const Cadastro: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    // Tipagem aplicada ao useForm
    formState: { errors, isSubmitting },
  } = useForm<CadastroFormInputs>();

  // Tipagem aplicada ao SubmitHandler para garantir que 'data' seja do tipo correto
  const onSubmit: SubmitHandler<CadastroFormInputs> = async (data) => {
    // Limpa erros anteriores de duplicidade
    clearErrors('nomeUsuario');
    clearErrors('email');
    
    try {
      // 1. Verificar duplicidade de nomeUsuario
      const userCheck = await fetch(`${API_URL}?nomeUsuario=${data.nomeUsuario}`);
      const usersFound = await userCheck.json();

      if (usersFound.length > 0) {
        setError('nomeUsuario', {
          type: 'manual',
          message: 'Nome de usuário já está em uso.',
        }, { shouldFocus: true });
        return;
      }

      // 2. Verificar duplicidade de email
      const emailCheck = await fetch(`${API_URL}?email=${data.email}`);
      const emailsFound = await emailCheck.json();

      if (emailsFound.length > 0) {
        setError('email', {
          type: 'manual',
          message: 'Este e-mail já está cadastrado.',
        }, { shouldFocus: true });
        return;
      }
      
      // 3. Se não há duplicidade, procede com o POST (cadastro)
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Os dados do formulário
      });

      if (!response.ok) {
         throw new Error('Falha ao cadastrar usuário.');
      }
      
      // Cadastro bem-sucedido
      alert('Cadastro realizado com sucesso! Você pode fazer login agora.');
      navigate('/login');

    } catch (error) {
      console.error("Erro no cadastro:", error);
      alert("Ocorreu um erro ao tentar cadastrar. Verifique se o json-server está rodando.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-6">Novo Cadastro</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Campo nome (Item 5) */}
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome Completo</label>
            <input
              id="nome"
              type="text"
              className={`mt-1 block w-full px-3 py-2 border ${errors.nome ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              {...register('nome', {
                required: 'O nome é obrigatório.',
                minLength: {
                    value: 3,
                    message: 'O nome deve ter no mínimo 3 caracteres.',
                }
              })}
              disabled={isSubmitting}
            />
            {errors.nome && (
              <p className="mt-1 text-xs text-red-600">{errors.nome.message}</p>
            )}
          </div>

          {/* Campo nomeUsuario (Item 5) */}
          <div>
            <label htmlFor="nomeUsuario" className="block text-sm font-medium text-gray-700">Nome de Usuário</label>
            <input
              id="nomeUsuario"
              type="text"
              className={`mt-1 block w-full px-3 py-2 border ${errors.nomeUsuario ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              {...register('nomeUsuario', {
                required: 'O nome de usuário é obrigatório.',
                minLength: {
                    value: 5,
                    message: 'Mínimo de 5 caracteres.',
                },
              })}
              disabled={isSubmitting}
            />
            {errors.nomeUsuario && (
              <p className="mt-1 text-xs text-red-600">{errors.nomeUsuario.message}</p>
            )}
          </div>

          {/* Campo email (Item 5) */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              {...register('email', {
                required: 'O e-mail é obrigatório.',
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

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition duration-150"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        {/* Link de volta para /login */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Já tem uma conta?{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;