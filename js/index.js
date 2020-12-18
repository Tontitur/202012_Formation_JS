// alert('le fichier est bien en place');
addEventListener('load', function (evt) {
    initialisationJS('Arthur');
    document.querySelector('form').addEventListener('submit', formSubmited);
    //on crée une fontion anonyme(qui ne pourra pas être ré-executée) lors de l'évenement chargement complet du DOM.
    //cette fonction dit d'exercer toutes les fonctions de la page 

    //chargement initial des postit
    (new Crud(BASE_URL)).recuperer('/postit', function (mesPostIts) {
        console.log('J\'ai fini de recevoir mes postit voici la liste:', mesPostIts);
        mesPostIts.forEach(function (postit) {
            console.log(postit, postit.datetime);
            createPostitByObject(postit);
        });
    });

})

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
    var monFormulaire = document.forms['editor-form'];
    // var dareFormated=moment(monFormulaire['date'].value,'DD MM YYYY')
    //constitution de l'objet à envoyer au rest
    var postit = {
        titre: monFormulaire["title"].value,
        datetime: monFormulaire["date"].value + 'T' + monFormulaire["time"].value,
        description: monFormulaire["description"].value
    };
    console.log(postit);
    //appel rest pour l'ajout dans la liste et recup de l'id
    (new Crud(BASE_URL)).creer('/postit', postit, function (objSaved) {
        createPostitByObject(objSaved);
    });

}
// document.querySelector('form').addEventListener('submit',formSubmited)
// // on sélectionne dans le document. On utilise la fonction querySelector pour sélectionner une balise form. 
// // A cette balise j'appelle une fonction d'écouteur d'evenement. 
// // Je donne un nom à cette fonction : submit. Puis je lui dis quelle fonction à executer (sans l'executer de suite).

/**
 * Fonction de creation d'un postit avec ajout dans la baliste #list
 * Cette fonction n'est plus utilisée
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

/**
 * Fonction de création d'un postit avec ajout dans la balise div#list par le biais d'un objet postit complet
 * @param {Object} postitInput
 */
function createPostitByObject(postitInput) {
    var postit = document.createElement('div');
    //creation de l'id de balise en lien avec l'id du postit dans le reste pour faciliter la suppression
    postit.id = 'postit-' + postitInput.id;
    postit.classList.add('postit');
    postit.addEventListener('dblclick', putinformclickedpostit);
    postit.innerHTML = '<div class="close"><img src="img/close.png" /></div>\
    <div class="postit-titre">'+ postitInput.titre + '<br /></div>\
    date : <span class="datetime postit-date">'+ postitInput.datetime.substring(0, 10) + '</span> heure : <span class="datetime postit-heure">' + postitInput.datetime.substring(11) + '</span>\
    <h2>Description :</h2><div class="postit-description">'+ postitInput.description; +'</div>';
    //on a mis 2 class dans la balise div. Les deux class sont séparées par un espace. On peut mettre autant de class que l'on veut.
    //Attention à ne pas finir par un espace => cela créerait une class vide
    postit.querySelector('.close img').addEventListener('click', deletePostit)

    var liste = document.querySelector('#list');
    // selection de la liste de postit -> Reprise de la classe list

    list.append(postit);
    //ajout dans la liste de l'élement 
}

function deletePostit(evt) {
    evt.stopPropagation();
    //permet d'éviter que l'évenement ne se propage pas. Car le bouton delete est dans le postit
    window.evt = evt;
    console.log('evenement lié à la suppression d\'une note', evt)
    //cette fonction affiche dans la console d'un clic
    var domPostitId = evt.path[2].id.substring(7);
    (new Crud(BASE_URL)).supprimer('/postit/' + domPostitId, function () {
        evt.path[2].remove();
    });
    // evt.currentTarget.parentElement.parentElement.remove();
    //cette fonction permet de supprimer le parent du parent de l'élément sélectionné : image dans .close dans .postit
    // pour supprimer l'ensemble du postit
}

function putinformclickedpostit(evt) {
    console.log('j\'ai double cliqué sur un postit', evt)
    var dompostit = evt.currentTarget;
    console.log(
        dompostit.id.substring(7),
        dompostit.querySelector('.postit-titre').innerText,
        dompostit.querySelector('.postit-date').innerText,
        dompostit.querySelector('.postit-heure').innerText,
        dompostit.querySelector('.postit-description').innerText,
    );
document.forms['editor-form']['id'].value=dompostit.id.substring(7);
document.forms['editor-form']['title'].value=dompostit.querySelector('.postit-titre').innerText;
document.forms['editor-form']['date'].value=dompostit.querySelector('.postit-date').innerText;
document.forms['editor-form']['time'].value=dompostit.querySelector('.postit-heure').innerText;
document.forms['editor-form']['description'].value=dompostit.querySelector('.postit-description').innerText;
}
