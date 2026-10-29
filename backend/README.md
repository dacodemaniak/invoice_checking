# Backend json-server — Rapprochement de facture

**Version 1.0.0** (15/10/2026) · json-server 0.17.4

## Démarrage rapide
```bash
cd backend
npm install
npm run api        # http://localhost:3000
```
`db.json` est fourni (15 fournisseurs, 200 factures, 90 paiements). Pour repartir d'un jeu neuf : `npm run db:gen` (graine fixe : résultat reproductible).

## Collections
| Route | Contenu |
|---|---|
| `/suppliers` | id, name, iban |
| `/invoices` | id, numero, supplierId, emissionDate, dueDate, taxFreeAmount, vat, fullAmount, status (`a_rapprocher` / `rapprochee` / `litige`), paymentId |
| `/payments` | id, date, amount, label, iban, invoiceId (null si non rapproché) |

## Requêtes utiles
- `/invoices?status=litige`
- `/invoices?_sort=dueDate&_order=asc&_page=1&_limit=20` (total dans l'en-tête `X-Total-Count`)
- `/invoices?q=FA-2026-00` (recherche plein texte)
- `/invoices?_expand=supplier`
- `/payments?invoiceId=null` (si besoin, filtrer côté client : `null` n'est pas filtrable en 0.17)
- `/invoices?fullAmount_gte=100&fullAmount_lte=500`

## Données prévues pour le rapprochement
- ≈ 40 % de factures déjà rapprochées (paiement lié), ≈ 5 % en litige, le reste à rapprocher.
- 40 paiements « orphelins » correspondant à des factures à rapprocher, dont certains avec 0,01 € ou −0,02 € d'écart, et des libellés `VIR FA-…` ou `PRLV …`.
- 10 paiements « DIVERS » sans facture (bruit).
