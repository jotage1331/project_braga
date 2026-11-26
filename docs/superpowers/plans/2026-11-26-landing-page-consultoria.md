# Landing Page de Consultoria de Investimentos — Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. *(Nota: o usuário optou por executar em **modo instrutor**, passo a passo).*

**Goal:** Construir uma landing page estática, rápida, responsiva e segura para um consultor de investimentos vinculado à Varos, hospedada no GitHub Pages com captação de leads via Google Apps Script + Google Sheets.

**Architecture:** Site estático em HTML5 semântico, CSS3 puro moderno (Grid, Flexbox, Custom Properties) e JavaScript vanilla (ES6+). Os leads preenchidos no formulário são enviados via `fetch` (POST) para um Web App do Google Apps Script, que grava na planilha do Google Sheets e envia notificação por e-mail ao consultor.

**Tech Stack:** HTML5, CSS3 puro, JavaScript (ES6+), Git / GitHub Pages, Google Apps Script + Google Sheets.

**Spec:** `docs/superpowers/specs/2026-11-26-landing-page-consultoria-design.md`

## Global Constraints

- Sem frameworks CSS/JS pesados (sem Bootstrap, sem React/Next.js) — apenas HTML5, CSS3 puro e JS vanilla.
- Empresa vinculada ao consultor: **Varos**.
- Mobile-first (funcionar sem quebra ou rolagem horizontal de 375px a 1280px+).
- Nenhuma credencial ou chave privada no código do frontend.
- Conformidade básica com LGPD (`politica-de-privacidade.html` + checkbox de aceite no formulário).

---

### Task 1: Inicialização do Repositório Git, `.gitignore` e `README.md`

**Files:**
- Create: `.gitignore`
- Create: `README.md`

**Interfaces:**
- Consumes: `docs/superpowers/specs/2026-11-26-landing-page-consultoria-design.md`
- Produces: Repositório Git inicializado com branch `main`, `.gitignore` configurado e `README.md` documentando estrutura e deploy no GitHub Pages.

- [ ] **Step 1: Inicializar o Git na pasta do projeto**
```bash
git init -b main
```
- [ ] **Step 2: Criar `.gitignore`**
Ignorar arquivos de sistema operacional, editores e arquivos temporários (`.DS_Store`, `Thumbs.db`, `.vscode/`, `*.log`).
- [ ] **Step 3: Criar `README.md`**
Documentar objetivo do projeto, estrutura de pastas, como rodar localmente (`python3 -m http.server 8000`) e passo a passo de deploy no GitHub Pages.
- [ ] **Step 4: Primeiro commit e conexão com o GitHub**
```bash
git add .gitignore README.md docs/
git commit -m "chore: initial project setup and design spec"
```
*(Nota: `ref.md` pode ficar fora do repositório se contiver links privados ou ser adicionado no `.gitignore`.)*

---

### Task 2: Estrutura Base HTML e Política de Privacidade (LGPD)

**Files:**
- Create: `index.html`
- Create: `politica-de-privacidade.html`

**Interfaces:**
- Consumes: Variáveis e classes definidas no design system (`css/styles.css`) e IDs usados pelo `js/main.js` (`#nav-toggle`, `#nav-menu`, `#lead-form`, `#form-status`).
- Produces: Marcação semântica completa das 10 seções do funil + página de Política de Privacidade.

- [ ] **Step 1: Criar `index.html`** com `<header>` (navbar fixa), `<main>` (Hero, O que é & Diferencial, Para quem é, Etapas após a reunião, Quem sou eu, Prova Social, FAQ, Formulário de Agendamento) e `<footer>` (links sociais, LGPD e disclaimer).
- [ ] **Step 2: Criar `politica-de-privacidade.html`** com texto claro sobre coleta mínima de dados (nome, WhatsApp, e-mail, faixa patrimonial opcional) exclusivamente para contato e agendamento de reunião.
- [ ] **Step 3: Verificar localmente no navegador** rodando `python3 -m http.server 8000`.
- [ ] **Step 4: Commit**
```bash
git add index.html politica-de-privacidade.html
git commit -m "feat: add semantic HTML structure and privacy policy page"
```

