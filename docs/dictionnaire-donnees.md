# Dictionnaire des données

> Un champ par ligne, d'après `SUJET.md` et le fichier de `donnees/`. La première ligne sert de modèle.

| Champ | Signification | Type | Règle de validation | Unité | Exemple |
| --- | --- | --- | --- | --- | --- |
| `id` | Identifiant unique | texte | non vide, absent des données | — | o01|
|date |Date à laquel l'opération a été réalisée|date| Date  valide au format AAAA-MM-jj| — |2026-10-20|
| parcelle |identifiant de la parcelle|texte|non vide |  — |P4|
| culture |culture concernée|texte|non vide | tomate|
| operation|activité réalisée sur la parcelle|texte |non vide et les opération autorisées| —| arrosage|
|coutFCFA|Dépense pour la réalisation de l'opération|entier | sans decimale | fcfa | 2000 |


**Listes de valeurs autorisées** : 
- Opérations:
.semis,
.désherbage,
.repiquage,
.récolte

- Cultures :
.Gombo,
.Aubergine,
.Tomate

- Parcelles :
.P1,
.P2,
.P3


**Sources** : 
- Sujet de l'examen: SUJET.md
- Données initiales: 
. donnees-json.md,
. operations.json