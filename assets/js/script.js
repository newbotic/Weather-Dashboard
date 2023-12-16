$(document).ready(function(){
const cityName = $('#search-input').val().trim();

const apiKey = "e7c4d3c5bf68207d8632346a6c99878f";
const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=";


$('#search-form').on('submit',function(event){
    event.preventDefault();
    // console.log(event.target);
    
getDataFromApi (cityName);
});
var cardDiv = $('<div>');
cardDiv.attr('class', 'card-body')//use addClass
// cardDiv.text('Hello');
$('#forecast').append(cardDiv);
function getDataFromApi(cityName){
    // fetch("https://api.openweathermap.org/data/2.5/forecast?q=london&appid=e7c4d3c5bf68207d8632346a6c99878f&units=metric")
    fetch(queryURL + cityName + `&appid=${apiKey}`)
    
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    })
    
}
//add class aside Area
$('.col-lg-3').addClass('asideArea');
$('.col-lg-9').addClass('mainArea');

// Create the weather structure dynamically




});





