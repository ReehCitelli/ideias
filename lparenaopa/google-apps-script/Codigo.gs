/**
 * =============================================================================
 *  NÚCLEO MOTOPEÇAS E ACESSÓRIOS — Recebedor do formulário da landing page
 *  Google Apps Script vinculado a uma Planilha Google (Google Sheets)
 * =============================================================================
 *
 *  O que este script faz:
 *    • Recebe o POST enviado pelo formulário do site (JSON em text/plain)
 *    • Grava uma linha nova na aba "Leads" da planilha
 *    • (Opcional) Dispara um e-mail avisando que chegou pedido de peça
 *    • Devolve um JSON { result: 'success' } para o site
 *
 *  Passo a passo de implantação: veja LEIA-ME.md na raiz do projeto.
 * =============================================================================
 */

/* -----------------------------------------------------------------------------
 *  CONFIGURAÇÃO — edite só aqui
 * -------------------------------------------------------------------------- */
var CONFIG = {
  // Nome da aba (guia) da planilha onde os pedidos serão gravados.
  // Se ela não existir, o script cria automaticamente.
  SHEET_NAME: 'Leads',

  // Avisar por e-mail a cada novo pedido?
  NOTIFY_BY_EMAIL: false,

  // Para onde mandar o aviso (só vale se NOTIFY_BY_EMAIL = true).
  // >>> TROCAR pelo e-mail real da loja.
  NOTIFY_TO: 'coloque-o-email-da-loja@exemplo.com',

  // Assunto do e-mail de aviso
  NOTIFY_SUBJECT: '[Site] Novo pedido de peça — Núcleo Motopeças'
};

/* Cabeçalhos das colunas, na ordem em que aparecem na planilha */
var HEADERS = [
  'Data/Hora',
  'Nome',
  'WhatsApp/Telefone',
  'E-mail',
  'Peça / Modelo da moto',
  'Origem',
  'Página',
  'Status'
];

/* -----------------------------------------------------------------------------
 *  doPost — chamado quando o formulário do site envia os dados
 * -------------------------------------------------------------------------- */
function doPost(e) {
  // Trava para evitar que dois envios simultâneos escrevam na mesma linha
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
  } catch (err) {
    return jsonOut({ result: 'error', message: 'Servidor ocupado, tente novamente.' });
  }

  try {
    var data = parseBody(e);

    // Honeypot anti-spam: se o campo invisível veio preenchido, é robô.
    // Responde "success" de propósito para o bot não perceber.
    if (data.website) {
      return jsonOut({ result: 'success', ignored: true });
    }

    // Validação mínima no servidor
    var nome = String(data.nome || '').trim();
    var telefone = String(data.telefone || '').trim();
    var peca = String(data.peca || '').trim();

    if (!nome || !telefone || !peca) {
      return jsonOut({ result: 'error', message: 'Campos obrigatórios faltando (nome, telefone, peça).' });
    }

    var sheet = getSheet_();

    var carimbo = data.enviadoEm
      ? String(data.enviadoEm)
      : Utilities.formatDate(new Date(), 'America/Sao_Paulo', 'dd/MM/yyyy HH:mm:ss');

    sheet.appendRow([
      carimbo,
      nome,
      "'" + telefone,                       // apóstrofo = força texto, preserva o (19) e o zero
      String(data.email || '').trim(),
      peca,
      String(data.origem || 'Landing page'),
      String(data.pagina || ''),
      'Novo'                                 // coluna de controle interno da loja
    ]);

    if (CONFIG.NOTIFY_BY_EMAIL) {
      notify_(nome, telefone, data.email, peca, carimbo);
    }

    return jsonOut({ result: 'success' });

  } catch (err) {
    console.error(err);
    return jsonOut({ result: 'error', message: String(err && err.message ? err.message : err) });
  } finally {
    lock.releaseLock();
  }
}

/* -----------------------------------------------------------------------------
 *  doGet — só para você conseguir testar no navegador se o app está no ar
 * -------------------------------------------------------------------------- */
function doGet() {
  return jsonOut({
    result: 'success',
    message: 'Endpoint da Núcleo Motopeças está no ar. Use POST para enviar um pedido.'
  });
}

/* -----------------------------------------------------------------------------
 *  Auxiliares
 * -------------------------------------------------------------------------- */

/** Lê o corpo da requisição, aceitando JSON (text/plain) ou form-urlencoded. */
function parseBody(e) {
  if (!e) return {};

  // 1) JSON cru (é o que a landing page envia)
  if (e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents);
    } catch (ignore) { /* não era JSON, cai para o parâmetro abaixo */ }
  }

  // 2) application/x-www-form-urlencoded ou multipart/form-data
  if (e.parameter && Object.keys(e.parameter).length) {
    return e.parameter;
  }

  return {};
}

/** Devolve a aba de destino, criando-a (com cabeçalho formatado) se não existir. */
function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CONFIG.SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    var head = sheet.getRange(1, 1, 1, HEADERS.length);
    head.setFontWeight('bold')
        .setBackground('#11A73F')
        .setFontColor('#FFFFFF');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 150); // Data/Hora
    sheet.setColumnWidth(2, 180); // Nome
    sheet.setColumnWidth(3, 160); // Telefone
    sheet.setColumnWidth(4, 200); // E-mail
    sheet.setColumnWidth(5, 380); // Peça
  }

  return sheet;
}

/** Envia e-mail de aviso para a loja. */
function notify_(nome, telefone, email, peca, carimbo) {
  try {
    var corpo =
      'Novo pedido de peça pelo site\n\n' +
      'Quando: ' + carimbo + '\n' +
      'Nome: ' + nome + '\n' +
      'Telefone/WhatsApp: ' + telefone + '\n' +
      'E-mail: ' + (email || '—') + '\n\n' +
      'Peça / modelo da moto:\n' + peca + '\n';

    MailApp.sendEmail(CONFIG.NOTIFY_TO, CONFIG.NOTIFY_SUBJECT, corpo);
  } catch (err) {
    console.error('Falha ao enviar e-mail de aviso: ' + err);
  }
}

/** Resposta JSON. */
function jsonOut(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/* -----------------------------------------------------------------------------
 *  TESTE RÁPIDO
 *  No editor do Apps Script, selecione a função "testarGravacao" e clique em
 *  Executar. Deve aparecer uma linha de teste na planilha.
 * -------------------------------------------------------------------------- */
function testarGravacao() {
  var resposta = doPost({
    postData: {
      contents: JSON.stringify({
        nome: 'TESTE — pode apagar',
        telefone: '(19) 99999-9999',
        email: 'teste@exemplo.com',
        peca: 'Kit relação Honda CG 160 — linha de teste',
        origem: 'Teste manual do Apps Script',
        pagina: 'editor'
      })
    }
  });
  Logger.log(resposta.getContent());
}
