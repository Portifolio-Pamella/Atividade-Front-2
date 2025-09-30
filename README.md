
Controle de Acesso (CP5)
Este projeto implementa um sistema de controle de acesso (Login e Cadastro) utilizando React com TypeScript, Context API para autenticação e React Hook Form para validação de formulários. A persistência dos dados é simulada com json-server.

Tecnologias Utilizadas
Categoria	Tecnologia	Finalidade
Frontend	React com TypeScript (Vite)	Estrutura da aplicação moderna e tipada.
Rotas	React Router DOM (v6)	Navegação entre /login, /cadastro e /.
Formulários	React Hook Form	Gerenciamento e validação avançada dos formulários (Itens 4, 5, 6).
Estado	Context API	Gerenciamento global do estado de autenticação (user e funções login/logout) (Item 9).
Estilização	Tailwind CSS	Design responsivo e com classes utilitárias.
Backend Mock	JSON-Server	Simula a API RESTful para persistência de dados em db.json (Itens 1, 7, 8).

Requisitos Implementados
Item	Descrição	Status
1       Endpoint usuarios com json-server na porta 3004.	
2	    Rota /login definida como página inicial da aplicação.	
3	    Rota /cadastro e link de navegação entre Login/Cadastro.	
4, 5	Formulários de Login e Cadastro com todos os campos solicitados.	
6	    Validação de campos obrigatórios e formato de e-mail com React Hook Form.	
7	    Lógica de Cadastro com verificação de duplicidade de nomeUsuario e email na API.	
8	    Lógica de Login com validação na API e simulação de autenticação via localStorage.	
9	    Uso de Context API para gerenciar e exibir o nome e e-mail do usuário logado na Home.
10	    Versionamento (Mínimo de 30 commits no total, seguindo rótulos semânticos).	

Como Executar o Projeto
Para rodar a aplicação, você deve iniciar o frontend (VITE) e o backend mock (json-server) simultaneamente.

Pré-requisitos
Node.js e npm instalados.

Terminal no diretório raiz do projeto (access-control-cp).

1. Inicialização
O projeto utiliza o concurrently para iniciar ambos os serviços com um único comando:

Bash

# Executa o frontend (porta 5173) e o json-server (porta 3004)
npm run start
2. Acesso
Após a inicialização, abra seu navegador em:

http://localhost:5173/

🧪 Instruções para Teste
Para validar todos os requisitos, siga a ordem abaixo:

Cadastro (Item 7):

Navegue para a rota /cadastro.

Cadastre um novo usuário (ex: nomeUsuario: teste1, email: teste1@fiap.com.br).

Teste Duplicidade: Tente cadastrar novamente com o mesmo nomeUsuario ou email e observe a mensagem de erro personalizada.

Login (Item 8):

Após o cadastro bem-sucedido, você será redirecionado para /login.

Use o nomeUsuario e email cadastrados.

Se o login for bem-sucedido, você será redirecionado para a Home (/).

Home e Contexto (Item 9):

Na Home, verifique se as informações do usuário (Nome e Email) estão sendo exibidas no cabeçalho, comprovando o uso do Context API.

Clique em Sair (Logout) para limpar a sessão do localStorage.

Membros da Equipe
Pamella Christiny - 565206
Felipe Ribeiro - 565224
