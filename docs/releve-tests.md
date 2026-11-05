# Relevé des tests

> Écrivez le résultat attendu avant d'essayer. Un écart n'est pas une faute : notez-le, corrigez, refaites le test.

**Calculs à la main** :
| Action |Résultat Attendu |
| --- | -----------|
|Nombre d'operations|10 |
| Totale des dépenses |40.000 fcfa| 
| Dépenses de P1 |15.500 fcfa | 
| Dépenses de P2 |9.500 fcfa| 
| Dépenses de P3 |15.000 fcfa | 
|Dépense minimale |1.500 fcfa |
|Dépense minimale|8.000 fcfa|

**Essais dans le menu** : un ajout valide (encore là après redémarrage), chaque règle refusée, une recherche introuvable, chaque tri, la synthèse, un choix inconnu.

| Action | Attendu | Obtenu | Testeur |
| --- | --- | --- | --- |
| un ajout valide |conforme |conforme |Ruth Tomede |
| chaque règle refusée |conforme | conforme| Ruth Tomede|
| une recherche |conforme |conforme| Ruth Tomede|
| chaque tri |conforme | conforme| Ruth Tomede|
| la synthèse |conforme |conforme |Ruth Tomede |
| suppression|conforme|Pas trop | Ruth Tomede|

**Sur un autre poste** (`git clone`, `node app.js`, `npm test`, en suivant le README) : 
npm test = 39 tests fonctionnent;
node app.js = Ok;
Ruth Tomede

