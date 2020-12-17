// alert('le fichier est bien en place');
addEventListener('load', function (evt) {
    initialisationJS('Arthur');
    document.querySelector('form').addEventListener('submit', formSubmited)
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
    // C'est une fonction qui demande de ne pas faire le fonctionnement normal : rechargement de la page
    console.log('Mon formulaire est "submit"');
    console.log(evt.target[0].value);
    console.log(evt.target[1].value);
    console.log(evt.target[2].value);
    console.log(evt.target[3].value);
    var monFormulaire = document.forms['form-editor'];
    // var dareFormated=moment(monFormulaire['date'].value,'DD MM YYYY')
    createPostit(
        monFormulaire['title'].value,
        monFormulaire['date'].value,
        monFormulaire['time'].value,
        monFormulaire['description'].value
    );

}
// document.querySelector('form').addEventListener('submit',formSubmited)
// // on sélectionne dans le document. On utilise la fonction querySelector pour sélectionner une balise form. 
// // A cette balise j'appelle une fonction d'écouteur d'evenement. 
// // Je donne un nom à cette fonction : submit. Puis je lui dis quelle fonction à executer (sans l'executer de suite).

/**
 * Fonction de creation d'un postit avec ajout dans la baliste #list
 * @param {string} titre titre de la note
 * @param {string} date date ISO AAAA-MM-JJ
 * @param {string} heure heure ISO HH:MM:SS
 * @param {string} description creation de la note
 */
function createPostit(titre, date, heure, description) {
    var postit = document.createElement('div');
    postit.classList.add('postit');
    // ajout d'une classe dans la la liste de classe d'un élément. On peut aussi remplacer add par remove
    postit.innerHTML = '<div class="close"><img src="img/close.png" /></div>\
    <div class="postit-titre">'+ titre + '<br /></div>\
    <span class="datetime">date : '+ date + ' </span><span class="datetime">heure : ' + heure + '</span>\
    <h2>Description :</h2>'+ description;

    //selection à partir postit de .close img, puis addEventListener('click',deletePostit)
    postit.querySelector('.close img').addEventListener('click', deletePostit)

    var liste = document.querySelector('#list');
    // selection de la liste de postit -> Reprise de la classe list

    list.append(postit);
    //ajout dans la liste de l'élement 
}

function deletePostit(evt) {
    console.log('evenement lié à la suppression d\'une note', evt)
    //cette fonction affiche dans la console d'un clic
    evt.currentTarget.parentElement.parentElement.remove();
    //cette fonction permet de supprimer le parent du parent de l'élément sélectionné : image dans .close dans .postit
    // pour supprimer l'ensemble du postit
}