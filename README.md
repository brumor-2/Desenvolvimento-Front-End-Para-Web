# Plataforma Solidária – Projeto ONG

## Resumo do Projeto

A **Plataforma Solidária** é um sistema web que conecta **ONGs, voluntários e doadores**.  
Seu objetivo é oferecer uma presença digital acessível e funcional para o terceiro setor, com design responsivo, formulário interativo e navegação em página única (SPA).

O projeto foi desenvolvido ao longo de quatro entregas, evoluindo desde a estrutura HTML até a integração completa de **acessibilidade, versionamento e deploy.**

---

## Estrutura do Projeto

```plaintext
plataforma-ong-entrega/
│
├── index.html
├── projetos.html
├── cadastro.html
│
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── app.js
│   └── img/
│       ├── hero.png
│       ├── equipe.png
│       ├── projeto1.png
│       └── projeto2.png
│
└── README.md
```

---

## Entrega I – Fundamentos e Estrutura (HTML5)

**Objetivo:** criar a base estrutural da aplicação com HTML5 semântico.

- 3 páginas: `index.html`, `projetos.html` e `cadastro.html`
- Uso de tags semânticas: `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Formulário completo com validação nativa de campos:  
  Nome, CPF, Telefone, E-mail, Endereço, CEP, Cidade, Estado e Data de Nascimento
- Estrutura validada no **W3C Validator**

---

## Entrega II – Estilização e Responsividade (CSS3)

**Objetivo:** transformar o HTML em uma interface visual profissional.

- Design system com:
  - Paleta de 8+ cores (brand, accent, neutras e semânticas)
  - 5 tamanhos de tipografia
  - Sistema modular de espaçamento
- Layouts com **Grid (12 colunas)** e **Flexbox**
- Responsividade com **5 breakpoints**
- Componentes: cards, badges, botões e formulários estilizados
- Efeitos visuais para hover, focus e active

---

## Entrega III – Interatividade e Funcionalidades (JavaScript)

**Objetivo:** adicionar dinamismo e validação com JavaScript modular.

- SPA (**Single Page Application**) com roteamento hash (`#/projetos`, `#/cadastro`)
- Sistema de templates dinâmicos
- Máscaras e validação de formulários: CPF, Telefone, CEP, E-mail e Idade mínima
- Mensagens de feedback (Toasts e alertas)
- Armazenamento local (`localStorage`) de rascunhos e envios

---

## Entrega IV – Versionamento, Acessibilidade e Deploy

**Objetivo:** aplicar boas práticas profissionais e preparar o deploy.

### GitFlow & Versionamento

- Branches:
  - `main` – produção
  - `develop` – desenvolvimento
  - `feature/dark-mode` – modo escuro
  - `release/v1.0.0` – release final
- Histórico de commits semântico (`feat:`, `fix:`, `style:`, `docs:`)
- Tag: `v1.0.0`
- Issues e milestones configuradas:
  - “Minificar CSS e JS”
  - “Ajustar contraste WCAG”
  - “Criar Release v1.0.0”

### Acessibilidade (WCAG 2.1 AA)

- Navegação completa por teclado  
- Estrutura semântica adequada  
- Contraste mínimo de **4.5:1**
- Suporte a leitores de tela (`aria-label`, `role`, `aria-live`)  
- Modo escuro acessível via JavaScript

### Otimização e Deploy

- CSS e JS minificados para produção  
- Imagens otimizadas (TinyPNG)  
- Deploy em **GitHub Pages**

---

## Principais Tecnologias

| Categoria | Tecnologias |
|------------|--------------|
| Estrutura | HTML5 semântico |
| Estilo | CSS3 (Flexbox, Grid, Design Tokens) |
| Interatividade | JavaScript (ES6+, DOM, SPA, LocalStorage) |
| Versionamento | Git, GitHub, GitFlow |
| Acessibilidade | WCAG 2.1 AA, Aria, modo escuro |
| Deploy | GitHub Pages |

---

## Autores

**Aluno:** Bruno Pedroso de Moraes  
**Curso:** Análise e Desenvolvimento de Sistemas  
**Disciplina:** Desenvolvimento Front-End para Web
