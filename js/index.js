// alert('le fichier est bien en place');
addEventListener('loadend',function(evt) {
    initialisationJS('Arthur');
    document.querySelector('form').addEventListener('submit',formSubmited)
    //on crée une fontion anonyme(qui ne pourra pas être ré-executée) lors de l'évenement chargement complet du DOM.
    //cette fonction dit d'exercer toutes les fonctions de la page 
});

// declaration d'une fonction
function initialisationJS(prenom) {
    // On crée une variable et on affecte la valeur à DeviceOrientationEvent. 
    // Ajouter le prenom est un attribut que l'on définit
    var balise = document.querySelector('#jsload');
    // modification du contenu html de la balise dans la var
    balise.style.backgroundColor = "GREEN";
    // Modif du style CSS dans la varaiable
    balise.innerHTML = "JS CHARGE POUR " + prenom
    // on ajoute la concaténation de l'attribut prenom
}
// usage d'une fonction
initialisationJS('Arthur');
// on définit que la variable prenom à pour cette initialisation la valeur 'Arthur'
function formSubmited(evt) {
    evt.preventDefault();
    // C'est une fonction qui demande de ne pas faire le fonctionnement normal
    console.log('Mon formulaire est "submit"');
    console.log(evt.target[0].value);
    console.log(evt.target[1].value);
    console.log(evt.target[2].value);
    console.log(evt.target[3].value);
}
// document.querySelector('form').addEventListener('submit',formSubmited)
// // on sélectionne dans le document. On utilise la fonction querySelector pour sélectionner une balise form. 
// // A cette balise j'appelle une fonction d'écouteur d'evenement. 
// // Je donne un nom à cette fonction : submit. Puis je lui dis quelle fonction à executer (sans l'executer de suite).

function createPostit(params) {
    var postit=document.createElement('div');
    postit.classList.add('postit')
    // ajout d'une classe dans la la liste de classe d'un élément. On peut aussi remplacer add par remove
    postit.innerHTML='Non nouveau postit'
}