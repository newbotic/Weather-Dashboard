$(document).ready(function(){
    
    const apiKey = "e7c4d3c5bf68207d8632346a6c99878f";
    const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=";
    
    const cityName = $('#search-input').val().trim();

$('#search-form').on('submit',function(event){
    event.preventDefault();
    // console.log(event.target);
    
getDataFromApi (cityName);
});

// ---------------------------

var cardDiv = $('<div>');
cardDiv.addClass('card')//use addClass
// cardDiv.text('Hello');
$('#forecast').append(cardDiv);
// function getDataFromApi(cityName){
//     // fetch("https://api.openweathermap.org/data/2.5/forecast?q=london&appid=e7c4d3c5bf68207d8632346a6c99878f&units=metric")
//     fetch(queryURL + cityName + `&appid=${apiKey}`)
    
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function(data) {
//         console.log(data);
//     })
    
// }
//add class asideArea and mainArea
$('.col-lg-3').addClass('asideArea');
$('.col-lg-9').addClass('mainArea');



// Create the first new div
// var firstNewDiv = $('<div>', {
//     class: 'newDiv',
//     text: 'This is the first new div'
//   });

//   // Create the second new div
//   var secondNewDiv = $('<div>', {
//     class: 'newDiv',
//     text: 'This is the second new div'
//   });

//   // Append the new divs to the existing mainArea
//   $('#today').append(firstNewDiv);
//   $('#forecast').append( secondNewDiv);
});