---

### Task 3: Design System em CSS Puro Moderno

**Files:**
- Create: `css/styles.css`

**Interfaces:**
- Consumes: Classes semânticas de `index.html` e `politica-de-privacidade.html`.
- Produces: Layout responsivo mobile-first, paleta de cores via `:root`, tipografia Google Fonts, estados de hover/focus acessíveis e animações sutis.

- [ ] **Step 1: Definir tokens em `:root`** (cores, fontes, espaçamentos, bordas e sombras).
- [ ] **Step 2: Estilizar Navbar, Hero, Cards (Diferencial / Para quem é), Timeline (Etapas), Sobre, Depoimentos, FAQ, Formulário e Rodapé** em abordagem mobile-first com media queries para tablet (`768px`) e desktop (`1024px`).
- [ ] **Step 3: Testar responsividade** no DevTools do navegador (375px, 768px, 1280px) garantindo zero rolagem horizontal.
- [ ] **Step 4: Commit**
```bash
git add css/styles.css
git commit -m "feat: add responsive modern CSS design system"
```

---

### Task 4: Interatividade (Menu Mobile, FAQ e Validação/Envio do Formulário)

**Files:**
- Create: `js/main.js`

**Interfaces:**
- Consumes: Elementos `#nav-toggle`, `#nav-menu`, botões `.faq-question`, `#lead-form` e `#form-status` em `index.html`.
- Produces: Menu mobile acessível (`aria-expanded`), acordeão de FAQ, máscara de WhatsApp, validação + honeypot e envio assíncrono (`fetch`) para o endpoint do Google Apps Script.

- [ ] **Step 1: Implementar menu mobile e rolagem suave** para os links âncora.
- [ ] **Step 2: Implementar acordeão do FAQ** com `aria-expanded`.
- [ ] **Step 3: Implementar validação do formulário, máscara de telefone, verificação de honeypot e `fetch` POST** com estados de loading, sucesso (com botão opcional para WhatsApp) e erro amigável.
- [ ] **Step 4: Testar todos os fluxos no navegador** (envio vazio, e-mail inválido, preenchimento completo).
- [ ] **Step 5: Commit**
```bash
git add js/main.js
git commit -m "feat: add interactive menu, FAQ accordion, and lead form handler"
```

---

### Task 5: Integração com Google Sheets + Notificação por E-mail

**Files:**
- Create: `scripts/google-apps-script.gs`
- Modify: `js/main.js` (inserir URL publicada do Web App)

**Interfaces:**
- Consumes: Payload JSON/FormData enviado por `js/main.js` (`nome`, `whatsapp`, `email`, `patrimonio`, `objetivo`).
- Produces: Nova linha gravada no Google Sheets com timestamp + e-mail de notificação enviado ao consultor.

- [ ] **Step 1: Criar `scripts/google-apps-script.gs`** com função `doPost(e)` que grava na planilha ativa e chama `MailApp.sendEmail(...)`.
- [ ] **Step 2: Publicar o Apps Script como Web App** (acesso: "Qualquer pessoa") e colar a URL no `js/main.js`.
- [ ] **Step 3: Enviar lead de teste pelo site local** e confirmar chegada na planilha e no e-mail.
- [ ] **Step 4: Commit**
```bash
git add scripts/google-apps-script.gs js/main.js
git commit -m "feat: add Google Apps Script integration for Sheets and email alerts"
```

---

### Task 6: Deploy no GitHub Pages e Substituição de Conteúdo Real

**Files:**
- Modify: `index.html`, `assets/images/*` (quando o consultor enviar foto, bio, certificações e depoimentos)

- [ ] **Step 1: Enviar branch `main` para o GitHub** (`git push -u origin main`).
- [ ] **Step 2: Ativar GitHub Pages** em `Settings → Pages → Deploy from a branch (main / root)`.
- [ ] **Step 3: Validar o site publicado no celular e desktop** (HTTPS, links, formulário gravando no Sheets).
- [ ] **Step 4: Substituir placeholders pelo conteúdo oficial do consultor** assim que ele enviar.
