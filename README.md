# Nuxt Realtime Chat

Um aplicativo de chat em tempo real construído com Nuxt 3, utilizando WebSocket para comunicação em tempo real. Projeto construído para fins de estudo de WebSocket e prática para construção de interfaces de usuário.

## 🚀 Tecnologias

- [Nuxt 3](https://nuxt.com/) - Framework Vue.js para aplicações modernas
- [Nuxt UI](https://ui.nuxt.com/) - Biblioteca de componentes para Nuxt
- [Socket.IO](https://socket.io/) - Biblioteca para comunicação em tempo real
- [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript com tipagem estática
- [TailwindCSS](https://tailwindcss.com/) - Framework CSS utilitário
- [Zod](https://zod.dev/) - Validação de esquemas TypeScript

## 📋 Pré-requisitos

- Node.js (versão LTS recomendada)
- pnpm (versão 10.6.5 ou superior)

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/dienerld/nuxt-realtime-chat
cd nuxt-realtime-chat
```

2. Instale as dependências:
```bash
pnpm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Inicie o servidor de desenvolvimento:
```bash
pnpm dev
```

## 🏗️ Estrutura do Projeto

```
app/
  ├── modules/
  │   ├── app/           # Módulo principal da aplicação
  │   └── landing-page/  # Módulo da página inicial
  ├── composables/       # Composables globais
  ├── components/        # Componentes globais
  └── pages/            # Páginas da aplicação
```

## 🎨 Design System

O projeto utiliza o Nuxt UI como biblioteca de componentes base, seguindo as melhores práticas de design system e acessibilidade.


## 📝 Convenções de Código

- TypeScript para tipagem estática
- ESLint para padronização de código
- Componentes Vue com `<script setup lang="ts">`
- Composables para lógica de negócio
- Princípios SOLID e Clean Code
