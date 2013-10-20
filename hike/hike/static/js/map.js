var map, routeInput=false, placeListener;
var currRoutePoints = [];

google.maps.event.addDomListener(window, 'load', initialize);

// Button bindings
$('#addRoute').on('click', enableRouteInput);
$('#saveRoute').on('click', submitRoute);

// Functions for button bindings
function enableRouteInput(event) {
     if (routeInput == true)
         return;

     routeInput = true;
     $("#routeInputPanel").show();
     placeListener = google.maps.event.addListener(map, 'click', function(event) {
         placeMarker(event.latLng);
         currRoutePoints.push([event.latLng.lat(), event.latLng.lng()]);
     });
}

function submitRoute() {
     if (routeInput == false)
         return;

     newRoute = new RouteObject($("#start").val(), $("#stop").val(), currRoutePoints);

     if (checkRouteSanity(newRoute) == false) {
         console.log("iese");
         return;

     }

     placeListener.remove();
     saveRoutes(newRoute);
     if (newRoute && newRoute.points !== undefined) {
        drawRoute(newRoute.points);
    }

     // Clean the current route
     currRoutePoints = [];
     routeInput = false;
     $("#routeInputPanel").hide();

}

function checkRouteSanity(RouteObject) {
     if (RouteObject.start == "") {
         alert("Enter the name of the starting point!");
         return false;
     }

     if (RouteObject.stop == "") {
         alert("Enter the name of the final point!");
         return false;
     }

     if (RouteObject.points.length < 2) {
         alert("Invalid route!");
         return false;
     }

     return true;
}

function RouteObject(start, stop, points) {
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

function drawRoute(points) {
    if (points === undefined) {
        console.log("Houston, we have a problem...");
        return;
    }

    var routeCoords = [];

    for (var i = 0; i < points.length; ++i) {
        routeCoords.push(new google.maps.LatLng(points[i][0], points[i][1]));
    }

    var iCanHazAPoly = new google.maps.Polyline({
       path: routeCoords,
       geodesic: true,
       strokeColor: '#FF0000',
       strokeOpacity: 0.6,
       strokeWeight: 1.5
    });

    // setAllMap(null);
    iCanHazAPoly.setMap(map);
}

function clearRoute() {
    setAllMap(map);
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

    drawElements();
}

function drawElements() {
    // Do GET api call and fetch routes.
    drawRouteMenuItems();
}

function drawRouteMenuItems() {
    $list = $('.menu-routes .routes-list');
    $.get('api/routes/', function(data) {
        for (var i = 0; i < data.objects.length; ++i) {
            route = data.objects[i];
            route_item = '<li><a href="#" class="route-item" data-points="' + route.points + '">' + route.start + " - " + route.stop + '</a></li>';
            $list.append(route_item);
        }
        $('.route-item').click(clickRouteItem);
    });

}

/* When you click on a route from right menu, you get it displayed. */
function clickRouteItem(event) {
    event.preventDefault();
    drawRoute($(event.currentTarget).data("points"));
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
