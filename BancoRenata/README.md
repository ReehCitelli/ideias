# 🏦 Banco da Renata

Simulador de banco feito em Python, criado como projeto de estudo durante a jornada de transição para a área de dados/tecnologia.

## 📋 Sobre o projeto

Este é um sistema bancário simples via terminal, onde o usuário pode consultar saldo, sacar, depositar e ver o extrato de suas operações. O projeto está na sua **v1.0**, funcionando com um único cliente. A ideia é evoluir para uma **v2.0** com suporte a múltiplos clientes.

## ⚙️ Funcionalidades

- 👤 Identificação do usuário pelo nome
- 💰 Consulta de saldo
- 💸 Saque (com validação de saldo insuficiente)
- 📥 Depósito (com validação de valores inválidos)
- 📜 Extrato com histórico de todas as operações realizadas
- 🖥️ Limpeza automática de tela a cada operação (compatível com Windows, Linux e Mac)

## 🚀 Como rodar

Certifique-se de ter o Python 3 instalado. Depois, no terminal:

```bash
python banco_da_renata.py
```

## 🧠 Conceitos aplicados

- Estruturas de repetição (`while`)
- Estruturas condicionais (`if` / `elif` / `else`)
- Listas para armazenar histórico de operações
- f-strings para formatação de saída
- Manipulação de sistema operacional (`os.system`) para limpeza de tela

## 🔜 Próximos passos (v2.0)

- [ ] Suporte a múltiplos clientes
- [ ] Limite de saques diários
- [ ] Senha de acesso
- [ ] Salvar dados em arquivo, mantendo o saldo entre execuções

## 👩‍💻 Autora

Desenvolvido por **Renata** ([@ReehCitelli](https://instagram.com/renatacitelli)) como parte dos estudos de lógica de programação em Python.
