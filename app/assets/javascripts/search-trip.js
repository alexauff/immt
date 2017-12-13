// ===========================
// AUTOCOMPLETE
// ===========================

var showResults;
var scrollTo;

var map;
var service;
var appKey = 'AIzaSyBpvaZc6ZbCzujG45MRbYoUPt7Cg_vGb9E';

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 48.8534,
            lng: 2.3488
        },
        zoom: 10
    });
    var input = /** @type {!HTMLInputElement} */ (
        document.getElementById('pac-input'));

    //var types = document.getElementById('type-selector');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    //map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', function () {

        scrollTo('#work-list', 500);
        
        marker.setVisible(false);

        var place = autocomplete.getPlace();

        var request = {
            location: place.geometry.location, // on lui indique la localisation où chercher les points d'interet
            radius: '500', // on lui indique dans quel rayon chercher les points d'interets
            types: ['all'] // on lui indique quel type de Places on recherche
        };

        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, showResults);

        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17); // Why 17? Because it looks good.
        }
        marker.setIcon( // @type {google.maps.Icon} 
            ({
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(35, 35)
            }));
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }

        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address + '</div>'); // je sais pas si j'ai bien fermé la div
        infowindow.open(map, marker);

    });

    // Sets a listener on a radio button to change the filter type on Places
    // Autocomplete.

    /*
      function setupClickListener(id, types) {
          var radioButton = document.getElementById(id);
          radioButton.addEventListener('click', function () {
              autocomplete.setTypes(types);
          });
      }

      setupClickListener('changetype-all', []);
      setupClickListener('changetype-address', ['address']);
      setupClickListener('changetype-establishment', ['establishment']);
      setupClickListener('changetype-geocode', ['geocode']);
      
      */
}



// ===========================
// RECHERCHE DE PLACES
// ===========================

function initialize() {

    // define lat-long
    var searchLocalisation = new google.maps.LatLng(-33.8665433, 151.1956316); // Pour l'instant, lat-long de la ville de pyrmont

    // Google.map API : On update la carte pour centrer et zommer sur la localisation souhaitée
    map = new google.maps.Map(document.getElementById('map'), {
        center: searchLocalisation,
        zoom: 15
    });

    // Google.places API : On défini la requette pour les places Google
    var request = {
        location: searchLocalisation, // on lui indique la localisation où chercher les points d'interet
        radius: '500', // on lui indique dans quel rayon chercher les points d'interets
        types: ['store'] // on lui indique quel type de Places on recherche
    };


    // on stock la query dans une variable "service"
    service = new google.maps.places.PlacesService(map);
    // on appel la fonction ajax de google place, en mettant les paramettres (request) et on appel la fonction de retour (callback)
    service.nearbySearch(request, showResults);
}


// Callback : retour de l'API Google.place 
jQuery(function ($) {
    
    //scrollTo('#elem', 500);
    
    scrollTo = function(elem, time){
        
        $('body, html').animate({ 
            scrollTop : $(elem).offset().top
        },time);
        
    }
    
    
    showResults = function (results, status) {

        $('#search-result').html('');

        // Si on a une reponse du serveur
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            // on boucle sur le resultats
            for (var i = 0; i < results.length; i++) {

                var place = results[i]; // on stock chaque resultat dans une variable

                var placeId = place.place_id; // afficher id du lieu
                var placeName = place.name; // afficher nom du lieu
                var placeRate = place.rate;
                var placeOpen;
                if (typeof place.opening_hours != 'undefined' && typeof place.opening_hours.open_now != 'undefined') {
                    if (place.opening_hours.open_now) {
                        placeOpen = 'Actuellement ouvert';
                    } else {
                        placeOpen = 'Actuellement fermé';
                    }
                } else {
                    placeOpen = 'non renseigné';
                }

                var photoRef;
                var placeCover;
                if (typeof place.photos != 'undefined' && typeof place.photos[0] != 'undefined' && typeof place.photos[0].getUrl({
                        'maxWidth': 600,
                        'maxHeight': 400
                    }) != 'undefined') {

                    placeCover = place.photos[0].getUrl({
                        'maxWidth': 600,
                        'maxHeight': 400
                    });

                } else {
                    placeCover = '/assets/place-default.jpg';
                }
                $('#search-result').append('<div id="' + placeId + '"class="item startup box-recherche website col-lg-3 col-md-4 col-sm-6"><div class="item-inner"><figure class="figure"><img src="' + placeCover + '" /></figure><div class="content text-left"><p>' + place.name + ' | open : ' + placeOpen + '<a href="#" id="' + placeId + '" class="add-trip"> Ajouter a mon trip</a></p></div></div></div>'); // on renseigne la liste des resultats à l'endroit indiqué

                $('.add-trip').on('click', function (e) {
                    e.preventDefault();
                })

                // Autosave test 

                // sessionStorage.setItem("autosave", placeId);

                // var placeId_json = JSON.stringify(placeId);
                // sessionStorage.setItem("autosave", placeId_json);

            }
        } else {
            alert('aucun resultat');
        }
    }
});







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



// https://developers.google.com/maps/documentation/javascript/examples/geocoding-place-id

// Ajouter un marker sur la carte en fonction de l'ID d'une place :

var importPlaceId = {
    placeId : "mabite"
}
console.log(placeId)


