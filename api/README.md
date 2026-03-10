# Inventory B2B - API Backend

Esta é a camada Backend do sistema de gestão de inventário. Desenhada utilizando as melhores práticas do **NestJS**.

## Tecnologias e Bibliotecas
- **NestJS v11**: Framework base.
- **Prisma V7**: ORM utilizando o Driver Adapter nativo (`@prisma/adapter-pg`) para se comunicar com o PostgreSQL.
- **Jest & Supertest**: Testes Unitários e End-to-End.

## Responsabilidades
A API expõe o ecossistema necessário para:
1. Controle Transacional Seguro (Gestão de Concorrência ao dar baixa nos produtos).
2. Validação Rígida de Entradas (`class-validator` / `zod`).
3. Auditoria Imutável de Movimentos de Estoque.
4. RBAC (Controle de Acessos Baseado em Roles via JWT).

## Setup do Banco de Dados
Não inicie o banco de dados diretamente. Utilize o `docker-compose.yml` da raiz do projeto para subir um Postgres limpo. Sempre mantenha o schema atualizado enviando o comando `pnpm prisma:migrate`.
