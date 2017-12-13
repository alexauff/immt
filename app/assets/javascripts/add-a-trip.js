

// On peut faire un nouveau fichier JS avec ce code : "add-a-trip.js" par exemple

jQuery(function ($) { // Il faut attendre que jQuery soit chargé pour écrire en jQuery (logique)

    $('body').on('click', '.add-trip', function (event) { // au clic sur un bouton "ajouter au trip"

        event.preventDefault() // empecher l'event par defaut : changer de page vers le lien href

        var idToSave = $(this).attr('id'); // l'ID de la place sur laquelle on a cliqué sur le bouton "add to click"
        console.log('on sauvegarde l\'id : ' + idToSave); // on verifie dans la console que c'est le bon ID, par rapport à celui sur lequel on a cliqué

        // prochaines étapes : 

        // 1 -- on regarde ce qui est enregistré dans le sessionStorage, et on le stock dans une variable currentsIds (ex: sessionStorage = 222--&333)
        // 2 -- on ajoute idToSave (ex: idToSave = 666) à la chaine currentIds  (ex: sessionStorage = 222--&333--&666)
        // 3 -- on sauvegarde le nouvel état de currentIds dans le sessionStorage

        if (typeof sessionStorage != 'undefined') { // si session storage est supporté par le navigateur

            if (sessionStorage.getItem("currentIds") == null) { // si c'est la première ID que lon stock

                sessionStorage.setItem("currentIds", idToSave); // on enregistre cette ID

            } else { // si des ids sont déjà été enregistrées en sessionStorage

                var currentIds = sessionStorage.getItem("currentIds"); // on les stock dans une varaible
                sessionStorage.setItem("currentIds", currentIds + '--&' + idToSave); // puis on ré-enregistre en séparant chaque ID par un charactère exotique (--&)

            }

        } else {

            // si sessionStorage n'est pas supporté par le navigateur
            alert('Il faut vous creer un compte pour enregistrer un trip');

        }

        console.log('sessionStorage : ' + sessionStorage.getItem("currentIds")) // on affiche ce qu'il y a dans sessionStorage


    });
});

