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


def pontuacao(texto):
    palavras = texto.split()

    # Palavras comuns da língua portuguesa
    pesos = {
        "A": 2,
        "O": 2,
        "E": 2,
        "DE": 3,
        "DO": 3,
        "DA": 3,
        "EM": 3,
        "UM": 3,
        "UMA": 3,
        "AO": 3,
        "QUE": 5,
        "PARA": 5,
        "COM": 4,
        "NA": 3,
        "NO": 3
    }

    pontos = 0

    for palavra in palavras:
        if palavra in pesos:
            pontos += pesos[palavra]

    # Letras mais frequentes no português
    for letra in texto:
        if letra in "AEOSRIN":
            pontos += 1

    return pontos


def ataque(texto_cifrado):
    resultados = []

    print("\nTodas as possibilidades:\n")

    for chave in range(1, 26):
        texto_decifrado = decifrar(texto_cifrado, chave)
        pontos = pontuacao(texto_decifrado)

        resultados.append((pontos, chave, texto_decifrado))

        print(f"Chave {chave:2}: {texto_decifrado}")

    melhor = max(resultados, key=lambda item: item[0])

    print("\nSugestão pela análise de frequência:")
    print("Chave provável:", melhor[1])
    print("Texto provável:", melhor[2])
    print("Pontuação:", melhor[0])


texto_cifrado = input("Digite o texto cifrado: ")

ataque(texto_cifrado)
