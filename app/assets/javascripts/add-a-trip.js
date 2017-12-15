jQuery(function ($) { // Il faut attendre que jQuery soit chargé pour écrire en jQuery (logique)

$('body').on('click', '.add-trip', function (event) { // au clic sur un bouton "ajouter au trip"

    var obj = $(this);
    var placeNameAdded = $(this).parents('.item').find('h3').text();
    event.preventDefault() // empecher l'event par defaut : changer de page vers le lien href

    var idToSave = $(this).attr('id'); // l'ID de la place sur laquelle on a cliqué sur le bouton "add to click"


    if (typeof sessionStorage != 'undefined') { // si session storage est supporté par le navigateur

        if (sessionStorage.getItem("currentIds") == null) { // si c'est la première ID que lon stock

            sessionStorage.setItem("currentIds", idToSave + '--&'); // on enregistre cette ID
            obj.addClass('onmytrip').text('Retirer de mon trip');

        } else { // si des ids sont déjà été enregistrées en sessionStorage

            var currentIds = sessionStorage.getItem("currentIds");

            if (currentIds.indexOf(idToSave) == -1) { // il n'est pas deja dans la liste

                sessionStorage.setItem("currentIds", currentIds + idToSave + '--&'); // puis on ré-enregistre en séparant chaque ID par un charactère exotique (--&)

                obj.addClass('onmytrip').text('Retirer de mon trip');

                $('.liste-page-maps .sub-title').append( '<li>'+ placeNameAdded +'</li>' );
            } else { // il est deja dans la liste

                console.log('il est dedans :)');
                obj.removeClass('onmytrip').text('Ajouter a mon trip');

                var newCurrentIds = currentIds.replace(idToSave + '--&', '');
                sessionStorage.setItem("currentIds", newCurrentIds);



            }

        }

    } else {

        // si sessionStorage n'est pas supporté par le navigateur
        alert('Connectez-vous avec un autre navigateur !');

    }

    console.log(sessionStorage.getItem("currentIds"));
    console.log(placeNameAdded)
    });

});

// $('#name-save').append('<ul class="sub-title"><li>' + placeName + '</li><br></ul>');
