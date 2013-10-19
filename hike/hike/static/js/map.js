var map, routeInput="false", placeListener;
var currRoutePoints = [];

google.maps.event.addDomListener(window, 'load', initialize);

// Button bindings
$('#addRoute').on('click', enableRouteInput);
$('#saveRoute').on('click', submitRoute);

// Functions for button bindings
function enableRouteInput(event) {
     if (routeInput == "true")
         return;

     routeInput = "true";
     $("#routeInput").show();
     placeListener = google.maps.event.addListener(map, 'click', function(event) {
         placeMarker(event.latLng);
         currRoutePoints.push([event.latLng.lat(), event.latLng.lng()]);
     })
}

function submitRoute() {
     if (routeInput == "false")
         return;

     newRoute = new route($("#start").val(), $("#stop").val(), currRoutePoints);

     if (checkRouteSanity(newRoute) == "false")
         return;

     placeListener.remove();
     saveRoutes(newRoute);

     // Clean the current route
     currRoutePoints = [];
     routeInput = "false";
     $("#routeInput").hide();
}

function checkRouteSanity(route) {
     if (route.start == "") {
         alert("Enter the name of the starting point!");
         return false;
     }

     if (route.stop == "") {
         alert("Enter the name of the final point!");
         return false;
     }

     if (route.points.length() == 0) {
         alert("Invalid route!");
         return false;
     }

     return true;
}

function route(start, stop, points) {
     this.start = start;
     this.stop =  stop;
     this.points = currRoutePoints;
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
