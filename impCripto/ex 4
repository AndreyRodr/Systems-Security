ALFABETO = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"


def inverso_modular(a, m=26):
    for x in range(1, m):
        if (a * x) % m == 1:
            return x
    return None


def matriz_inversa(chave):
    a, b = chave[0]
    c, d = chave[1]

    determinante = (a * d - b * c) % 26
    inverso_det = inverso_modular(determinante)

    if inverso_det is None:
        raise ValueError("A matriz chave não possui inversa módulo 26.")

    return [
        [(d * inverso_det) % 26, (-b * inverso_det) % 26],
        [(-c * inverso_det) % 26, (a * inverso_det) % 26]
    ]


def hill(texto, chave):
    texto = texto.upper().replace(" ", "")

    # A Cifra de Hill trabalha com blocos de 2 letras.
    if len(texto) % 2 != 0:
        texto += "X"

    resultado = ""

    for i in range(0, len(texto), 2):
        x = ALFABETO.index(texto[i])
        y = ALFABETO.index(texto[i + 1])

        nova_x = (chave[0][0] * x + chave[0][1] * y) % 26
        nova_y = (chave[1][0] * x + chave[1][1] * y) % 26

        resultado += ALFABETO[nova_x]
        resultado += ALFABETO[nova_y]

    return resultado


def decifrar(texto, chave):
    chave_inversa = matriz_inversa(chave)
    return hill(texto, chave_inversa)


# Matriz chave
chave = [
    [3, 3],
    [2, 5]
]

mensagem = input("Digite a mensagem (ou deixe vazio para decifrar): ")

if mensagem:
    mensagem_cifrada = hill(mensagem, chave)
    mensagem_decifrada = decifrar(mensagem_cifrada, chave)

    print("\nMensagem original:", mensagem.upper())
    print("Mensagem cifrada:", mensagem_cifrada)
    print("Mensagem decifrada:", mensagem_decifrada)

else:
    mensagem_cifrada = input("Digite a mensagem cifrada: ")
    mensagem_decifrada = decifrar(mensagem_cifrada, chave)

    print("\nMensagem cifrada:", mensagem_cifrada)
    print("Mensagem decifrada:", mensagem_decifrada)
