
def decimal_para_binario(numero, tamanho=0):
    if numero == 0:
        binario = "0"
    else:
        binario = ""
        n = numero
        while n > 0:
            binario = str(n % 2) + binario
            n = n // 2
    return binario.zfill(tamanho)

def binario_para_decimal(binario):
    decimal = 0
    for bit in binario:
        decimal = decimal * 2 + int(bit)
    return decimal

def xor_binario(bin1, bin2):
    resultado = ""
    for b1, b2 in zip(bin1, bin2):
        if b1 != b2:
            resultado += "1"
        else:
            resultado += "0"
    return resultado

def encriptar(mensagem, chave):

    tam_msg = len(decimal_para_binario(mensagem))
    tam_chave = len(decimal_para_binario(chave))
    tamanho = max(tam_msg, tam_chave)

    msg_bin = decimal_para_binario(mensagem, tamanho)
    chave_bin = decimal_para_binario(chave, tamanho)

    cifrado_bin = xor_binario(msg_bin, chave_bin)

    cifrado_dec = binario_para_decimal(cifrado_bin)

    print("\n--- ENCRIPTACAO ---")
    print("Mensagem (Decimal):", mensagem, "-> Binario:", msg_bin)
    print("Chave    (Decimal):", chave, "-> Binario:", chave_bin)
    print("Resultado XOR (Bin):", cifrado_bin)
    print("Cifrado  (Decimal):", cifrado_dec)

    return cifrado_dec

def decriptar(cifrado, chave):

    tamanho = max(len(decimal_para_binario(cifrado)), len(decimal_para_binario(chave)))

    cifrado_bin = decimal_para_binario(cifrado, tamanho)
    chave_bin = decimal_para_binario(chave, tamanho)

    recuperado_bin = xor_binario(cifrado_bin, chave_bin)

    mensagem_recuperada = binario_para_decimal(recuperado_bin)
    print("\n--- DECRIPTACAO ---")
    print("Cifrado  (Decimal):", cifrado, "-> Binario:", cifrado_bin)
    print("Chave    (Decimal):", chave, "-> Binario:", chave_bin)
    print("Resultado XOR (Bin):", recuperado_bin)
    print("Msg Original (Dec):", mensagem_recuperada)
    return mensagem_recuperada
if __name__ == "__main__":
    print("=== CRIPTOGRAFIA ONE-TIME PAD (OTP) ===")
    
    msg = int(input("Digite a mensagem (numero decimal): "))
    chave = int(input("Digite a chave    (numero decimal): "))
    cifrado = encriptar(msg, chave)
    recuperado = decriptar(cifrado, chave)
    print("\n--- RESULTADO FINAL ---")
    print("Mensagem inicial:   ", msg)
    print("Mensagem cifrada:   ", cifrado)
    print("Mensagem recuperada:", recuperado)
    if msg == recuperado:
        print("\nSucesso: A mensagem foi recuperada perfeitamente!")
    else:
        print("\nErro: Houve divergencia na recuperacao.")
