// Régénère db.json (déterministe grâce à la graine). Usage : npm run db:gen
import { faker } from '@faker-js/faker/locale/fr';
import { writeFileSync } from 'node:fs';
faker.seed(42);
const TODAY = new Date('2026-10-15');
const iso = (d) => d.toISOString().slice(0, 10);
const suppliers = Array.from({ length: 15 }, (_, i) => ({ id: i + 1, nom: faker.company.name(), iban: faker.finance.iban({ formatted: true, countryCode: 'FR' }) }));
const factures = [], paiements = [];
for (let i = 1; i <= 200; i++) {
  const f = faker.helpers.arrayElement(suppliers);
  const ht = faker.number.float({ min: 50, max: 5000, fractionDigits: 2 });
  const tva = faker.helpers.arrayElement([5.5, 10, 20]);
  const ttc = +(ht * (1 + tva / 100)).toFixed(2);
  const em = new Date(TODAY.getTime() - faker.number.int({ min: 1, max: 120 }) * 86400000);
  const ech = new Date(em.getTime() + 30 * 86400000);
  const r = faker.number.float({ min: 0, max: 1 });
  let statut = 'a_rapprocher', paymentId = null;
  if (r < 0.4) {
    statut = 'rapprochee'; paymentId = paiements.length + 1;
    paiements.push({ id: paymentId, date: iso(ech), amount: ttc, libelle: `VIR ${f.nom.toUpperCase()} FA-2026-${String(i).padStart(4, '0')}`, iban: f.iban, factureId: i });
  } else if (r < 0.45) statut = 'litige';
  factures.push({ id: i, numero: `FA-2026-${String(i).padStart(4, '0')}`, fournisseurId: f.id, dateEmission: iso(em), dateEcheance: iso(ech), taxFreeAmount: ht, tva, amountTTC: ttc, statut, paymentId });
}
const aRapprocher = factures.filter((x) => x.statut === 'a_rapprocher');
for (const x of faker.helpers.arrayElements(aRapprocher, 40)) {
  const delta = faker.helpers.arrayElement([0, 0, 0, 0, 0.01, -0.02]);
  const f = suppliers[x.fournisseurId - 1];
  paiements.push({ id: paiements.length + 1, date: x.dateEcheance, amount: +(x.amountTTC + delta).toFixed(2), libelle: faker.datatype.boolean(0.7) ? `VIR ${x.numero}` : `PRLV ${f.nom.toUpperCase()}`, iban: f.iban, factureId: null });
}
for (let k = 0; k < 10; k++) {
  paiements.push({ id: paiements.length + 1, date: iso(new Date(TODAY.getTime() - faker.number.int({ min: 1, max: 60 }) * 86400000)), amount: faker.number.float({ min: 20, max: 3000, fractionDigits: 2 }), libelle: 'VIR DIVERS', iban: faker.finance.iban({ formatted: true, countryCode: 'FR' }), factureId: null });
}
writeFileSync('db.json', JSON.stringify({ suppliers, factures, paiements }, null, 2));
console.log(`${factures.length} factures, ${paiements.length} paiements`);
