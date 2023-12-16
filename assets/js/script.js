$(document).ready(function () {
  const apiKey = "e7c4d3c5bf68207d8632346a6c99878f";
  const queryURL = "api.openweathermap.org/data/2.5/forecast?q="; //{city name}&appid={API key}

  $("#search-form").on("submit", function (event) {
    event.preventDefault();
    // console.log(event.target);
    const cityName = $("#search-input").val().trim();

    getDataFromApi(cityName);
  });

  // ---------------------------

//   var cardDiv = $("<div>");
//   cardDiv.addClass("card-area"); //use addClass
//   // cardDiv.text('Hello');
//   $("#forecast").append(cardDiv);

  function getDataFromApi(cityName) {
      fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityName +"&appid=e7c4d3c5bf68207d8632346a6c99878f&units=metric")
    // fetch(queryURL + cityName + "&appid=" + apiKey)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data.city.name);
      });
  }
  //add class asideArea and mainArea
  $(".col-lg-3").addClass("asideArea");
  $(".col-lg-9").addClass("mainArea");

  // Function to create weatherCard
  //     function createWeatherCard(date, weatherIcon, temperature, wind, humidity) {
  //   const card = $("<div>" , {class:'wCard', text:'Tis is a card'});
  //   $(".card-area").append(card);

  //   card.append(`<p>Date: ${date}</p>`);
  //   card.append(`<img src="${weatherIcon}" alt="Weather Icon">`);
  //   card.append(`<p>Temperature: ${temperature}°C</p>`);
  //   card.append(`<p>Wind Speed: ${windSpeed} m/s</p>`);
  //   card.append(`<p>Humidity: ${humidity}%</p>`);

  //   return card;
  //     }
  //     createWeatherCard(10,10,20,30);
  // console.log(createWeatherCard);
});
