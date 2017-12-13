

// https://developers.google.com/maps/documentation/javascript/examples/geocoding-place-id
// Ajouter un marker sur la carte en fonction de l'ID d'une place :
//
//var geocoder = new google.maps.Geocoder;
//
//function geocodePlaceId(geocoder, map, infowindow) {
//    var placeId = document.getElementById('place-id').value;
//    geocoder.geocode({
//        'placeId': placeId
//    }, function (results, status) {
//        if (status === 'OK') {
//            if (results[0]) {
//                map.setZoom(11);
//                map.setCenter(results[0].geometry.location);
//                var marker = new google.maps.Marker({
//                    map: map,
//                    position: results[0].geometry.location
//                });
//            } else {
//                alert('No results found');
//            }
//        } else {
//            alert('Geocoder failed due to: ' + status);
//        }
//    });
//
//}
//
//});
