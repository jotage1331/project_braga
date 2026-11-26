# Especificação de Design — Landing Page de Consultoria de Investimentos

**Data:** 2026-11-26  
**Projeto:** `project_braga`  
**Objetivo:** Criar uma landing page profissional, rápida, segura e responsiva para um consultor de investimentos vinculado à Varos, com foco em credibilidade (portfólio) e captação/qualificação de leads para agendamento de reunião.

---

## 1. Arquitetura e Stack Tecnológica

- **Frontend:** HTML5 semântico + CSS3 puro moderno (Flexbox, CSS Grid, Custom Properties/Variáveis) + JavaScript vanilla (ES6+).
  - *Motivo:* Carregamento instantâneo (ideal para tráfego mobile vindo do Instagram), zero dependências pesadas, manutenção simples sem curva de aprendizado de frameworks.
- **Hospedagem:** GitHub Pages (custo R$ 0, HTTPS/SSL automático, suporte futuro a domínio customizado `.com.br`).
- **Persistência de Leads e Notificação:** Google Apps Script (Web App) conectado a uma planilha no **Google Sheets**, com disparo automático de notificação por e-mail ao consultor a cada novo lead.
  - *Motivo:* O consultor já está familiarizado com Google Sheets, não exige banco de dados pago nem servidor backend, e mantém histórico organizado dos leads.

### Estrutura de Arquivos

```text
project_braga/
├── index.html                        # Landing page principal (single-page)
├── politica-de-privacidade.html      # Política de Privacidade (LGPD)
├── css/
│   └── styles.css                    # Design system, layout responsivo e componentes
├── js/
│   └── main.js                       # Menu mobile, FAQ, validação e envio do formulário
├── scripts/
│   └── google-apps-script.gs         # Código do endpoint para Google Sheets + E-mail
├── assets/
│   └── images/                       # Foto do consultor, ícones e favicon (WebP/SVG)
├── docs/
│   └── superpowers/
│       └── specs/
│           └── 2026-11-26-landing-page-consultoria-design.md
└── README.md                         # Documentação de setup, deploy e configuração do Sheets
```

---

## 2. Estrutura da Página (Funil de Conversão)

A página segue uma jornada progressiva pensada tanto para visitantes **quentes** (que já conhecem o consultor e clicam no CTA logo no topo) quanto **frios** (que pesquisam antes de agendar):

1. **Navbar Fixa:** Nome/marca do consultor, links de âncora (`Consultoria`, `Como funciona`, `Sobre`, `FAQ`) e botão CTA (`Agendar reunião`) com rolagem suave até o formulário. Menu hambúrguer no mobile.
2. **Hero (Primeira Dobra):** Título com proposta de valor clara, subtítulo objetivo, foto profissional do consultor, selo de credibilidade/vínculo e botão CTA principal.
3. **O que é a Consultoria & Diferencial:** Explicação do modelo independente (*fee-based*, sem conflito de interesses) em comparativo direto com o modelo tradicional baseado em comissões.
4. **Para quem é:** Cards objetivos descrevendo o perfil de clientes que mais se beneficiam (ex: organização patrimonial, proteção, estratégia de longo prazo).
5. **Etapas após a Reunião:** Linha do tempo visual em 4 passos:
   1. Reunião de diagnóstico
   2. Coleta de dados e perfil
   3. Montagem do portfólio personalizado
   4. Acompanhamento contínuo
6. **Quem sou eu:** Mini-biografia, formação/certificações e vínculo com a Varos (sujeito às diretrizes de compliance da empresa).
7. **Prova Social:** Bloco de depoimentos de clientes com estrutura modular para fácil inclusão/edição.
8. **Perguntas Frequentes (FAQ):** Acordeão interativo respondendo objeções comuns (custódia dos recursos no banco/corretora do cliente, valor mínimo, como funciona a remuneração).
9. **Formulário de Agendamento (CTA Final):** Qualificação rápida na própria página, com feedback visual de envio e botão opcional de redirecionamento para o WhatsApp após o sucesso.
10. **Rodapé:** Links sociais (Instagram/LinkedIn), link para `politica-de-privacidade.html` e aviso legal/disclaimer padrão de consultoria de investimentos.

