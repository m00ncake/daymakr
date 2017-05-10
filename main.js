/**
 * Created by JTM on 5/10/17.
 */
var global_result;
$(document).ready(function() {
    $('.submit').click(function () {
        console.log('click initiated');
        $.ajax({
            method:'get',
            dataType: 'json',
            url: 'sampleData.json',
            success: function (response) {
                global_result = response;
                console.log('it worked');
                displayAcvtivtyList();

            },
            error:function(response){
                console.log('url wrong');
            }

        })
    })
});



function getLocation(){

}
function displayLocation() {

}
function getActivityList(){

}
function displayAcvtivtyList(){
    for(i=0; i<2; i++){
        var activity = global_result.businesses[0].image_url;
        $(".activity").css("background-image","url(" + activity + ")");
        var name = global_result.businesses[0].id;
        var address = global_result.businesses[0].location.address1;
        console.log(address);
        // var newText = oldText + address +'<br>'+name
        // $(".activity").text(newText);
    }
    $(".activity").append(address +'<br>'+name);
}
function getFoodList(){

}
function displayFoodList(){

}