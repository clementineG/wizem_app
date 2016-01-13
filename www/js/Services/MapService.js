angular.module('mapService', [])

    .factory('MapService', function () {

        return {
            getMap: function(lat, lng) {
                var map = {
                    center: {
                        latitude: lat,
                        longitude: lng
                    },
                    zoom: 11,
                    options: {
                        zoomControl: false,
                        streetViewControl: false,
                        mapTypeControl: false,
                        scrollwheel: false
                    },
                    styles: [
                        {
                            "featureType": "water",
                            "elementType": "geometry",
                            "stylers": [
                                { "color": "#43B3FE" }
                            ]
                        },{
                            "featureType": "transit.line",
                            "stylers": [
                                { "visibility": "off" }
                            ]
                        },{
                            "featureType": "road",
                            "elementType": "geometry",
                            "stylers": [
                                { "color": "#FEFEFE" }
                            ]
                        },{
                            "featureType": "road.arterial",
                            "elementType": "labels.icon",
                            "stylers": [
                                { "visibility": "off" }
                            ]
                        },{
                            "featureType": "road.local",
                            "elementType": "labels.icon",
                            "stylers": [
                                { "visibility": "off" }
                            ]
                        },{
                            "featureType": "road.highway",
                            "elementType": "labels.icon",
                            "stylers": [
                                { "visibility": "off" }
                            ]
                        },{
                        }
                    ]
                };
                return map;
            },
            getMarkers: function(tabMarkers) {
                var markers = [];
                angular.forEach(tabMarkers, function(place, key) {
                    marker = {
                        id: key,
                        coords: {
                            latitude: place.lat,
                            longitude: place.lng
                        },
                        options: {
                            icon: "urlImage" + key + ".png"
                        }
                    };
                    markers.push(marker);
                });
                return markers;
            }

        }

    });