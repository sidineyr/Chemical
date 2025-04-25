import tkinter as tk
from tkinter import messagebox

# Orbitais segundo Linus Pauling
linus_pauling_orbitals = [
    ("1s", 2), ("2s", 2), ("2p", 6), ("3s", 2), ("3p", 6),
    ("4s", 2), ("3d", 10), ("4p", 6), ("5s", 2), ("4d", 10),
    ("5p", 6), ("6s", 2), ("4f", 14), ("5d", 10), ("6p", 6),
    ("7s", 2), ("5f", 14), ("6d", 10), ("7p", 6)
]

# Elementos e números atômicos
# Inclui também o nome dos elementos
elementos = {
    "H": (1, "Hidrogênio"), "He": (2, "Hélio"), "Li": (3, "Lítio"), "Be": (4, "Berílio"), "B": (5, "Boro"),
    "C": (6, "Carbono"), "N": (7, "Nitrogênio"), "O": (8, "Oxigênio"), "F": (9, "Flúor"), "Ne": (10, "Neônio"),
    "Na": (11, "Sódio"), "Mg": (12, "Magnésio"), "Al": (13, "Alumínio"), "Si": (14, "Silício"), "P": (15, "Fósforo"),
    "S": (16, "Enxofre"), "Cl": (17, "Cloro"), "Ar": (18, "Argônio"), "K": (19, "Potássio"), "Ca": (20, "Cálcio"),
    "Sc": (21, "Escândio"), "Ti": (22, "Titânio"), "V": (23, "Vanádio"), "Cr": (24, "Cromo"), "Mn": (25, "Manganês")
}

def distribuir_eletrons(numero_atomico):
    eletrons = numero_atomico
    distribuicao = []
    for orbital, capacidade in linus_pauling_orbitals:
        if eletrons == 0:
            break
        ocupados = min(capacidade, eletrons)
        distribuicao.append(f"{orbital}^{ocupados}")
        eletrons -= ocupados
    return distribuicao

def aplicar_carga(z, carga):
    novo_z = z + carga
    tipo_ion = "ânion" if carga < 0 else "cátion"
    sinal = f"{'+' if carga > 0 else ''}{carga}"
    distribuicao = distribuir_eletrons(novo_z)
    return tipo_ion, sinal, distribuicao

def avaliar_escolha(elemento, tipo_esperado):
    if tipo_esperado == "cátion":
        explicacao = f"O {elemento} geralmente perde elétrons e forma cátions porque tem poucos elétrons na camada de valência."
    else:
        explicacao = f"O {elemento} geralmente ganha elétrons e forma ânions porque tem muitos elétrons na camada de valência e tende a completar o octeto."
    return explicacao

def escolher_carga(simbolo, z, nome):
    def aplicar(carga):
        tipo, sinal, nova_dist = aplicar_carga(z, carga)
        # Determinar resposta correta para o elemento baseado no grupo
        tipo_esperado = "cátion" if z in range(1, 13) or simbolo in ["K", "Ca", "Na"] else "ânion"

        if tipo == tipo_esperado:
            status = "✅ Resposta correta!"
            explicacao = avaliar_escolha(nome, tipo)
        else:
            status = "❌ Resposta incorreta."
            explicacao = avaliar_escolha(nome, tipo_esperado)

        msg = f"{nome} ({simbolo})\nZ = {z} com carga {sinal}\n\n"
        msg += f"Tipo formado: {tipo.upper()}\nNova Distribuição:\n{' '.join(nova_dist)}\n\n"
        msg += f"{status}\n{explicacao}"
        messagebox.showinfo("Resultado", msg)
        popup.destroy()

    popup = tk.Toplevel()
    popup.title("Transformar em Íon")
    tk.Label(popup, text=f"{nome} ({simbolo})\nZ = {z}\nDeseja ganhar ou perder elétrons?",
             font=("Arial", 12)).pack(padx=10, pady=10)

    btns = tk.Frame(popup)
    btns.pack(pady=5)

    tk.Button(btns, text="Virar CÁTION (+1)", command=lambda: aplicar(-1)).grid(row=0, column=0, padx=5)
    tk.Button(btns, text="Virar ÂNION (–1)", command=lambda: aplicar(+1)).grid(row=0, column=1, padx=5)

def mostrar_distribuicao(simbolo):
    z, nome = elementos[simbolo]
    distribuicao = distribuir_eletrons(z)
    mensagem = f"Elemento: {nome} ({simbolo})\nZ = {z}\n\nDistribuição eletrônica:\n" + " ".join(distribuicao)
    messagebox.showinfo("Distribuição de Elétrons", mensagem)
    escolher_carga(simbolo, z, nome)

# Tela inicial com animação
splash = tk.Tk()
splash.title("Átomo Arena")
splash.geometry("600x400")
splash.configure(bg="black")

label_titulo = tk.Label(splash, text="", font=("Courier", 32, "bold"), fg="lime", bg="black")
label_titulo.pack(expand=True)

texto = "\U0001F9EC ÁTOMO ARENA \U0001F9EA"
indice = 0


def animar_texto():
    global indice
    if indice < len(texto):
        label_titulo["text"] += texto[indice]
        indice += 1
        splash.after(150, animar_texto)
    else:
        btn_jogar = tk.Button(splash, text="▶ JOGAR", font=("Arial", 14, "bold"), bg="lime", fg="black",
                              command=iniciar_jogo)
        btn_jogar.pack(pady=20)


def iniciar_jogo():
    splash.destroy()
    abrir_menu_jogo()


def abrir_menu_jogo():
    root = tk.Tk()
    root.title("Átomo Arena: Íons em Ação")
    root.geometry("600x500")
    root.configure(bg="#eef")

    tk.Label(root, text="Escolha um elemento químico", font=("Arial", 16, "bold"), bg="#eef").pack(pady=10)
    frame_botoes = tk.Frame(root, bg="#eef")
    frame_botoes.pack(pady=10)

    for i, simbolo in enumerate(elementos):
        tk.Button(frame_botoes, text=simbolo, width=6, height=2,
                  command=lambda el=simbolo: mostrar_distribuicao(el)).grid(row=i // 5, column=i % 5, padx=5, pady=5)

    root.mainloop()

animar_texto()
splash.mainloop()
