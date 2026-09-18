/**
 * ============================================================================
 * NÚCLEO MOTOPEÇAS E ACESSÓRIOS — Recebedor do formulário do site
 * ============================================================================
 * Este script recebe os pedidos enviados pelo formulário da landing page e
 * grava cada envio como uma linha nova na planilha do Google Sheets.
 *
 * PASSO A PASSO DE IMPLANTAÇÃO: veja o arquivo apps-script/COMO-IMPLANTAR.md
 *
 * Como funciona:
 * 1. Você cria uma planilha no Google Sheets.
 * 2. Cola este código no Apps Script da planilha (Extensões → Apps Script).
 * 3. Implanta como "Aplicativo da Web" com acesso "Qualquer pessoa".
 * 4. Copia a URL gerada e cola em CONFIG.appsScriptUrl dentro do index.html.
 * ============================================================================
 */

var NOME_ABA = 'Respostas';

/** Recebe os envios do formulário (POST) e grava na planilha. */
function doPost(e) {
  try {
    var dados = JSON.parse(e.postData.contents);

    var planilha = SpreadsheetApp.getActiveSpreadsheet();
    var aba = planilha.getSheetByName(NOME_ABA);
    if (!aba) {
      aba = planilha.insertSheet(NOME_ABA);
    }

    // Cria o cabeçalho apenas na primeira vez
    if (aba.getLastRow() === 0) {
      aba.appendRow([
        'Data', 'Nome', 'Telefone/WhatsApp', 'E-mail',
        'Peça / Mensagem', 'Origem', 'Página', 'Enviado em'
      ]);
      aba.getRange(1, 1, 1, 8).setFontWeight('bold');
      aba.setFrozenRows(1);
    }

    aba.appendRow([
      new Date(),
      dados.nome || '',
      dados.telefone || '',
      dados.email || '',
      dados.mensagem || '',
      dados.origem || 'Site',
      dados.pagina || '',
      dados.enviadoEm || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (erro) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, erro: String(erro) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/** Teste simples: abrir a URL no navegador deve mostrar {"ok":true,...} */
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, msg: 'Webhook da Núcleo Motopeças ativo.' }))
    .setMimeType(ContentService.MimeType.JSON);
}
