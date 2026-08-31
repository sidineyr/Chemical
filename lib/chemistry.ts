export type ElementDatum = {
  atomicNumber: number;
  symbol: string;
  name: string;
  mass: number;
  usualValence: number;
  family: string;
  period: number;
  group: number;
};

export const elements: ElementDatum[] = [
  { atomicNumber: 1, symbol: "H", name: "Hidrogênio", mass: 1.008, usualValence: 1, family: "não metal", period: 1, group: 1 },
  { atomicNumber: 2, symbol: "He", name: "Hélio", mass: 4.0026, usualValence: 0, family: "gás nobre", period: 1, group: 18 },
  { atomicNumber: 3, symbol: "Li", name: "Lítio", mass: 6.94, usualValence: 1, family: "metal alcalino", period: 2, group: 1 },
  { atomicNumber: 4, symbol: "Be", name: "Berílio", mass: 9.0122, usualValence: 2, family: "alcalino-terroso", period: 2, group: 2 },
  { atomicNumber: 5, symbol: "B", name: "Boro", mass: 10.81, usualValence: 3, family: "metaloide", period: 2, group: 13 },
  { atomicNumber: 6, symbol: "C", name: "Carbono", mass: 12.011, usualValence: 4, family: "não metal", period: 2, group: 14 },
  { atomicNumber: 7, symbol: "N", name: "Nitrogênio", mass: 14.007, usualValence: 3, family: "não metal", period: 2, group: 15 },
  { atomicNumber: 8, symbol: "O", name: "Oxigênio", mass: 15.999, usualValence: 2, family: "não metal", period: 2, group: 16 },
  { atomicNumber: 9, symbol: "F", name: "Flúor", mass: 18.998, usualValence: 1, family: "halogênio", period: 2, group: 17 },
  { atomicNumber: 10, symbol: "Ne", name: "Neônio", mass: 20.18, usualValence: 0, family: "gás nobre", period: 2, group: 18 },
  { atomicNumber: 11, symbol: "Na", name: "Sódio", mass: 22.99, usualValence: 1, family: "metal alcalino", period: 3, group: 1 },
  { atomicNumber: 12, symbol: "Mg", name: "Magnésio", mass: 24.305, usualValence: 2, family: "alcalino-terroso", period: 3, group: 2 },
  { atomicNumber: 13, symbol: "Al", name: "Alumínio", mass: 26.982, usualValence: 3, family: "metal", period: 3, group: 13 },
  { atomicNumber: 14, symbol: "Si", name: "Silício", mass: 28.085, usualValence: 4, family: "metaloide", period: 3, group: 14 },
  { atomicNumber: 15, symbol: "P", name: "Fósforo", mass: 30.974, usualValence: 3, family: "não metal", period: 3, group: 15 },
  { atomicNumber: 16, symbol: "S", name: "Enxofre", mass: 32.06, usualValence: 2, family: "não metal", period: 3, group: 16 },
  { atomicNumber: 17, symbol: "Cl", name: "Cloro", mass: 35.45, usualValence: 1, family: "halogênio", period: 3, group: 17 },
  { atomicNumber: 18, symbol: "Ar", name: "Argônio", mass: 39.948, usualValence: 0, family: "gás nobre", period: 3, group: 18 },
];

export const builderElements = elements.filter((element) =>
  ["H", "C", "N", "O", "F", "P", "S", "Cl"].includes(element.symbol),
);

export type MoleculeAtom = {
  id: number;
  symbol: string;
};

export type MoleculeBond = {
  a: number;
  b: number;
  order: 1 | 2 | 3;
};

export type MoleculeExample = {
  name: string;
  atoms: MoleculeAtom[];
  bonds: MoleculeBond[];
};

export const moleculeExamples: MoleculeExample[] = [
  {
    name: "Água",
    atoms: [
      { id: 1, symbol: "O" },
      { id: 2, symbol: "H" },
      { id: 3, symbol: "H" },
    ],
    bonds: [
      { a: 1, b: 2, order: 1 },
      { a: 1, b: 3, order: 1 },
    ],
  },
  {
    name: "Dióxido de carbono",
    atoms: [
      { id: 1, symbol: "C" },
      { id: 2, symbol: "O" },
      { id: 3, symbol: "O" },
    ],
    bonds: [
      { a: 1, b: 2, order: 2 },
      { a: 1, b: 3, order: 2 },
    ],
  },
  {
    name: "Metano",
    atoms: [
      { id: 1, symbol: "C" },
      { id: 2, symbol: "H" },
      { id: 3, symbol: "H" },
      { id: 4, symbol: "H" },
      { id: 5, symbol: "H" },
    ],
    bonds: [
      { a: 1, b: 2, order: 1 },
      { a: 1, b: 3, order: 1 },
      { a: 1, b: 4, order: 1 },
      { a: 1, b: 5, order: 1 },
    ],
  },
  {
    name: "Etanol",
    atoms: [
      { id: 1, symbol: "C" },
      { id: 2, symbol: "C" },
      { id: 3, symbol: "O" },
      { id: 4, symbol: "H" },
      { id: 5, symbol: "H" },
      { id: 6, symbol: "H" },
      { id: 7, symbol: "H" },
      { id: 8, symbol: "H" },
      { id: 9, symbol: "H" },
    ],
    bonds: [
      { a: 1, b: 2, order: 1 },
      { a: 2, b: 3, order: 1 },
      { a: 1, b: 4, order: 1 },
      { a: 1, b: 5, order: 1 },
      { a: 1, b: 6, order: 1 },
      { a: 2, b: 7, order: 1 },
      { a: 2, b: 8, order: 1 },
      { a: 3, b: 9, order: 1 },
    ],
  },
];

export function molecularFormula(atoms: MoleculeAtom[]) {
  const counts = atoms.reduce<Record<string, number>>((acc, atom) => {
    acc[atom.symbol] = (acc[atom.symbol] ?? 0) + 1;
    return acc;
  }, {});

  const symbols = Object.keys(counts).sort((a, b) => {
    if (counts.C) {
      if (a === "C") return -1;
      if (b === "C") return 1;
      if (a === "H") return -1;
      if (b === "H") return 1;
    }
    return a.localeCompare(b);
  });

  return symbols
    .map((symbol) => `${symbol}${counts[symbol] === 1 ? "" : counts[symbol]}`)
    .join("");
}

export function approximateMolarMass(atoms: MoleculeAtom[]) {
  return atoms.reduce((total, atom) => {
    const element = elements.find((item) => item.symbol === atom.symbol);
    return total + (element?.mass ?? 0);
  }, 0);
}

export function valenceReport(atoms: MoleculeAtom[], bonds: MoleculeBond[]) {
  return atoms.map((atom) => {
    const element = elements.find((item) => item.symbol === atom.symbol);
    const bondOrder = bonds
      .filter((bond) => bond.a === atom.id || bond.b === atom.id)
      .reduce((sum, bond) => sum + bond.order, 0);
    const usual = element?.usualValence ?? 0;
    return {
      id: atom.id,
      symbol: atom.symbol,
      bondOrder,
      usual,
      state: bondOrder > usual ? "exceeded" : bondOrder === usual ? "complete" : "open",
    } as const;
  });
}

export const atomColors: Record<string, string> = {
  H: "#f7f9fb",
  C: "#394653",
  N: "#5b8cff",
  O: "#ef6a63",
  F: "#82d96b",
  P: "#f2a65a",
  S: "#f2c14e",
  Cl: "#63d6c4",
};
