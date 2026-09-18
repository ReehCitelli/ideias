# Núcleo Motopeças e Acessórios — Landing page

Landing page de página única, mobile-first, em **um único arquivo HTML autocontido**
(`index.html`), com CSS e JavaScript embutidos.

- **Sem framework, sem build, sem servidor.** É só dar duplo clique no `index.html`
  que ele abre e funciona.
- **Zero requisições externas**: nenhuma fonte do Google, nenhum CDN, nenhuma imagem
  hospedada fora. Isso é proposital — o público acessa quase 100% pelo celular,
  muitas vezes com internet fraca.
- Todos os gráficos (logo, ícones, ilustração do hero) são **SVG originais feitos à mão**,
  embutidos no próprio HTML. Nenhuma foto de terceiros foi usada.

---

## 1. Arquivos

| Arquivo | Para que serve |
|---|---|
| `index.html` | **O site inteiro.** É este arquivo que você publica. |
| `google-apps-script/Codigo.gs` | Código que recebe o formulário e grava na Planilha Google. |
| `readme.md` | Este guia. |

> Se você rodar `npm run build`, o resultado em `dist/index.html` é exatamente o mesmo
> site (arquivo único). Pode publicar qualquer um dos dois.

---

## 2. Configuração rápida do site

Abra o `index.html` em um editor de texto e procure pelo bloco
**`⚙️ CONFIGURAÇÃO RÁPIDA`** (no início da tag `<script>`, perto do fim do arquivo).

```js
var CONFIG = {
  ctaMode: 'call',                 // 'call'  |  'whatsapp'
  phoneDisplay: '(19) 3276-7035',
  phoneTel: '+551932767035',
  whatsappNumber: '5519XXXXXXXXX', // 55 + DDD + número, só dígitos
  whatsappMessage: 'Olá! Vim pelo site. Preciso de uma peça: ',
  sheetsEndpoint: 'COLE_AQUI_A_URL_DO_APPS_SCRIPT',
  storeName: 'Núcleo Motopeças e Acessórios'
};
```

### 2.1. Trocar o CTA entre "Ligar agora" e "Chamar no WhatsApp"

O número **(19) 3276-7035** tem 8 dígitos, então é quase certo que seja **fixo** —
por isso o site já vem configurado em `ctaMode: 'call'` (botão "Ligar agora").

**Assim que confirmar que a loja tem WhatsApp:**

1. Troque `ctaMode: 'call'` por `ctaMode: 'whatsapp'`.
2. Preencha `whatsappNumber` com o número real, só dígitos, começando em `55`.
   Exemplo: `'5519991234567'`.
3. Salve. Pronto.

Todos os botões principais (topo, hero, menu mobile, bloco de contato e barra fixa
do celular) mudam de uma vez só: texto, ícone, link e `aria-label`.

> Proteção embutida: se você colocar `ctaMode: 'whatsapp'` mas esquecer de preencher
> um número válido, o site **volta automaticamente** para "Ligar agora" e avisa no
> console do navegador. Nunca fica um botão quebrado no ar.

Para testar sem editar o arquivo, abra o console do navegador e digite:
`setCtaMode('whatsapp')` ou `setCtaMode('call')`.

### 2.2. Trocar o logo pelo arquivo real

O logo atual é uma marca gráfica **original em SVG** inspirada na identidade descrita
(verde + branco, bandeira quadriculada de corrida). Quando tiver o arquivo real:

1. Procure no `index.html` pelo comentário `LOGO (marca gráfica original em SVG...)`.
2. Troque o `<svg class="logo-mark">` por:
   ```html
   <img src="logo-nucleo.svg" alt="Núcleo Motopeças e Acessórios" class="logo-mark">
   ```
3. Repita nos outros 2 lugares onde o logo aparece (menu mobile e rodapé).
4. Se quiser manter o site em **arquivo único**, converta o logo para *data URI*
   (base64) em vez de usar um arquivo separado.

### 2.3. Substituir os depoimentos de exemplo

⚠️ **Os depoimentos que estão no site agora são FICTÍCIOS.** Estão marcados no código
com um bloco de aviso bem visível e também com um aviso na própria página
("Depoimentos ilustrativos").

Para substituir:

1. Procure no `index.html` pelo array `TESTIMONIALS`.
2. Troque por avaliações **reais e autorizadas** (Google, WhatsApp, recados de clientes):
   ```js
   var TESTIMONIALS = [
     { text: 'texto real da avaliação', name: 'Nome real', role: 'Motoboy · Campinas-SP', initials: 'NR' }
   ];
   ```
3. Depois de trocar, remova o parágrafo com a classe `tst-disclaimer` (o aviso
   "Depoimentos ilustrativos") logo abaixo do carrossel.

Não invente nota, estrelas ou quantidade de avaliações.

### 2.4. Preencher os dados que ainda faltam

Todas as informações **não confirmadas** aparecem no site como placeholder amarelo
tracejado, por exemplo: `[endereço aqui]`. É só procurar por `class="ph"` no HTML
e substituir o conteúdo. Os que estão pendentes hoje:

- `[endereço aqui]` / `[endereço completo aqui]` (aparece em 4 lugares)
- `[horário de funcionamento aqui]`
- `[e-mail aqui]`
- `[@perfil aqui]` (Instagram)
- `[CNPJ aqui]`
- `[listar marcas aqui]` e `[confirmar com a loja]` (na seção de peças)

Nenhum número, data ou fato foi inventado.

---

## 3. Formulário → Planilha Google (Apps Script)

O formulário envia os dados para um **app da web do Google Apps Script**, que grava
cada pedido numa linha da Planilha Google. Não há backend nem banco de dados.

### Passo a passo

**1) Crie a planilha**