---

## 3. Direção Visual e Performance

- **Abordagem:** Mobile-first (prioridade para quem abre o link pela bio do Instagram).
- **Paleta de Cores (Mercado Financeiro / Wealth):**
  - Fundo claro principal: Off-white (`#F8F9FA`) e Branco (`#FFFFFF`)
  - Blocos de destaque/contraste: Azul-marinho profundo (`#0B1F3A`) / Grafite (`#1A202C`)
  - Cor de acento (CTAs e detalhes): Dourado suave / Bronze (`#C5A059`) ou Verde-esmeralda sóbrio (`#1E6B52`) — definido via variáveis CSS no `:root` para troca rápida caso o consultor tenha identidade visual própria.
- **Tipografia:** Combinação de fonte serifada elegante nos títulos (ex: `Playfair Display` ou `Lora`) com sans-serif limpa no corpo (ex: `Inter` ou `Plus Jakarta Sans`) via Google Fonts com `display=swap`.
- **Performance:** Imagens otimizadas em WebP com `loading="lazy"` abaixo da dobra, CSS e JS enxutos sem frameworks externos.

---

## 4. Formulário, Fluxo de Dados e Segurança

### Campos do Formulário
- **Nome completo** (obrigatório)
- **WhatsApp** (obrigatório, com máscara/validação básica)
- **E-mail** (obrigatório, validação de formato)
- **Faixa de patrimônio investido** (select opcional para qualificação)
- **Principal objetivo** (select ou texto curto)
- **Aceite LGPD** (checkbox obrigatório com link para a Política de Privacidade)
- **Campo Honeypot** (campo oculto via CSS para bloquear bots de spam)

### Fluxo de Envio
1. Usuário clica em "Agendar reunião".
2. `main.js` valida os campos, verifica o honeypot e desabilita o botão (estado de carregamento) para evitar envios duplicados.
3. `fetch` envia os dados via `POST` para a URL do Web App do **Google Apps Script**.
4. O script grava uma nova linha na planilha do **Google Sheets** (com data/hora) e dispara um e-mail de notificação ao consultor.
5. Em caso de sucesso, o formulário exibe mensagem de confirmação + botão opcional para iniciar conversa no WhatsApp. Em caso de falha de rede, exibe mensagem amigável com contato alternativo (WhatsApp/e-mail).

### Segurança e Boas Práticas
- HTTPS forçado via GitHub Pages.
- Nenhuma credencial ou chave privada exposta no frontend (o endpoint do Apps Script aceita apenas inserção de leads).
- Proteção básica contra XSS (escape de conteúdo antes de gravar/exibir) e anti-spam (honeypot + cooldown de envio).
- Conformidade básica com LGPD (coleta mínima de dados + Política de Privacidade dedicada).

---

## 5. Checklist de Conteúdos Pendentes (Aguardar do Consultor)

Enquanto os materiais abaixo não chegam, a estrutura será desenvolvida com textos-base profissionais e claramente marcados para substituição:

- [ ] Nome completo / nome profissional e mini-bio
- [ ] Foto profissional em boa resolução (formato vertical/quadrado)
- [ ] Certificações (ex: CVM, CEA, CFP, Ancord) e regras de uso da marca Varos
- [ ] Links oficiais (Instagram, LinkedIn, WhatsApp comercial)
- [ ] Depoimentos reais de clientes (se já possuir)
- [ ] E-mail de destino para receber as notificações dos leads
- [ ] Confirmação das perguntas específicas do formulário de qualificação

---

## 6. Critérios de Sucesso e Verificação

- Site abre corretamente em mobile (375px+) e desktop (1280px+) sem quebra de layout ou rolagem horizontal.
- Todos os botões CTA rolam suavemente até o formulário.
- Acordeão do FAQ e menu mobile funcionam com acessibilidade básica (teclado e `aria-expanded`).
- Envio do formulário grava corretamente no Google Sheets e trata erros de validação/rede sem quebrar a página.
- Deploy funcional via GitHub Pages.
