// src/pages/Cadastro.tsx

import React from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form'; // Importação de tipo separada
import { Link, useNavigate } from 'react-router-dom';

// Tipagem dos dados do formulário (Item 5)
interface CadastroFormInputs {
  nome: string;
  nomeUsuario: string;
  email: string;
}

const API_URL = 'http://localhost:3004/usuarios';

const Cadastro: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<CadastroFormInputs>();

  const onSubmit: SubmitHandler<CadastroFormInputs> = async (data) => {
    // Limpa erros anteriores de duplicidade
    clearErrors('nomeUsuario');
    clearErrors('email');
    
    try {
      // Item 7: Implementa a lógica de verificação de duplicidade
      
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
      
      // 3. Se não há duplicidade, procede com o POST (Salvando o novo usuário)
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), 
      });

      if (!response.ok) {
         throw new Error('Falha ao cadastrar usuário.');
      }
      
      alert('Cadastro realizado com sucesso! Você pode fazer login agora.');
      navigate('/login');

    } catch (error) {
      console.error("Erro no cadastro:", error);
      alert("Ocorreu um erro ao tentar cadastrar. Verifique se o json-server está rodando.");
    }
  };

  return (
    // Estilo: Fundo rosa claro
    <div className="flex items-center justify-center min-h-screen bg-pink-50">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-2xl border border-purple-100">
        <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-8">Criar Conta</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Campo nome (Item 5, 6) */}
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-600">Nome Completo</label>
            <input
              id="nome"
              type="text"
              className={`mt-1 block w-full px-4 py-2 border ${errors.nome ? 'border-red-500' : 'border-purple-200'} rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition duration-150`}
              {...register('nome', {
                required: 'O nome é obrigatório.', // Item 6
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
          
          {/* Campo nomeUsuario (Item 5, 6) */}
          <div>
            <label htmlFor="nomeUsuario" className="block text-sm font-medium text-gray-600">Nome de Usuário</label>
            <input
              id="nomeUsuario"
              type="text"
              className={`mt-1 block w-full px-4 py-2 border ${errors.nomeUsuario ? 'border-red-500' : 'border-purple-200'} rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition duration-150`}
              {...register('nomeUsuario', {
                required: 'O nome de usuário é obrigatório.', // Item 6
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

          {/* Campo email (Item 5, 6) */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              id="email"
              type="email"
              className={`mt-1 block w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-purple-200'} rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition duration-150`}
              {...register('email', {
                required: 'O e-mail é obrigatório.', // Item 6
                pattern: {
                  value: /^\S+@\S+?\.\S+$/i,
                  message: 'Formato de e-mail inválido.', // Item 6
                },
              })}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Botão de Submit (Roxo) */}
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-semibold text-white bg-purple-400 hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-300 disabled:opacity-50 transition duration-150"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        {/* Link de volta para /login (Item 3) */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Já tem uma conta?{' '}
            <Link to="/login" className="font-semibold text-pink-500 hover:text-pink-600 transition duration-150">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;