- Vá em [sheets.new](https://sheets.new) e crie uma planilha.
- Dê um nome, por exemplo: `Núcleo Motopeças — Pedidos do site`.
- Não precisa criar colunas: o script cria a aba `Leads` e o cabeçalho sozinho.

**2) Abra o editor de scripts**

- Na planilha: menu **Extensões → Apps Script**.
- Vai abrir o editor com um arquivo `Código.gs` contendo `function myFunction() {}`.

**3) Cole o código**

- Apague todo o conteúdo do `Código.gs`.
- Copie **todo** o conteúdo de `google-apps-script/Codigo.gs` deste projeto e cole lá.
- No topo do arquivo, ajuste o bloco `CONFIG` se quiser receber aviso por e-mail:
  - `NOTIFY_BY_EMAIL: true`
  - `NOTIFY_TO: 'email-real-da-loja@...'`
- Clique no ícone de **salvar** (💾) e dê um nome ao projeto,
  ex.: `Núcleo Motopeças — Formulário`.

**4) Teste antes de publicar (opcional, mas recomendado)**

- No seletor de funções (barra de cima), escolha **`testarGravacao`** e clique em
  **Executar**.
- Na primeira execução o Google vai pedir autorização:
  **Revisar permissões → escolher sua conta → Avançado → Acessar (nome do projeto) →
  Permitir**.
  > O aviso de "app não verificado" é normal: o app é seu e roda só na sua conta.
- Volte na planilha: deve ter aparecido a aba `Leads` com uma linha de teste.
  Pode apagar a linha depois.

**5) Implante como app da web**

- No editor, botão azul **Implantar → Nova implantação**.
- Clique na engrenagem ⚙️ ao lado de "Selecionar tipo" e escolha **App da Web**.
- Preencha:
  - **Descrição**: `v1 — formulário do site`
  - **Executar como**: **Eu** (seu e-mail)
  - **Quem pode acessar**: **Qualquer pessoa** ← *essencial*, senão o site não consegue enviar
- Clique em **Implantar** e autorize, se pedir.
- Copie a **URL do app da web**. Ela termina em `/exec`, mais ou menos assim:
  ```
  https://script.google.com/macros/s/AKfycbx.....................­/exec
  ```

> ⚠️ Cuidado: existem duas URLs. Use a que termina em **`/exec`** (produção),
> não a `/dev`.

**6) Ligue o site ao endpoint**

- Abra o `index.html` e cole a URL em:
  ```js
  sheetsEndpoint: 'https://script.google.com/macros/s/AKfycbx..../exec',
  ```
- Salve, abra o site, preencha o formulário e envie.
- Confira a planilha: a linha deve aparecer em alguns segundos.

**7) Sempre que alterar o Apps Script**

- **Implantar → Gerenciar implantações → ✏️ (editar) → Versão: Nova versão → Implantar.**
- A URL continua a mesma. Se você criar uma "Nova implantação" do zero, a URL muda e
  você precisa atualizar o `sheetsEndpoint`.

### Como o envio funciona (detalhe técnico)

O site faz `fetch` com `Content-Type: text/plain;charset=utf-8` e o corpo em JSON.
Isso evita o *preflight* de CORS, que o Apps Script não responde. O script lê com
`JSON.parse(e.postData.contents)`.

Se por algum motivo a leitura da resposta falhar, o site reenvia automaticamente em
`mode: 'no-cors'` (grava do mesmo jeito) e ainda assim mostra a confirmação ao usuário,
com o telefone como alternativa. Enquanto o `sheetsEndpoint` não estiver configurado,
o formulário mostra um aviso amarelo explicando isso (e não finge que enviou).

---

## 4. Publicar o site

Como é um arquivo só, dá para publicar em praticamente qualquer lugar:

- **Netlify Drop** — arraste o `index.html` para [app.netlify.com/drop](https://app.netlify.com/drop).
- **Vercel / Cloudflare Pages** — suba a pasta; ele detecta o `index.html` sozinho.
- **GitHub Pages** — commit do `index.html` na branch e ative o Pages.
- **Hospedagem comum (cPanel/FTP)** — jogue o `index.html` na pasta `public_html`.

Depois de publicar, vale registrar o site no **Perfil da Empresa no Google** (a ficha
que já existe), porque é de lá que vem boa parte do tráfego local.

---

## 5. Checklist antes de colocar no ar

- [ ] Confirmar se **(19) 3276-7035** tem WhatsApp → ajustar `ctaMode`
- [ ] Preencher **endereço completo**
- [ ] Preencher **horário de funcionamento**
- [ ] Preencher **e-mail** e **CNPJ** (ou remover as linhas)
- [ ] Trocar o logo SVG pelo **arquivo real** da loja
- [ ] Substituir os **depoimentos de exemplo** por avaliações reais + remover o aviso
- [ ] Publicar o **Apps Script** e colar a URL em `sheetsEndpoint`
- [ ] Fazer um **envio de teste** e confirmar a linha na planilha
- [ ] Abrir o site **no celular** e testar botão de ligar, menu e formulário

---

## 6. O que foi deliberadamente deixado de fora

Da referência visual (template de curso online), estes elementos **não** foram usados,
por não fazerem sentido para uma loja de peças:

- Timer de contagem regressiva
- Acordeão de currículo / módulos
- Toggle de parcelamento e tabela de planos
- Globo 3D / Three.js
- Backend com banco de dados (Supabase) e stack React com etapa de build

Aproveitado da referência: tema escuro com destaque verde (no lugar do laranja),
carrossel de depoimentos interativo, navbar com blur ao rolar, scroll suave,
animações de entrada discretas e menu hambúrguer no mobile.

Veja o site
https://reehcitelli.github.io/ideias/lparenaopa/index.html
