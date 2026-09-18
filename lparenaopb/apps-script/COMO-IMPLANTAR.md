# Como implantar o recebedor do formulário (Google Sheets + Apps Script)

Este guia conecta o formulário da landing page a uma planilha do Google Sheets.
Tempo estimado: **~5 minutos**. Não precisa de servidor, domínio nem cartão de crédito.

O código a ser colado está no arquivo **`Codigo.gs`** (nesta mesma pasta).

---

## Passo 1 — Criar a planilha

1. Acesse [sheets.new](https://sheets.new) (ou drive.google.com → Novo → Planilhas Google).
2. Dê um nome à planilha, por exemplo: `Pedidos do Site — Núcleo Motopeças`.

## Passo 2 — Abrir o Apps Script

1. Na planilha, clique em **Extensões → Apps Script**.
2. Apague o conteúdo de exemplo (`function myFunction() {}`).
3. Copie **todo o conteúdo do arquivo `Codigo.gs`** e cole no editor.
4. Clique no ícone de **salvar** (disquete).

## Passo 3 — Implantar como Aplicativo da Web

1. Clique em **Implantar → Nova implantação**.
2. Clique no ícone de **engrenagem** (ao lado de "Selecionar tipo") e escolha **Aplicativo da Web**.
3. Preencha:
   - **Descrição**: `Recebedor do formulário do site` (opcional)
   - **Executar como**: `Eu (a sua conta do Google)`
   - **Quem tem acesso**: `Qualquer pessoa` ← **importante! Sem isso o site não consegue enviar.**
4. Clique em **Implantar**.

## Passo 4 — Autorizar o acesso (uma única vez)

1. O Google vai pedir autorização para o script acessar a planilha. Clique em **Autorizar acesso**.
2. Escolha a sua conta do Google.
3. Aparecerá um aviso *"O Google não verificou este app"*. Isso é **normal** para scripts
   pessoais: clique em **Avançado → Acessar (nome do projeto)** e depois em **Permitir**.

## Passo 5 — Copiar a URL

1. Após a implantação, aparecerá a **URL do aplicativo da web**
   (algo como `https://script.google.com/macros/s/AKfy.../exec`).
2. Clique em **Copiar**.

## Passo 6 — Colar a URL no site

1. Abra o arquivo **`index.html`** da landing page.
2. Procure por **`CONFIGURAÇÃO DA LOJA`** (fica dentro do `<script>`, no fim do arquivo).
3. Na linha `appsScriptUrl: 'COLE_AQUI_A_URL_DO_APPS_SCRIPT'`, substitua
   `COLE_AQUI_A_URL_DO_APPS_SCRIPT` pela URL copiada.

Pronto — o formulário já está gravando na planilha.

---

## Como testar

1. **Teste rápido da URL**: cole a URL do app da web na barra de endereço do navegador
   e abra. Deve aparecer: `{"ok":true,"msg":"Webhook da Núcleo Motopeças ativo."}`
2. **Teste do formulário**: abra o site no celular, preencha o formulário e envie.
3. Confira na planilha: uma aba chamada **Respostas** será criada automaticamente,
   com o cabeçalho e uma linha nova para cada envio.

---

## Se você editar o código depois

A URL **não muda** se você atualizar o script assim:

1. No Apps Script, clique em **Implantar → Gerenciar implantações**.
2. Clique no **lápis** (editar) da implantação ativa.
3. Em **Versão**, selecione **Nova versão**.
4. Clique em **Implantar**.

---

## Problemas comuns

| Problema | Causa provável | Solução |
|---|---|---|
| Formulário mostra erro ao enviar | URL não colada (ou colada errada) no `index.html` | Confira o Passo 6 |
| Nada chega na planilha | Acesso não está como "Qualquer pessoa" | Refaça o Passo 3, item 3 |
| Erro `401` / `403` ao abrir a URL | Mesmo motivo acima | Mesmo motivo acima |
| Aviso "app não verificado" | Normal para scripts pessoais | Passo 4, item 3 |
| Editou o código e parou de funcionar | Implantação antiga ainda ativa | Seção "Se você editar o código depois" |

## Dicas extras

- **Notificações por e-mail a cada pedido** (opcional): no `Codigo.gs`, dentro do `doPost`,
  logo após o `aba.appendRow([...]);`, adicione:
  `MailApp.sendEmail('seu-email@exemplo.com', 'Novo pedido de peça pelo site', dados.nome + ' — ' + dados.telefone + ' — ' + dados.mensagem);`
- **Celular na palma da mão**: instale o app do Google Sheets no celular para
  acompanhar os pedidos que chegam.
