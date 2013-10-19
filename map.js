var map;
function initialize() {
  var mapOptions = {
    zoom: 18,
    center: new google.maps.LatLng(45.7291, 24.7019),
    mapTypeControlOptions: {
    mapTypeIds: [google.maps.MapTypeId.TERRAIN]
         },
    mapTypeId: google.maps.MapTypeId.TERRAIN

  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
}
if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(function (position) {
         initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
         map.setCenter(initialLocation);
     });
 }
google.maps.event.addDomListener(window, 'load', initialize);
