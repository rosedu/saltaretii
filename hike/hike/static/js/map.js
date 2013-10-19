var map, edit="false", placeListener;
var currRoutePoints = [];

google.maps.event.addDomListener(window, 'load', initialize);

// Button bindings
$('#addRoute').on('click', submitAddRoute);

// Functions for button bindings
function submitAddRoute(event) {
     if (edit == "false") {
         edit = "true";
         placeListener = google.maps.event.addListener(map, 'click', function(event) {
             placeMarker(event.latLng);
             currRoutePoints.push([event.latLng.lat(), event.latLng.lng()]);
});


     } else {
         edit = "false";
         placeListener.remove();
         newRoute = new route($("#start").val(), $("#stop").val(), currRoutePoints);
         console.log(newRoute);
         saveRoutes(newRoute);
     }

     getAddRouteStatus();
}

function getAddRouteStatus() {
     $("#addRoute").text(edit);
}

function route(start, stop, points) {
     this.start = start;
     this.stop =  stop;
     this.points = currRoutePoints;
     currRoutePoints = [];
}

function placeMarker(location) {
    var marker = new google.maps.Marker({
         position: location,
         map: map
         });

    console.log(location);
}

// Main function if this was C
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

    getAddRouteStatus();

}

function saveRoutes(routes) {
    $.ajax({
        type: 'POST',
        url: 'api/routes/',
        data: JSON.stringify(newRoute),
        dataType: "application/json",
        processData:  false,
        contentType: "application/json"
    });
}
