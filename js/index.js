// alert('le fichier est bien en place');
// declaration d'une fonction
function initialisationJS(prenom){
// On crée une variable et on affecte la valeur à DeviceOrientationEvent. 
// Ajouter le prenom est un attribut que l'on définit
var balise=document.querySelector('#jsload');
// modification du contenu html de la balise dans la var
balise.style.backgroundColor="GREEN";
// Modif du style CSS dans la varaiable
balise.innerHTML="JS CHARGE POUR "+prenom
// on ajoute la concaténation de l'attribut prenom
}
// usage d'une fonction
initialisationJS('Arthur');
// on définit que la variable prenom à pour cette initialisation la valeur 'Arthur'