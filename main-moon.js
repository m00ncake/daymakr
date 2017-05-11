/**
 * Created by JTM on 5/10/17.
 */

var map;
var markers = [];
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.74135, lng: -73.99802},
        zoom: 13
    });
    var locations = [
        {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
        {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
        {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
        {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
        {title: 'Tribeca Artsy Pad', location: {lat: 40.7195264, lng: -74.0089934}},
        {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
    ];
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






$(document).ready(function(){
    initMap();
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
    })

});

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