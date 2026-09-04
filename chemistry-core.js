(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.ChemistryCore = api;
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  const orbitals = [['1s', 2], ['2s', 2], ['2p', 6], ['3s', 2], ['3p', 6], ['4s', 2]];
  const elements = [
    ['H','Hidrogênio',1,1,1,'não metal',1], ['He','Hélio',2,18,1,'gás nobre',0],
    ['Li','Lítio',3,1,2,'metal alcalino',1], ['Be','Berílio',4,2,2,'metal alcalino-terroso',2],
    ['B','Boro',5,13,2,'metaloide',null], ['C','Carbono',6,14,2,'não metal',null],
    ['N','Nitrogênio',7,15,2,'não metal',-3], ['O','Oxigênio',8,16,2,'não metal',-2],
    ['F','Flúor',9,17,2,'halogênio',-1], ['Ne','Neônio',10,18,2,'gás nobre',0],
    ['Na','Sódio',11,1,3,'metal alcalino',1], ['Mg','Magnésio',12,2,3,'metal alcalino-terroso',2],
    ['Al','Alumínio',13,13,3,'metal',3], ['Si','Silício',14,14,3,'metaloide',null],
    ['P','Fósforo',15,15,3,'não metal',-3], ['S','Enxofre',16,16,3,'não metal',-2],
    ['Cl','Cloro',17,17,3,'halogênio',-1], ['Ar','Argônio',18,18,3,'gás nobre',0],
    ['K','Potássio',19,1,4,'metal alcalino',1], ['Ca','Cálcio',20,2,4,'metal alcalino-terroso',2]
  ].map(([symbol,name,atomicNumber,group,period,category,commonIon]) => ({symbol,name,atomicNumber,group,period,category,commonIon}));
  function electronCount(atomicNumber, ionicCharge) {
    const count = atomicNumber - ionicCharge;
    if (!Number.isInteger(count) || count < 0 || count > 20) throw new RangeError('Quantidade de elétrons fora do modelo (0–20).');
    return count;
  }
  function toSuperscript(value) { return String(value).replace(/[0-9+-]/g, digit => '⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻'['0123456789+-'.indexOf(digit)]); }
  function electronConfiguration(count) {
    let remaining = count; const filled = [];
    for (const [orbital, capacity] of orbitals) { if (!remaining) break; const occupied = Math.min(capacity, remaining); filled.push(`${orbital}${toSuperscript(occupied)}`); remaining -= occupied; }
    return filled.join(' ');
  }
  function ionLabel(element, charge) {
    if (charge === 0) return `${element.symbol} (átomo neutro)`;
    const magnitude = Math.abs(charge) === 1 ? '' : Math.abs(charge);
    return `${element.symbol}${toSuperscript(`${magnitude}${charge > 0 ? '+' : '-'}`)}`;
  }
  return {elements, electronCount, electronConfiguration, ionLabel};
}));
