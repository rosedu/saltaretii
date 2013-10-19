var map;
var edit="false", placeListener;

function initialize() {
    var mapOptions = {
        zoom: 18,
        center: new google.maps.LatLng(45.7291, 24.7019),
        mapTypeControlOptions: {
             mapTypeIds: [google.maps.MapTypeId.TERRAIN,
                          google.maps.MapTypeId.ROADMAP,
                          google.maps.MapTypeId.SATELLITE,
                          google.maps.MapTypeId.HYBRID],
             style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
        },
        mapTypeId: google.maps.MapTypeId.TERRAIN
    };

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            initialLocation = new google.maps.LatLng(position.coords.latitude,
                                                     position.coords.longitude);
            map.setCenter(initialLocation);
        });
    }

    map = new google.maps.Map(document.getElementById('map-canvas'),
          mapOptions);

    getEditStatus();

    }

//
function placeMarker(location) {
    var marker = new google.maps.Marker({
         position: location,
         map: map
         });

    console.log(location.toString());
}

google.maps.event.addDomListener(window, 'load', initialize);

function submit() {
     if (edit == "false") {
        edit = "true"
        placeListener = google.maps.event.addListener(map, 'click', function(event) {
            placeMarker(event.latLng);
        });

     } else {
         edit = "false"
         placeListener.remove();
     }

     getEditStatus();
}

function getEditStatus() {
     document.getElementById("onoff").innerHTML = edit;
}
