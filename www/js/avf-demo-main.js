//*********************************************************************
// AUTHOR: Jeremy Fox
// COURSE: Advanced Visual Frameworks
// FOR: Full Sail Online
// TERM: 1206
//*********************************************************************

//*********************************************************************
// CONTACTS
//*********************************************************************
var options;
var fields = ["displayName", "name"];
var contactName;

$('#contactsPage').live('pageshow', function(event, ui){
    
    // Uncomment For Debugging
    // alert("FIND CONTACT PAGE READY");
    
    options = new ContactFindOptions();
    contactsName = $("#contactName");
});

function findContactOnSuccess(contacts) {
    
    if (contacts.length > 0) {
        for (var i=0; i<contacts.length; i++) {
            $("#contactsDiv").append("Display Name = " + contacts[i].displayName);
        }
    } else {
        navigator.notification.alert(
            'No Contacts Found For: ' + options.filter,
            focusTextField,
            'Sorry',
            'Ok'
        );
    }
}

function findContactOnError(contactError) {
    
    alert('Sorry! An Error has occurred. ' + contactError);
}

function focusTextField(){
    contactName.click();
}

$('#findContact').live('click', function() {
    options.filter = contactName.val();
    if (options.filter != null || options.filter != ""){
        navigator.contacts.find(fields, findContactOnSuccess, findContactOnError, options);
    } else {
        navigator.notification.alert(
            'Please enter a name to search for contacts.',
            focusTextField,
            'Oops!',
            'Ok'
        );
    }
});

//*********************************************************************
// CAMERAS/PHOTOS
//*********************************************************************
var pictureSource;
var destinationType;

$('#photoPage').live('pageshow', function(event, ui){

    // Uncomment For Debugging
    // alert("PHOTO PAGE IS READY!");

    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
});

function onPhotoDataSuccess(imageData) {
    
    var smallImage = document.getElementById('smallImage');
    smallImage.style.display = 'block';
    smallImage.src = "data:image/jpeg;base64," + imageData;
}
    
function onPhotoURISuccess(imageURI) {
    
    var largeImage = document.getElementById('largeImage');
    largeImage.style.display = 'block';
    largeImage.src = imageURI;
}

var capturePhoto = function() {

    navigator.camera.getPicture(onPhotoDataSuccess, photosOnFail, { quality: 50,
        destinationType: destinationType.DATA_URL });
}

var capturePhotoEdit = function() {

    navigator.camera.getPicture(onPhotoDataSuccess, photosOnFail, { quality: 20, allowEdit: true,
        destinationType: destinationType.DATA_URL });
}

var getPhoto = function(source) {

    navigator.camera.getPicture(onPhotoURISuccess, photosOnFail, { quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source });
}

var photosOnFail = function(message) {
    alert('Failed because: ' + message);
}

$("#capturePhoto")    .live('click', capturePhoto);

$("#capturePhotoEdit").live('click', capturePhotoEdit);

$("#getPhotoLibrary") .live('click', function(){
    getPhoto(pictureSource.PHOTOLIBRARY);
});

$("#getPhotoAlbum")   .live('click', function(){
    getPhoto(pictureSource.SAVEDPHOTOALBUM);
});
    
//*********************************************************************
// NOTIFICATIONS
//*********************************************************************
var notificationBtn = $('#notification');

notificationBtn.live('click', function(){
    function alertDismissed() {
        // do nothing
        console.log("Dismissed");
    }
    
    navigator.notification.alert(
    'You are the winner!',  // message
    alertDismissed(),       // callback
    'Game Over',            // title
    'Done'                  // buttonName
    );
});

//*********************************************************************
// GEOLOCATION
//*********************************************************************
$('#geolocationPage').live('pageshow', function(event, ui){

    // Uncomment For Debugging
    // alert("GEOLOCATION PAGE IS READY!");
});

var geoOnSuccess = function(position) {
    var geolocationDiv = $('#geolocationDiv');
    geolocationDiv.append( 'Latitude: ' + position.coords.latitude + '<br />' +
    'Longitude: '          + position.coords.longitude             + '<br />' +
    'Altitude: '           + position.coords.altitude              + '<br />' +
    'Accuracy: '           + position.coords.accuracy              + '<br />' +
    'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
    'Heading: '            + position.coords.heading               + '<br />' +
    'Speed: '              + position.coords.speed                 + '<br />' +
    'Timestamp: '          + new Date(position.timestamp)          + '<br />' +
    '<hr>');
};

var geoOnError = function(error) {
    alert('code: ' + error.code    + '\n' +
    'message: ' + error.message + '\n');
}

$('#geolocation').live('click', function(){
    navigator.geolocation.getCurrentPosition(geoOnSuccess, geoOnError, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
});