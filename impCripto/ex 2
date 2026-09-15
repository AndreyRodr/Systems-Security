ALFABETO = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

def cesar(texto, chave):
    resultado = ""
    texto = texto.upper()

    for caractere in texto:
        if caractere in ALFABETO:
            posicao = ALFABETO.index(caractere)
            nova_posicao = (posicao + chave) % 26
            resultado += ALFABETO[nova_posicao]
        else:
            resultado += caractere

    return resultado


def decifrar(texto, chave):
    return cesar(texto, -chave)


mensagem = input("Digite uma palavra ou frase(deixe vazio para apenas decifrar uma mensagem): ")
chave = int(input("Digite o valor da chave K: "))

if mensagem:
    mensagem_cifrada = cesar(mensagem, chave)
    mensagem_decifrada = decifrar(mensagem_cifrada, chave)
else:
    mensagem_cifrada = input("Digite a mensagem cifrada: ")
    mensagem_decifrada = decifrar(mensagem_cifrada, chave)

print("\nMensagem original:", mensagem.upper())
print("Mensagem cifrada:", mensagem_cifrada)
print("Mensagem decifrada:", mensagem_decifrada)
