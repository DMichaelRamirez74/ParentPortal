//Google Map
var map;
var infowindow;


function initMap() {

    var pyrmont = { lat: 13.0624, lng: 80.2654 };
    map = new google.maps.Map(document.getElementById('googleMap'), {
        center: pyrmont,
        zoom: 5
    });
}




// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
        });
    }

}


// parent  search location

$("#btnSearchLocation").click(function () {
   

    var geocoder = new google.maps.Geocoder();
    //var con = document.getElementById('Address').value;
    var con = $('.txtAddress').val();

    var com = con;
    geocoder.geocode({ 'address': com }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var x = results[0].geometry.location.lat();
            var y = results[0].geometry.location.lng();
            
            var latlng = new google.maps.LatLng(x, y);
            var myOptions = {
                zoom: 8,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            map = new google.maps.Map(document.getElementById("googleMap"), myOptions);
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(x, y),
                map: map,
                title: com
            });
            var infowindow = new google.maps.InfoWindow({
                content: com
            });
            infowindow.open(map, marker);

            //var circle = new google.maps.Circle({
            //    map: map,
            //    radius: 16093,    // 10 miles in metres
            //    fillColor: '#AA0000'
            //});
            circle.bindTo('center', marker, 'position');
            google.maps.event.addDomListener(window, 'load');
        } else {
            res.innerHTML = "Enter correct Details: " + status;
        }
    });

});
