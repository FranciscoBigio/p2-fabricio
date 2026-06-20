# 📦 Sistema de Gestão Integrada (Veículos e Vestuário)

Uma aplicação Fullstack completa e conteinerizada para o gerenciamento de catálogos (Carros, Motos e Roupas) e controle de acesso de usuários. O projeto foi construído focando em segurança, alta disponibilidade e separação de responsabilidades utilizando as melhores práticas do mercado.

---

## 🛠️ Tecnologias Utilizadas

### Frontend
* **React + Vite:** Interface de usuário reativa e de carregamento ultrarrápido.
* **Tailwind CSS:** Estilização responsiva (Mobile First) e moderna.
* **Axios:** Comunicação HTTP com o backend via tokens JWT.

### Backend
* **Node.js + Express:** API RESTful robusta e escalável.
* **Segurança (OWASP):** `helmet` (proteção de cabeçalhos) e `express-rate-limit` (prevenção contra ataques de força bruta e DoS).
* **Swagger:** Documentação automatizada e interativa das rotas da API.

### Bancos de Dados
* **MongoDB (NoSQL):** Armazenamento flexível e rápido para as entidades dinâmicas de negócio (`Carros`, `Motos` e `Roupas`).
* **PostgreSQL (SQL):** Armazenamento relacional rígido para garantir a integridade dos dados de `Usuários` e `Autenticação`.

### Infraestrutura
* **Docker & Docker Compose:** Orquestração de containers, garantindo que o sistema rode da mesma forma em qualquer máquina.

---

## 🚀 Como Executar o Projeto Localmente

### 1. Pré-requisitos
Você precisará ter instalado na sua máquina:
* [Git](https://git-scm.com/)
* [Docker](https://www.docker.com/)
* [Docker Compose](https://docs.docker.com/compose/)

### 2. Configurando o Ambiente
Clone o repositório para a sua máquina e acesse a pasta do projeto:

```bash
git clone <url-do-seu-repositorio>
cd <nome-da-pasta>


Com o Docker em execução e o arquivo .env configurado, abra o seu terminal na raiz do projeto (onde está localizado o arquivo docker-compose.yml) e execute o comando abaixo para baixar as imagens, construir o sistema e rodar tudo em segundo plano:

Bash
docker-compose up -d --build

```
Assim que o terminal confirmar que os containers estão em execução (Running), os serviços estarão disponíveis nos seguintes endereços locais:

💻 Frontend (Interface React): http://localhost:8080 (ou a porta padrão definida no seu Vite)

⚙️ Backend (API REST Base): http://localhost:3000/api

📚 Documentação Swagger: http://localhost:3000/api-docs

Como o banco de dados relacional (PostgreSQL) inicia completamente vazio, você não conseguirá fazer login pela interface do Frontend imediatamente.

Para criar o seu usuário administrador inicial e liberar o acesso, abra um terminal e dispare a seguinte requisição HTTP para o seu backend:

Bash
curl -X POST http://localhost:3000/api/auth/register \
-H "Content-Type: application/json" \
-d '{"name": "Admin", "email": "admin@teste.com", "password": "123"}'
