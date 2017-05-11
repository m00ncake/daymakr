/**
 * Created by JTM on 5/10/17.
 */






var global_result;
var food_result;
var locations =[];
$(document).ready(function() {


    $('.submit').click(function () {
        console.log('click initiated');
        $.ajax({
            method:'get',
            dataType: 'json',
            url: 'sampleDataTwo.json',
            success: function (response) {
                global_result = response;
                console.log('it worked');
                displayAcvtivtyList();

            },
            error:function(response){
                console.log('url wrong');
            }

        })
        locations = [
            {title: global_result[0].name, location: {lat: global_result[0].coordinates.latitude, lng: global_result[0].coordinates.longitude}},
            {title: global_result[1].name, location: {lat: global_result[1].coordinates.latitude, lng: global_result[1].coordinates.longitude}},
            {title: global_result[2].name, location: {lat: global_result[2].coordinates.latitude, lng: global_result[2].coordinates.longitude}}
            // {title: food_result[0].name, location: {lat: food_result[0].coordinates.latitude, lng: food_result[0].coordinates.longitude}},
            // {title: food_result[1].name, location: {lat: food_result[1].coordinates.latitude, lng: food_result[1].coordinates.longitude}},
            // {title: food_result[2].name, location: {lat: food_result[2].coordinates.latitude, lng: food_result[2].coordinates.longitude}}

        ];
        initMap();
    });

    $.ajax({
        dataType: "json",
        data:{
            APPID: '52ea1802f2e0fd3ef3a1708f1b6f52b6',
            q: 'new york'
        },
        url: "http://api.openweathermap.org/data/2.5/weather",
        method: "get",
        success: function(response){
            console.log(response);
            var cityName = response.name;
            var cityWeather = response.weather[0].description;
            var weatherIcon = response.weather[0].icon;
            console.log(cityName, cityWeather, weatherIcon);
            updateWeather(cityName, cityWeather, weatherIcon);
        },
        error: function(response){
            console.log("didn't work");
        }
    });

});

    var map;
    var markers = [];
    function initMap() {
        var styles = [
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#444444"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#f8ac00"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 45
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#ecc646"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            }
        ]
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 34.052235, lng: -118.243683},
            zoom: 13,
            styles: styles,
            mapTypeControl: false
        });

        var largeInfowindow = new google.maps.InfoWindow();
        var bounds = new google.maps.LatLngBounds();
        for(var i = 0; i < locations.length; i++){
            var position = locations[i].location;
            var title = locations[i].title;
            var marker = new google.maps.Marker({
                map: map,
                position: position,
                title: title,
                id: i
            });
            markers.push(marker);
            bounds.extend(marker.position);
            marker.addListener("click", function(){
                populateInfoWindow(this, largeInfowindow);
            });
        }
        map.fitBounds(bounds);
        function populateInfoWindow(marker, infowindow){
            if(infowindow.marker != marker){
                infowindow.marker = marker;
                infowindow.setContent('<div>' + marker.title + '</div>');
                infowindow.open(map, marker);
                infowindow.addListener('closeclick', function(){
                    infowindow.setMarker(null);
                });
            }
        }


}
function displayLocation() {


}
function getActivityList(){

}
function displayAcvtivtyList(){
    for(i=0; i<=2; i++){
        var activity = global_result[i].image_url;
        $(".activity" + i).css("background-image","url(" + activity + ")");
        var name = global_result[i].name;
        var address = global_result[i].location.address1;
        console.log(address);
        $(".activity" + i).append(address +'<br>'+name);
        // var newText = oldText + address +'<br>'+name
        // $(".activity").text(newText);
    }
}
function getFoodList(){

}
function displayFoodList(){

}

function updateWeather(city, weather, icon) {
    var $weather = $("#weather");
    var $city_name = $("<div>").text(city);
    var $city_weather = $("<div>").text(weather);
    var $image = "http://openweathermap.org/img/w/" + icon + ".png";
    console.log($image);
    var $weather_icon = $("<img>").attr("src",$image);
    console.log("weather: ",$city_weather,"city Name: ",$city_name,"weather icon: ", $weather_icon);
    $weather.append($city_name, $city_weather, $weather_icon);
}