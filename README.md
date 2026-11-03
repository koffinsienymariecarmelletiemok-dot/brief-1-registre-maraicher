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
- [ ] Ajouter une opération, saisies invalides refusées sans arrêter le programme
- [ ] Lister les opérations, message si le registre est vide
- [ ] Rechercher par identifiant ou par parcelle ; filtrer par culture
- [ ] Trier par coût ou par date
- [ ] Synthèse : total, nombre et total par parcelle, coût minimum et maximum
- [ ] Bonus : supprimer et modifier une opération (choix 6 et 7)
- [ ] Bonus : tri par coût décroissant, parcelle la plus coûteuse

## Données

✏️ *Le fichier, le nombre d'opérations, les champs (voir [docs/dictionnaire-donnees.md](docs/dictionnaire-donnees.md)), les unités. Rappelez qu'elles sont fictives.*

## Limites

✏️ *Au moins trois. Par exemple : le registre enregistre des dépenses, pas les revenus, il ne mesure donc pas la rentabilité.*

## Documents

[Dictionnaire des données](docs/dictionnaire-donnees.md) · [Tâches](docs/taches.md) · [Relevé des tests](docs/releve-tests.md) · [Journal de recherche](docs/journal-recherche.md) · [Fiche agronomique](docs/fiche-agronomique.md) · [Fiche individuelle](docs/fiche-individuelle.md)

## Auteur

✏️ *Prénom NOM, compte GitHub. Entraide : avec qui, sur quoi.*
