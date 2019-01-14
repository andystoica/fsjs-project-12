"use strict";
/**
 * Obtain the Google Map Key from the back-end which requires login
 * and import the Google Map Library
 */
$.get('/api/key', function (res) {
    if (res && res.key) {
        var endPoint = 'https://maps.googleapis.com/maps/api/js?key=' + res.key + '&callback=initMap';
        $.getScript(endPoint);
    }
});


/**
 * initMap is called automatically after the Google Map plugin complete initialises.
 */
function initMap() {

    // Initialise the Google Map plugin
    var map = new google.maps.Map($('#tracker')[0], {
        zoom: 2,
        maxZoom: 8,
        center: {
            lat: 20,
            lng: 0
        },
        styles: colourScheme,
        mapTypeControl: false,
        rotateControl: false,
        streetViewControl: false
    });
    var markers = [];
    var infoWindows = [];


    // Main traking function, when the user clicks the button
    // Retreive ISS location and ground weather information from the back-end
    // format and attach a marker to the map
    function locateIss() {
        $('#locate').addClass('disabled');
        $.get('/api/location', function (res) {

            // Create a new marker
            var marker = new google.maps.Marker({
                position: { lat: res.lat, lng: res.lng },
                icon: '/img/iss-icon.png',
                map: map,
                title: res.date + ', ' + res.time,
            });

            // Content for the information window when marker is clicked
            var contentString = '<div id="mapContent">' +
                '<div id="siteNotice"></div>' +
                '<div id="bodyContent">' +
                '<h3 class="firstHeading" id="firstHeading">' + res.weather + '<h3>' +
                '<p>' + res.date + ' at ' + res.time + '</p>' +
                '<p>Latitude: <strong>' + res.lat + '</strong>' +
                '<br>Longitude: <strong>' + res.lng + '</strong></p>' +
                '</div></div>';

            // Create the information window and attach to event
            var infoWindow = new google.maps.InfoWindow({
                content: contentString,
                maxWidth: 300
            });

            // On-click marker listener
            marker.addListener('click', function () {
                infoWindow.open(map, marker);
            });

            // Keep track of all markers
            markers.push(marker);
            $('#locate').removeClass('disabled');

            // Center and zoom map arround all known markers
            var bounds = new google.maps.LatLngBounds();
            markers.forEach(function (item) {
                bounds.extend(item.getPosition());
            });
            map.fitBounds(bounds, 50);
        });
    }

    // Bind #locate button to tracking function
    $('#locate').click(function () {
        locateIss();
    });
}



/**
 * Google Map Color Theme
 */

var colourScheme = [
    {
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f5f5"
            }
        ]
    },
    {
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#616161"
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#f5f5f5"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#bdbdbd"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#eeeeee"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e5e5e5"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9e9e9e"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dadada"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#616161"
            }
        ]
    },
    {
        "featureType": "road.local",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9e9e9e"
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e5e5e5"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#eeeeee"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#c9c9c9"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9e9e9e"
            }
        ]
    }
]