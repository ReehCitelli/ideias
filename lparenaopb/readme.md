# Núcleo Motopeças e Acessórios · Landing page

Landing page mobile-first da **Núcleo Motopeças e Acessórios**, loja de peças
de moto em Campinas-SP. Página única, focada em captar contato (não é loja
online, não tem carrinho nem checkout).

> **Status atual do conteúdo**
>
> | Dado                              | Status                  |
> |-----------------------------------|-------------------------|
> | Telefone (19) 3276-7035           | ✅ confirmado            |
> | WhatsApp                          | ⏳ não confirmado — CTA está em modo **"Ligar agora"** |
> | Endereço                          | 🔲 placeholder no site  |
> | Horário de funcionamento          | 🔲 placeholder no site  |
> | E-mail / Instagram / CNPJ         | 🔲 placeholder no site  |
> | Depoimentos                       | ⚠️ fictícios (ilustrativos) — marcados no código e na UI |
> | Logo                              | marca gráfica original em SVG (a ser trocada pelo logo real) |

Nenhum dado específico foi inventado. O que ainda falta aparece no site como
placeholder amarelo tracejado, p. ex. `[endereço aqui]`.

---

## Arquivos do projeto

```
.
├── index.html                          ← 🌐 O SITE INTEIRO (HTML + CSS + JS embutidos)
├── google-apps-script/
│   └── Codigo.gs                       ← doPost que grava o formulário na Planilha Google
├── LEIA-ME.md                          ← 📖 Guia técnico (configuração, deploy, checklist)
└── README.md                           ← (você está aqui)
```

O **site é um único arquivo** (`index.html`). Abre com duplo clique — não precisa
de build, servidor, npm, nem internet para funcionar.

Rodar `npm run build` gera `dist/index.html`, que é o mesmo site minificado
(≈ 77 kB, 20 kB gzip). Pode publicar qualquer um dos dois.

---

## Abrir e testar (30 segundos)

```bash
# só abrir o arquivo no navegador — não precisa de nada
open index.html
```

Ou, se quiser servir localmente:

```bash
npm install
npm run build
npx serve dist
```

**Trocar o CTA ao vivo** (sem editar o arquivo): abra o console do navegador e
digite `setCtaMode('whatsapp')` ou `setCtaMode('call')`.

---

## Guia completo

Tudo que precisa para publicar o site — inclusive o passo a passo do Apps Script —
está em **[LEIA-ME.md](./LEIA-ME.md)**. Resumo dos passos:

1. Abrir o `index.html` e preencher o bloco `CONFIG` no início do `<script>`
2. Publicar o `Codigo.gs` como app da web no Google Apps Script
3. Colar a URL `/exec` em `CONFIG.sheetsEndpoint`
4. Subir o `index.html` em qualquer hospedagem (Netlify Drop, Vercel, GitHub Pages, FTP…)
5. Passar no checklist do final do LEIA-ME

---

## Stack (ou a falta dela)

- **Zero framework.** HTML, CSS e JS puro, em um arquivo só.
- **Zero dependência externa.** Nenhuma fonte do Google, nenhum CDN, nenhuma imagem
  hospedada fora. Gráficos são SVG originais embutidos.
- **Zero backend próprio.** O formulário fala direto com um Apps Script vinculado
  a uma Planilha Google (instruções no LEIA-ME).
- **Tema escuro**, paleta derivada do verde/branco da logo, destaque em verde
  no lugar do laranja do template de referência.

---

## Referência de estilo

Baseado no template [*Ignite* da Lovable](https://lovable.dev/pt-br/templates/websites/landing-page/ignite-cohort-course-landing-page-template) —
apenas linguagem visual, não stack. Aproveitado: tema escuro, carrossel
interativo de depoimentos, navbar com blur ao rolar, scroll suave,
animações discretas e menu hambúrguer. **Deixado de fora**: timer de contagem,
acordeão de currículo, toggle de parcelamento, globo 3D / Three.js e Supabase.

---

## Licença / uso

Feito para a Núcleo Motopeças e Acessórios (Campinas-SP). Uso exclusivo da loja.
https://reehcitelli.github.io/ideias/lparenaopb/index.html
