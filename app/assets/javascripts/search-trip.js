// ===========================
// AUTOCOMPLETE
// ===========================

var showResults;
var scrollTo;
var map;
var service;
var request;
var appKey = 'AIzaSyBpvaZc6ZbCzujG45MRbYoUPt7Cg_vGb9E';
var actualPlace;
var searchRadius = '100';
var defaultTypes = "all";
var searchType;
var autocomplete;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 48.8534,
            lng: 2.3488
        },
        zoom: 10
    });
    var input = /** @type {!HTMLInputElement} */ (
        document.getElementById('pac-input'));

    //var types = document.getElementById('type-selector');
    //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    //map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

    autocomplete = new google.maps.places.Autocomplete(input);
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

        request = {
            location: place.geometry.location, // on lui indique la localisation où chercher les points d'interet
            radius: searchRadius, // on lui indique dans quel rayon chercher les points d'interets
            types: [defaultTypes] // on lui indique quel type de Places on recherche
        };
        
        actualPlace = place.geometry.location;

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

    
//      function setupClickListener(id, types) {
//          var radioButton = document.getElementById(id);
//          radioButton.addEventListener('click', function () {
//              autocomplete.setTypes(types);
//          });
//      }
//
//      setupClickListener('changetype-all', ['all']);
//      setupClickListener('changetype-bank', ['bank']);
//      setupClickListener('changetype-bar', ['bar']);
//      setupClickListener('changetype-restaurant', ['restaurant']);
//      setupClickListener('changetype-museum', ['museum']);
      
}



// ===========================
// RECHERCHE DE PLACES
// ===========================

/*
function initialize() {
    
    console.log('__initialize');

    // define lat-long
    var searchLocalisation = new google.maps.LatLng(-33.8665433, 151.1956316); // Pour l'instant, lat-long de la ville de pyrmont

    // Google.map API : On update la carte pour centrer et zommer sur la localisation souhaitée
    map = new google.maps.Map(document.getElementById('map'), {
        center: searchLocalisation,
        zoom: 15
    });

    // Google.places API : On définit la requête pour les places Google
    var request = {
        location: searchLocalisation, // on lui indique la localisation où chercher les points d'interet
        radius: searchRadius, // on lui indique dans quel rayon chercher les points d'interets
        types: ['all'] // on lui indique quel type de Places on recherche
    };

    service.nearbySearch(request, showResults);
}
*/

// ===========================
// FILTRES
// ===========================

//function refreshFilter(type) {
//    
//    $('#search-result').html('');
//    
//    searchType = type;
//    
//    autocomplete.setTypes(type);
    
//    requequette = {
//        location: actualPlace, 
//        radius: searchRadius, 
//        types: type
//    };
//    setTimeout(function(){
//        
//        var filterService = new google.maps.places.PlacesService(map);
//        filterService.nearbySearch(requequette, showResults);
//        
//    },2000)
//}


// Callback : retour de l'API Google.place 
jQuery(function ($) {
    
    
//    $('#filters .button').on('click', function(e){
//        e.preventDefault();
//        
//        var type = $(this).attr('data-filter');
//        
//        refreshFilter(type)
//    })
    

    //scrollTo('#elem', 500);

    scrollTo = function (elem, time) {

        $('body, html').animate({
            scrollTop: $(elem).offset().top
        }, time);

    }


    showResults = function (results, status) {
        
        console.log(searchType);

        $('#search-result').html('');

        // Si on a une reponse du serveur
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            // on boucle sur le resultats
            for (var i = 0; i < results.length; i++) {

                var place = results[i]; // on stock chaque resultat dans une variable

                var placeId = place.place_id; // afficher id du lieu
                var placeName = place.name; // afficher nom du lieu
                var placeRating = place.rating; // afficher la note
                var rateOnFive;
                var types = place.types;

                if (typeof place.rating != 'undefined') {
                    rateOnFive = '<p class="rate">Note : '+ place.rating + '/5 </p>'; // <== ici tu dois concaténer la note avec la note totale ("/5")
                } else {
                    rateOnFive = '<p class="rate no-rate">Pas de note</p>';
                }

                var placeOpen;
                if (typeof place.opening_hours != 'undefined' && typeof place.opening_hours.open_now != 'undefined') {
                    if (place.opening_hours.open_now) {
                        placeOpen = 'Actuellement ouvert';
                    } else {
                        placeOpen = 'Actuellement fermé';
                    }
                } else {
                    placeOpen = 'Non renseigné';
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
                var linkText = "";
                var linkClass = "";
                
                var currentIds = sessionStorage.getItem("currentIds");
                
                if(typeof currentIds != 'undefined'){
                    
                    if(currentIds.indexOf(placeId) == -1){
                        
                        linkText = "Ajouter à mon trip";
                        linkClass = "";
                        
                    }else{
                        
                        linkText = "Retirer de mon trip";
                        linkClass = "onmytrip";
                        
                    }
                }else{
                    linkText = "Ajouter à mon trip";
                    linkClass = "";
                }
                
                $('#search-result').append('<div id="' + placeId + '"class="item startup box-recherche website col-lg-3 col-md-4 col-sm-6"><div class="item-inner"><figure class="figure"><img src="' + placeCover + '" /></figure><div class="content text-left"><h3>' + placeName + '</h3><p>open : ' + placeOpen + '</p>' + rateOnFive + '<a href="#" id="' + placeId + '" class="add-trip '+linkClass+'">'+linkText+'</a></p></div></div></div>'); // on renseigne la liste des resultats à l'endroit indiqué            
                // on renseigne la liste des resultats à l'endroit indiqué

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
