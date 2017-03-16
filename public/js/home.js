var map;
var infowindow;
var lat;
var lng;
var mileRadius = 10;

function initMap() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      lng = position.coords.longitude;
      var userLocation = {lat: lat, lng: lng};

      map = new google.maps.Map(document.getElementById('map'), {
        center: userLocation,
        zoom: 14
      });

      infowindow = new google.maps.InfoWindow();
      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch({
        location: userLocation,
        radius: 1610 * mileRadius,
        type: 'food'
      }, callback);
    });
  } else {
    console.log('geolocation NOT available ;(');
  }
}

function callback(results, status, pagination) {
  setTimeout(function() {
    pagination.nextPage()
  }, 3000);
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}
