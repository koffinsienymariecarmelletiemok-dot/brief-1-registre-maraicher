// Registre des opérations maraîchères — point d'entrée : le menu.
// À vous d'écrire tout le menu : accueil, chargement des données, menu affiché avant chaque choix,
// actions, sortie et gestion des erreurs. Comportement et textes imposés : fiches/3-ajouter-lister.md.
// Lancer : node app.js
import { demander, fermerSaisie, ouvrirSaisie } from './src/saisie.js';
import { chargerJson, enregistrerJson } from './src/stockage.js';
import { OPERATIONS, ajouterOperation, formaterOperation, listerOperations, trouverParId } from './src/registre.js';
import { filtrerParCulture, filtrerParParcelle, trierParCout, trierParDate } from './src/recherche.js';
import { coutMinMax, syntheseParParcelle, totalCouts } from './src/synthese.js';

const FICHIER_DONNEES = 'donnees/operations.json';
function accueil(){
  console.log("========================================");
  console.log(" REGISTRE DES OPERATIONS MARAICHERES");
  console.log(" Exploitation maraichère pédagogique");
  console.log("========================================");

}

function afficherMenu(){
  console.log('');
  console.log("--------------- MENU -----------------");
  console.log("1. Ajouter une opération");
  console.log("2. Afficher la liste des opérations");
  console.log("0. Quitter");
  
}

async function ajouter(operations) {
  console.log('--- Ajouter une Opération ---')
  const champs = {
    id: 'Identidiant (ex. O01) : ',
    date:'Date ( AAAA-MM-JJ ) : ',
    parcelle: 'Parcelle (ex. P1) : ',
    culture: 'Culture (ex. tomate) :  ',
    operation: `Opération (${OPERATIONS.join(', ')}): `,
    coutFCFA: 'Coût en FCFA : ',
  };


  const saisie = {};
  for(const cle in champs){
    const reponse = await demander(champs[cle]);
      if(reponse=== null){
      return;
      }
    saisie[cle] = reponse;

  }
  saisie.id = saisie.id.toUpperCase();
  saisie.parcelle = saisie.parcelle.toUpperCase();
  saisie.culture = saisie.culture.toLowerCase();
  saisie.operation = saisie.operation.toLowerCase();

  const erreurs = ajouterOperation(operations , saisie);
  if(erreurs.length === 0){
    await enregistrerJson(FICHIER_DONNEES , operations);
    console.log(`Opération ${saisie.id} ajoutée . Le registre compte ${operations.length} opérations.`)
  }else{
    console.log('Opération refusée :');
    for (const erreur of erreurs)
      console.log(`  - ${erreur}`);
  }
  console.log(`le registre compte toujours ${operations.length} opération. `);
}


function lister(operations){
  console.log(`--- liste des Opérations (${operations.length}) ---`);
  console.log(listerOperations(operations));

}


async function main() {
  ouvrirSaisie();
  accueil();
  let operations =[];
  try{
    operations = await chargerJson(FICHIER_DONNEES);
    console.log(`${operations.length} l'opérations sont chargée depuis ${FICHIER_DONNEES}.`);
  }
  catch(erreur){
    console.log(`Impossible de lire ${FICHIER_DONNEES} : ${erreur.message}. Le registre démarre vide.`);
    operations =[];
  }
  let continuer = true ;
  while(continuer){
   afficherMenu();
    const choix= await demander("votre choix :");
    if(choix=== null){
      continuer = false; 
    }
    else{
      try{
        switch(choix){
          case '1':
            await ajouter(operations);
          break;
          case '2':
           lister(operations);
          break;
          case '0':
            console.log(" Au revoir !");
            continuer = false ;
          break;
          default:
            console.log(`choix inconnu : "${choix}". Tapez un chiffre du menu.`);
        }
      }
        catch(erreur){
          if(erreur.message.startsWith("TODO")){
            console.log(`À compléter : ${erreur.message}`);
          }else{
            console.log(`Erreur inattendue : ${erreur.message}`);
          }
        }
    }
  }
  


  











  fermerSaisie();
}

main();
