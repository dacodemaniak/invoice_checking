# Historique des versions

## 1.1.0 — 29/10/2026

- Mise à jour pour **Angular 22.2** (CLI 22.2.5, Angular core 22.2.3).
- Nouveaux défauts pris en compte : **OnPush** et **zoneless** pour les nouveaux projets, **Fetch** pour `HttpClient`.
- `ng generate service` génère désormais un service `@Service()` ; `@Injectable({providedIn:'root'})` reste disponible via `--injectable`.
- `HttpClient` est fourni par défaut depuis la v21 : `provideHttpClient()` ne sert plus qu'à configurer des fonctionnalités (intercepteurs, XSRF…).
- Signal Forms et `resource()` / `httpResource()` sont stables : mentionnés comme alternatives modernes, sans remplacer les TP Reactive Forms.
- Prérequis mis à jour : Node 22+ et TypeScript 6.
- Correction des liens de `INDEX.md` (casse des noms de fichiers, chemins `../backend/`).
- Ajout du support de formation apprenant `Formation-Angular-22_Support-Apprenant.pptx` (62 slides, notes formateur, corrigés).

## 1.0.0 — 15/10/2026

- Version initiale des fiches de formation : `INDEX.md`, `JOUR-1.md`, `JOUR-2.md`, `JOUR-3.md`.
- Projet fil rouge « Rapprochement de INVOICE » : Angular standalone, signals, control-flow, Reactive Forms, Vitest, json-server 0.17.4.
