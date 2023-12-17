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
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        cityName +
        "&appid=e7c4d3c5bf68207d8632346a6c99878f&units=metric"
    )
      // fetch(queryURL + cityName + "&appid=" + apiKey)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // console.log(data.list[0].weather[0].icon);//icon???
        // console.log(data.list[0].weather[0].main);//clouds
        // console.log(data.list[0].main.temp);
        // console.log(data.list[0].main.humidity);
        //console.log(data.list[0].wind.speed);
        // console.log(data.list[0].dt_txt);//date an hours
        //console.log(data.city.name);

        // console.log(data);
        const weatherIcon = $(".weather-icon");

        //Logic for weather icons
        const list = data.list;
        // console.log(list);
        for (let i = 0; i < list.length; i++) {
          const iconCode = list[i].weather[0].icon;
          const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
          //   console.log(iconCode);

          switch (iconCode) {
            case "01d":
              weatherIcon.attr("src", iconUrl);
              break;
            case "02d":
              weatherIcon.attr("src", iconUrl);
              break;
            case "03d":
              weatherIcon.attr("src", iconUrl);
              break;
            case "04d":
              weatherIcon.attr("src", iconUrl);
              break;
            case "09d":
              weatherIcon.attr("src", iconUrl);
            case "10d":
              weatherIcon.attr("src", iconUrl);
              break;
            case "11d":
              weatherIcon.attr("src", iconUrl);
              break;
            case "13d":
              weatherIcon.attr("src", iconUrl);
              break;
            case "50d":
              weatherIcon.attr("src", iconUrl);
              break;
            case "01n":
              weatherIcon.attr("src", iconUrl);
              break;
            case "02n":
              weatherIcon.attr("src", iconUrl);
              break;
            case "03n":
              weatherIcon.attr("src", iconUrl);
            case "04n":
              weatherIcon.attr("src", iconUrl);
              break;
            case "09n":
              weatherIcon.attr("src", iconUrl);
              break;
            case "10n":
              weatherIcon.attr("src", iconUrl);
              break;
            case "11n":
              weatherIcon.attr("src", iconUrl);
              break;
            case "13n":
              weatherIcon.attr("src", iconUrl);
              break;
            case "50n":
              weatherIcon.attr("src", iconUrl);
              break;
            default:
              weatherIcon.attr("src", "");
          }
        
          const card = $("<div>", { class: "wCard" });
          $("#forecast").append(card);

          card.append(`<p>Date: ${list[i].dt_txt}</p>`);
          card.append(`<img src="${iconUrl}" alt="Weather Icon">`);
          card.append(`<p>Temperature: ${list[i].main.temp}°C</p>`);
          card.append(`<p>Wind Speed: ${list[i].wind.speed} m/s</p>`);
          card.append(`<p>Humidity: ${list[i].main.humidity}%</p>`);
        }
      })
      .catch(function (error) {
        console.error("Error fetching weather data:", error);
      });
  }

  // Add class 'asideArea' and 'mainArea'
//   $(".col-lg-3").addClass("asideArea");
//   $(".col-lg-9").addClass("mainArea");
// });

//       .catch(function (error) {
//         console.error("Error fetching weather data:", error);
//       });
//   }

//   //add class asideArea and mainArea
//   $(".col-lg-3").addClass("asideArea");
//   $(".col-lg-9").addClass("mainArea");

//   //   Function to create weatherCard
//   function createWeatherCard(date, weatherIcon, temperature, wind, humidity) {
//     const card = $("<div>", { class: "wCard", text: "Tis is a card" });
//     // $(".card-area").append(card);
//     $("#forecast").append(card); ///???????? try
//     card.append(`<p>Date: ${date}</p>`);
//     card.append(`<img src="${weatherIcon}" alt="Weather Icon">`);
//     card.append(`<p>Temperature: ${temp}°C</p>`);
//     card.append(`<p>Wind Speed: ${speed} m/s</p>`);
//     card.append(`<p>Humidity: ${humidity}%</p>`);

//     return card;
//   }
//   createWeatherCard();
//   console.log(createWeatherCard);
 });
