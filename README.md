# Registre des opérations maraîchères

> Projet individuel du SAS DFS, brief 1 (sujet : [SUJET.md](SUJET.md)). Remplacez chaque ✏️ par votre texte, puis supprimez cette ligne.

## Contexte

Nous voulons faire un application en ligne de commande développée avec JavaScript et Node.js pour enregistrer les opérations maraîchèrs.
Elle sera destinée aux maraîchers qui souhaiteront suivre les activités réalisées sur leurs parcelles. L'utilisateur sera en mesure d'enregistrer et de consulter,d'effectuer les recherche et de les trier les données.
L'application permettra également de calculer le total des dépenses et de les regrouper par parcelle.
Les coûts enregistrés correspondent aux dépenses engagées par les activités maraîchères. La rentabilité ne pourra pas calculé, car les revenus ne seront pas enregistrés. 


## Prérequis et lancement

- Node.js 20 ou plus récent, Git ; aucune bibliothèque à installer.

```bash
git clone https://github.com/VOTRE-COMPTE/brief-1-registre-maraicher.git
cd brief-1-registre-maraicher
node app.js
npm test
```

Sous PowerShell, si `npm` est bloqué : `npm.cmd test`.

## Fonctionnalités

✏️ *Cochez seulement ce qui marche : `- [x]`.*

- [x] Données lues et enregistrées dans `donnees/operations.json`
- [x] Ajouter une opération, saisies invalides refusées sans arrêter le programme
- [x] Lister les opérations, message si le registre est vide
- [x] Rechercher par identifiant ou par parcelle ; filtrer par culture
- [x] Trier par coût ou par date
- [x] Synthèse : total, nombre et total par parcelle, coût minimum et maximum
- [x] Bonus : supprimer et modifier une opération (choix 6 et 7)
- [x] Bonus : tri par coût décroissant, parcelle la plus coûteuse

## Données

fichier: operations.json
contenu: 10 opérations
coût total:40.000 fcfa
champ: id, date, parcelle, culture, operation, coutFCFA.
## Limites

1. **Pas de revenus :** le registre enregistre des dépenses, pas les revenus. Il ne mesure donc pas la rentabilité (revenus − coûts).
2. **Pas de quantité récoltée ni de surface :** sans ces données, on ne peut pas calculer le rendement, ni comparer le coût de deux parcelles de tailles différentes.
3. **Un seul fichier JSON, en local :** les données sont enregistrées dans `donnees/operations.json`. Il n'y a pas de base de données, pas de sauvegarde automatique, et deux personnes ne peuvent pas utiliser le registre en même temps.
4. **Interface en terminal uniquement :** on utilise le programme avec un menu et du texte. Il n'y a ni écran graphique, ni application mobile pour un maraîcher sur le terrain.
5. **Données fictives et recherche exacte :** les données de départ sont pédagogiques, pas celles d'une vraie exploitation. La recherche ne trouve que des valeurs exactes (identifiant, parcelle, culture), sans recherche approximative.
## Documents

[Dictionnaire des données](docs/dictionnaire-donnees.md) · [Tâches](docs/taches.md) · [Relevé des tests](docs/releve-tests.md) · [Journal de recherche](docs/journal-recherche.md) · [Fiche agronomique](docs/fiche-agronomique.md) · [Fiche individuelle](docs/fiche-individuelle.md)

## Auteur

✏️ *TIEMOKO Koffi N'sieny Marie Carmelle, 
compte GitHub:koffinsienymariecarmelletiemok-dot 
Entraide : 
-LIADE ENOC MARC = sur la comprehension de certaine fonction
-Dadie Jean Marie = pour les debogages
et d'autres etudiants du même projet que moi.

