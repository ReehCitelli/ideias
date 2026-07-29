import os

def limpar_tela():
    os.system('cls' if os.name == 'nt' else 'clear')

nome = input('Qual é o seu nome? ')
saldo = 0.0
historico = []

while True:
    limpar_tela()
    print('+' * 10, 'BANCO DA RENATA', '+' * 10)
    print(f'Bem-vindo(a), {nome}!')
    print('''MENU:
[ 0 ] SALDO
[ 1 ] SACAR
[ 2 ] DEPOSITAR
[ 3 ] EXTRATO
[ X ] SAIR''')

    opcao = input('ESCOLHA UMA OPÇÃO: ').upper()

    if opcao == '0':
        print(f'{nome}, seu saldo é R${saldo:.2f}')

    elif opcao == '1':
        valor = float(input('Quanto deseja sacar? R$'))
        if valor > saldo:
            print('Saldo insuficiente!')
        else:
            saldo -= valor
            historico.append(f'Saque de R${valor:.2f}')

    elif opcao == '2':
        valor = float(input('Quanto deseja depositar? R$'))
        if valor > 0:
            saldo += valor
            historico.append(f'Depósito de R${valor:.2f}')
        else:
            print('Valor de depósito inválido!')

    elif opcao == '3':
        if historico:
            for operacao in historico:
                print(operacao)
        else:
            print('Nenhuma operação realizada ainda.')

    elif opcao == 'X':
        print(f'Saindo... até logo, {nome}!')
        break

    else:
        print('OPÇÃO INVÁLIDA')

    input('\nPressione ENTER para continuar...')
