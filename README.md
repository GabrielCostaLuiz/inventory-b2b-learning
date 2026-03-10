# Inventory B2B (Aprendizado Agentic)

Este repositório é dedicado ao treinamento e aperfeiçoamento nas seguintes tecnologias:
- NestJS (Backend)
- Angular 16+ (Frontend - Signals & Standalone)
- Prisma (ORM V7+)
- Docker (Conteinerização)

## Estrutura do Projeto

O repositório é um monorepo conceitual contendo:
- `/api`: Aplicação Backend Rest API desenvolvida com NestJS.
- `docker-compose.yml`: Arquivo de orquestração do banco de dados (PostgreSQL local).

## Como Rodar Localmente

1. Clone o repositório.
2. Crie seus arquivos `.env` baseados nos `.env.example` tanto na raiz quanto dentro de `/api`.
3. Suba o banco de dados:
   ```bash
   docker-compose up -d
   ```
4. Navegue até o diretório `api/`, instale as dependências e inicie o backend:
   ```bash
   cd api
   pnpm install
   npx prisma migrate dev
   pnpm start:dev
   ```

## Governança & AppSec
Este projeto segue diretrizes de segurança como validação estrita, controle de JWT, mitigação de Race Conditions via Bank/Stock Locks, e logs estruturados. Toda a documentação interna e de arquitetura (ADRs) é mantida *offline* focado na progressão do desenvolvedor.
