ALFABETO = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

def cripto(msg, key):
    msg = msg.upper()
    key = key.upper()
    cifra = ""
    if len(msg) < len(key):
        return 0
    if len(msg) > len(key):
        key = regularizar(key, len(msg))

    for letra, letraKey in zip(msg, key):
        if letra not in ALFABETO:
            cifra += letra
        else:
            idx = ALFABETO.index(letra) + ALFABETO.index(letraKey)
            letraAtual = ALFABETO[idx % 26]
            cifra += letraAtual
    return cifra 

def regularizar(key, length):
    i = len(key)
    j = 0
    while i < length:
        key += key[j]
        i += 1
        j += 1
    return key 


def decripto(cifra, key):
    cifra = cifra.upper()
    key = key.upper()
    msg = ""
    if len(cifra) < len(key):
        return 0
    if len(cifra) > len(key):
        key = regularizar(key, len(cifra))

    for letra, letraKey in zip(cifra, key):
        if letra not in ALFABETO:
            msg += letra
        else:
            idx = ALFABETO.index(letra) - ALFABETO.index(letraKey)
            letraAtual = ALFABETO[idx % 26]
            msg += letraAtual
    return msg 


msg = input("Insira uma mensagem (aperte ENTER se quiser descriptografar uma mensagem):")
key = input("Insira uma chave:")

if not msg:
    msgCripto = input("Insira a mensagem cifrada: ")
    print("Mensagem original: " + decripto(msgCripto, key))
else:
    cpt = cripto(msg, key)
    print("Mensagem cifrada: " + cpt)

