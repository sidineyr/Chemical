const assert = require('node:assert/strict');
const {elements, electronCount, electronConfiguration, ionLabel} = require('../chemistry-core.js');
const bySymbol = symbol => elements.find(element => element.symbol === symbol);

assert.equal(elements.length, 20);
assert.equal(electronCount(11, 1), 10, 'Na+ deve ter 10 elétrons');
assert.equal(electronCount(12, 2), 10, 'Mg2+ deve ter 10 elétrons');
assert.equal(electronCount(17, -1), 18, 'Cl- deve ter 18 elétrons');
assert.equal(electronCount(8, -2), 10, 'O2- deve ter 10 elétrons');
assert.equal(electronConfiguration(10), '1s² 2s² 2p⁶');
assert.equal(electronConfiguration(20), '1s² 2s² 2p⁶ 3s² 3p⁶ 4s²');
assert.equal(ionLabel(bySymbol('Mg'), 2), 'Mg²⁺');
assert.throws(() => electronCount(1, 2), RangeError);
console.log('chemistry-core: 8 verificações aprovadas');
