// Geolocation onSuccess Callback
//
var onSuccess = function(position) {
        var geolocationDiv = $('#geolocationDiv');
        geolocationDiv.append( 'Latitude: '           + position.coords.latitude              + '<br />' +
                            'Longitude: '          + position.coords.longitude             + '<br />' +
                            'Altitude: '           + position.coords.altitude              + '<br />' +
                            'Accuracy: '           + position.coords.accuracy              + '<br />' +
                            'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                            'Heading: '            + position.coords.heading               + '<br />' +
                            'Speed: '              + position.coords.speed                 + '<br />' +
                            'Timestamp: '          + new Date(position.timestamp)          + '<br />' +
                            '<hr>');
};

// Geolocation onError Callback receives a PositionError object
//
var onError = function(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

// Get References To Buttons
//
var notificationBtn = $('#notification');
var geolocationBtn = $('#geolocation');

notificationBtn.live('click', function(){
  function alertDismissed() {
      // do nothing
      console.log("Dismissed");
  }
  
  navigator.notification.alert(
            'You are the winner!',  // message
            alertDismissed(),         // callback
            'Game Over',            // title
            'Done'                  // buttonName
        );
});
  
geolocationBtn.live('click', function(){
  navigator.geolocation.getCurrentPosition(onSuccess, onError, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
});