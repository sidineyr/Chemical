import pandas as pd
import tkinter as tk
from tkinter import ttk

class PeriodicTableApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Framework de Memorização da Tabela Periódica")
        
        # Carregar dados e garantir que Família/Grupo seja numérico
        self.df = pd.read_csv("periodic_table.csv")
        self.df["Família/Grupo"] = pd.to_numeric(self.df["Família/Grupo"], errors='coerce').fillna(0).astype(int)
        
        # Dicionários para armazenar os elementos da interface
        self.element_rectangles = {}
        self.element_symbols = {}
        self.element_numbers = {}
        
        self.setup_ui()
        self.draw_periodic_table()

    def setup_ui(self):
        # Frame principal
        main_frame = tk.Frame(self.root)
        main_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        # Canvas com barras de rolagem
        canvas_frame = tk.Frame(main_frame)
        canvas_frame.pack(side=tk.TOP, fill=tk.BOTH, expand=True)
        
        self.canvas = tk.Canvas(canvas_frame, bg="white")
        self.scroll_y = tk.Scrollbar(canvas_frame, orient="vertical", command=self.canvas.yview)
        self.scroll_x = tk.Scrollbar(canvas_frame, orient="horizontal", command=self.canvas.xview)
        
        self.canvas.configure(yscrollcommand=self.scroll_y.set, xscrollcommand=self.scroll_x.set)
        
        self.scroll_y.pack(side=tk.RIGHT, fill=tk.Y)
        self.scroll_x.pack(side=tk.BOTTOM, fill=tk.X)
        self.canvas.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        
        # Frame interno para os elementos
        self.inner_frame = tk.Frame(self.canvas)
        self.canvas.create_window((0, 0), window=self.inner_frame, anchor="nw")
        
        # Frame para os botões
        buttons_frame = tk.Frame(main_frame)
        buttons_frame.pack(side=tk.BOTTOM, fill=tk.X, pady=10)
        
        # Botões de classificação
        criteria = [
            "Metais Alcalinos", "Metais Alcalino-Terrosos", "Metais de Transição",
            "Lantanídeos", "Actinídeos", "Outros Metais", "Semimetais",
            "Não Metais", "Halogênios", "Gases Nobres",
            "Estado Sólido", "Estado Líquido", "Estado Gasoso",
            "Bloco s", "Bloco p", "Bloco d", "Bloco f",
            "Resetar Cores"
        ]
        
        # Criar botões em duas linhas
        for i, criterion in enumerate(criteria[:9]):
            btn = tk.Button(buttons_frame, text=criterion, 
                          command=lambda c=criterion: self.highlight_elements(c),
                          width=18)
            btn.grid(row=0, column=i, padx=2, pady=2)
            
        for i, criterion in enumerate(criteria[9:]):
            btn = tk.Button(buttons_frame, text=criterion, 
                          command=lambda c=criterion: self.highlight_elements(c),
                          width=18)
            btn.grid(row=1, column=i, padx=2, pady=2)
        
        # Configurar o canvas para scroll
        self.canvas.bind("<Configure>", lambda e: self.canvas.configure(
            scrollregion=self.canvas.bbox("all")))

    def draw_periodic_table(self):
        # Definir cores para diferentes categorias
        self.category_colors = {
            "Metais Alcalinos": "#FF6666",          # Vermelho claro
            "Metais Alcalino-Terrosos": "#FFDEAD",  # Amarelo claro
            "Metais de Transição": "#FFB6C1",       # Rosa claro
            "Lantanídeos": "#FFA07A",               # Salmão
            "Actinídeos": "#FF8C69",                # Salmão escuro
            "Outros Metais": "#CCCCCC",             # Cinza
            "Semimetais": "#99CC99",                # Verde claro
            "Não Metais": "#99CCFF",                # Azul claro
            "Halogênios": "#FFFF99",                # Amarelo
            "Gases Nobres": "#FF99CC",              # Rosa
            "Estado Sólido": "#6699FF",             # Azul
            "Estado Líquido": "#FF6666",            # Vermelho
            "Estado Gasoso": "#66FF66",             # Verde
            "Bloco s": "#FF9999",                   # Vermelho claro
            "Bloco p": "#99CCFF",                   # Azul claro
            "Bloco d": "#FFCC99",                   # Laranja claro
            "Bloco f": "#CC99FF"                    # Roxo
        }
        
        # Posicionar elementos na tabela periódica
        for _, row in self.df.iterrows():
            grupo = row["Família/Grupo"]
            periodo = row["Período"]
            simbolo = row["Símbolo"]
            numero = row["Número Atômico"]
            config_eletronica = row["Configuração Eletrônica"]
            
            # Determinar bloco
            if any(orbital in config_eletronica for orbital in ['f¹', 'f²', 'f³', 'f⁴', 'f⁵', 'f⁶', 'f⁷', 'f⁸', 'f⁹', 'f¹⁰', 'f¹¹', 'f¹²', 'f¹³', 'f¹⁴']):
                bloco = "f"
            elif any(orbital in config_eletronica for orbital in ['d¹', 'd²', 'd³', 'd⁴', 'd⁵', 'd⁶', 'd⁷', 'd⁸', 'd⁹', 'd¹⁰']):
                bloco = "d"
            elif any(orbital in config_eletronica for orbital in ['p¹', 'p²', 'p³', 'p⁴', 'p⁵', 'p⁶']):
                bloco = "p"
            else:
                bloco = "s"
            
            # Ajustar posição para lantanídeos e actinídeos
            if periodo == 6 and 57 <= numero <= 71:  # Lantanídeos
                pos_x = numero - 57 + 3
                pos_y = 9
            elif periodo == 7 and 89 <= numero <= 103:  # Actinídeos
                pos_x = numero - 89 + 3
                pos_y = 10
            else:
                pos_x = grupo
                pos_y = periodo
            
            # Criar retângulo do elemento
            rect = tk.Canvas(self.inner_frame, width=50, height=50, bg="#CCCCCC", 
                            highlightthickness=1, highlightbackground="black")
            rect.grid(row=pos_y, column=pos_x, padx=1, pady=1)
            
            # Adicionar símbolo e número atômico
            symbol = tk.Label(rect, text=simbolo, bg="#CCCCCC", font=("Arial", 12, "bold"))
            symbol.place(relx=0.5, rely=0.3, anchor="center")
            
            number = tk.Label(rect, text=str(numero), bg="#CCCCCC", font=("Arial", 8))
            number.place(relx=0.5, rely=0.7, anchor="center")
            
            # Armazenar referências para os elementos
            self.element_rectangles[numero] = rect
            self.element_symbols[numero] = symbol
            self.element_numbers[numero] = number

    def highlight_elements(self, criterion):
        # Resetar todas as cores para cinza
        for num in self.element_rectangles:
            self.element_rectangles[num].configure(bg="#CCCCCC")
            self.element_symbols[num].configure(bg="#CCCCCC")
            self.element_numbers[num].configure(bg="#CCCCCC")
        
        if criterion == "Resetar Cores":
            return
        
        color = self.category_colors.get(criterion, "#CCCCCC")
        
        # Definir quais elementos destacar baseado no critério
        elements_to_highlight = []
        
        if criterion == "Metais Alcalinos":
            elements_to_highlight = self.df[self.df["Família/Grupo"] == 1]["Número Atômico"]
        elif criterion == "Metais Alcalino-Terrosos":
            elements_to_highlight = self.df[self.df["Família/Grupo"] == 2]["Número Atômico"]
        elif criterion == "Metais de Transição":
            elements_to_highlight = self.df[
                (self.df["Família/Grupo"] >= 3) & 
                (self.df["Família/Grupo"] <= 12)]["Número Atômico"]
        elif criterion == "Lantanídeos":
            elements_to_highlight = self.df[
                (self.df["Número Atômico"] >= 57) & 
                (self.df["Número Atômico"] <= 71)]["Número Atômico"]
        elif criterion == "Actinídeos":
            elements_to_highlight = self.df[
                (self.df["Número Atômico"] >= 89) & 
                (self.df["Número Atômico"] <= 103)]["Número Atômico"]
        elif criterion == "Outros Metais":
            elements_to_highlight = self.df[
                (self.df["Família/Grupo"] >= 13) & 
                (self.df["Família/Grupo"] <= 16) & 
                ~(self.df["Símbolo"].isin(["B", "Si", "Ge", "As", "Sb", "Te", "Po"]))]["Número Atômico"]
        elif criterion == "Semimetais":
            elements_to_highlight = self.df[
                self.df["Símbolo"].isin(["B", "Si", "Ge", "As", "Sb", "Te", "Po"])]["Número Atômico"]
        elif criterion == "Não Metais":
            elements_to_highlight = self.df[
                self.df["Símbolo"].isin(["H", "C", "N", "P", "O", "S", "Se"])]["Número Atômico"]
        elif criterion == "Halogênios":
            elements_to_highlight = self.df[self.df["Família/Grupo"] == 17]["Número Atômico"]
        elif criterion == "Gases Nobres":
            elements_to_highlight = self.df[self.df["Família/Grupo"] == 18]["Número Atômico"]
        elif criterion == "Estado Sólido":
            elements_to_highlight = self.df[self.df["Estado Físico (CNTP)"] == "Sólido"]["Número Atômico"]
        elif criterion == "Estado Líquido":
            elements_to_highlight = self.df[self.df["Estado Físico (CNTP)"] == "Líquido"]["Número Atômico"]
        elif criterion == "Estado Gasoso":
            elements_to_highlight = self.df[self.df["Estado Físico (CNTP)"] == "Gasoso"]["Número Atômico"]
        elif criterion == "Bloco s":
            elements_to_highlight = self.df[
                (self.df["Família/Grupo"] == 1) | 
                (self.df["Família/Grupo"] == 2) |
                (self.df["Símbolo"] == "H") | 
                (self.df["Símbolo"] == "He")]["Número Atômico"]
        elif criterion == "Bloco p":
            elements_to_highlight = self.df[
                (self.df["Família/Grupo"] >= 13) & 
                (self.df["Família/Grupo"] <= 18) & 
                ~(self.df["Símbolo"].isin(["He"]))]["Número Atômico"]
        elif criterion == "Bloco d":
            elements_to_highlight = self.df[
                (self.df["Família/Grupo"] >= 3) & 
                (self.df["Família/Grupo"] <= 12)]["Número Atômico"]
        elif criterion == "Bloco f":
            elements_to_highlight = self.df[
                ((self.df["Número Atômico"] >= 57) & 
                (self.df["Número Atômico"] <= 71)) |
                ((self.df["Número Atômico"] >= 89) & 
                (self.df["Número Atômico"] <= 103))]["Número Atômico"]
        
        # Aplicar a cor aos elementos selecionados
        for num in elements_to_highlight:
            if num in self.element_rectangles:  # Verificar se o elemento existe
                self.element_rectangles[num].configure(bg=color)
                self.element_symbols[num].configure(bg=color)
                self.element_numbers[num].configure(bg=color)

if __name__ == "__main__":
    root = tk.Tk()
    app = PeriodicTableApp(root)
    root.mainloop()
