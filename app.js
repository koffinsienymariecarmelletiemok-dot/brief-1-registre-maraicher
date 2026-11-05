// Registre des opérations maraîchères — point d'entrée : le menu.
// À vous d'écrire tout le menu : accueil, chargement des données, menu affiché avant chaque choix,
// actions, sortie et gestion des erreurs. Comportement et textes imposés : fiches/3-ajouter-lister.md.
// Lancer : node app.js
import { demander, fermerSaisie, ouvrirSaisie } from './src/saisie.js';
import { chargerJson, enregistrerJson } from './src/stockage.js';
import { OPERATIONS, ajouterOperation, formaterOperation, listerOperations, trouverParId } from './src/registre.js';
import { filtrerParCulture, filtrerParParcelle, trierParCout, trierParDate } from './src/recherche.js';
import { coutMinMax, syntheseParParcelle, totalCouts } from './src/synthese.js';
import { supprimerOperation, modifierOperation, trierParCoutDecroissant } from './src/bonus.js';
const FICHIER_DONNEES = 'donnees/operations.json';
function accueil(){
  console.log("========================================");
  console.log(" REGISTRE DES OPÉRATIONS MARAICHÈRES");
  console.log(" Exploitation maraichère pédagogique");
  console.log("========================================");

}

function afficherMenu(){
  console.log('');
  console.log("--------------- MENU -----------------");
  console.log("1. Ajouter une opération");
  console.log("2. Afficher la liste des opérations");
  console.log("3. Rechercher (identifiant, parcelle, culture)");
  console.log("4. Trier (coût, date)");
  console.log("5. Synthèse des dépenses ");
  console.log("6. Supprimer une opération ");
  console.log("7. Modifier une opération");
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
    for (const erreur of erreurs){
      console.log(`  - ${erreur}`);
    }
  }
  console.log(`le registre compte toujours ${operations.length} opération. `);
}

function lister(operations){
  console.log(`--- liste des Opérations (${operations.length}) ---`);
  console.log(listerOperations(operations));

}

async function rechercher(operations){
    
  console.log('--- Rechercher ---');
  console.log("1. Par identifiant" );
  console.log("2. Par parcelle ");
  console.log("3. Les opérations d'une culture ");
  const sousChoix = await demander('Votre choix : ');
  if(sousChoix === null){
  return;
  }

  switch(sousChoix){
	case '1': {
    const id = await demander('Identifiant : ');
    const operation = trouverParId(operations, id.toUpperCase());
    if(operation !== undefined){
      console.log(formaterOperation(operation));
    } else{
      console.log(`Opération ${id.toUpperCase()} introuvable.`);	
	  }
     break;
  }
	
	case '2': {
	const parcelle = await demander('Parcelle : ');
	const liste = filtrerParParcelle(operations, parcelle.toUpperCase());
	console.log(`${liste.length} operations dans la classe  ${parcelle.toUpperCase()} :`);
	console.log(listerOperations(liste));
	break;
	}

	case '3': {
	const culture = await demander('Culture : ');
	const liste = filtrerParCulture(operations, culture.toLowerCase());
	console.log(`${liste.length} operations dans la classe  ${culture.toLowerCase()}`);
	console.log(listerOperations(liste));
	break;
	}
	default:
	console.log('Choix inconnu : retour au menu.');

 }
}

async function trier(operations){
  console.log('--- Trier ---');
  console.log("1. Par coût croissant" );
  console.log("2. Par date, de la plus ancienne à la plus récente ");
  const sousChoix = await demander('Votre choix : ');
  if(sousChoix === null){
  return;
  }
 switch(sousChoix){
    case '1': 
    console.log(listerOperations(trierParCout(operations)));
    break;
    case '2': 
    console.log(listerOperations(trierParDate(operations)));
    break;
    default:
      console.log('Choix inconnu : retour au menu.');
  }
}

function synthese(operations) {
  console.log('--- Synthèse des dépenses enregistrées ---');
  console.log(`Nombre d'opérations : ${operations.length}` );
  console.log(`Total des coûts : ${totalCouts(operations)} FCFA`);
  console.log('Par parcelle :');
  const bilan = syntheseParParcelle(operations);
  for(const parcelle in bilan ){
    console.log(`  ${parcelle} : ${bilan[parcelle].nombre} opération(s), ${bilan[parcelle].total} FCFA`);
  }

  const bornes = coutMinMax(operations);
  if(bornes === null){
    console.log('Coût minimum et maximum : aucune donnée');
  }else{
    console.log(`Coût minimum : ${bornes.min} FCFA · Coût maximum : ${bornes.max} FCFA`);
  }
  console.log('Rappel : ce sont des dépenses. Sans les revenus, elles ne mesurent pas la rentabilité.');
}
async function supprimer(operations) {
  const id = await demander('Identifiant : ');
  if(id === null){
    return;
  }
  const operation= supprimerOperation(operations, id.toUpperCase());
  if(operation === undefined){
    console.log(`Opération ${id.toUpperCase()} introuvable.`)
    return;
  }
  await enregistrerJson(FICHIER_DONNEES , operations);
  console.log(`Opération ${id} ajoutée . Le registre compte ${operations.length} opérations.`)

}

async function modifier(operations) {
  console.log('--- Modifier une Opération ---');
  const id = await demander('Identifiant : ');
  if(id === null){
    return;
  }
  const champ = await demander('Champ à modifier ( date, parcelle, culture, operation, coutFCFA) : ');
  if(champ === null){
    return;
  }
  const valeur = await demander('Nouvelle valeur : ');
  if(champ === null){
    return;
  }
  const champsValides =['date', 'parcelle', 'culture', 'operation', 'coutFCFA'];
  if(!champsValides.includes(champ)){
    console.log('champ inconnu.');
    return;
  }
  let nouvelle= valeur;
  if(champ === 'coutFCFA'){
    const nombre=Number(valeur);
    if(Number.isNaN(nombre) || nombre < 0){
      console.log('Coût invalide : il faut un nombre possitif ou nul.');
      return;
    }
  }else if(champ === 'parcelle'){
      nouvelle = valeur.toUpperCase();
    }
    else if(champ === 'culture' || champ === 'operation'){
      nouvelle = valeur.toLowerCase();
    }

    const erreurs = modifierOperation(operations, id.toUpperCase(), champ, nouvelle);
    if(erreurs.length > 0){
      console.log('Modification refusée : ');
      for (const erreur of erreurs){
      console.log(`  - ${erreur}`);
    }
      return;
    }


  await enregistrerJson(FICHIER_DONNEES , operations);
  console.log(`Opération ${id} suprimé . Le registre compte ${operations.length} opérations.`)
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
          case '3':
            await rechercher(operations);
          break;
          case '4':
            await trier(operations);
          break;
           case '5':
            synthese(operations);
          break;
          case '6':
            await supprimer(operations);
          break;
          case '7':
            await modifier(operations);
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
