$(document).ready(function () {
  const apiKey = "e7c4d3c5bf68207d8632346a6c99878f";
  const queryURL = "api.openweathermap.org/data/2.5/forecast?q="; 

  $("#search-form").on("submit", function (event) {
    event.preventDefault();
    const cityName = $("#search-input").val().trim();

    getDataFromApi(cityName);
  });


  function getDataFromApi(cityName) {

    $("#forecast").empty();

    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        cityName +
        "&appid=e7c4d3c5bf68207d8632346a6c99878f&units=metric"
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
     
        // console.log(data.list[0].weather[0].icon);//icon
        // console.log(data.list[0].weather[0].main);//clouds
        // console.log(data.list[0].main.temp);
        // console.log(data.list[0].main.humidity);
        //console.log(data.list[0].wind.speed);
        // console.log(data.list[0].dt_txt);//date an hours
        //console.log(data.city.name);
        // console.log(data);
        
        const weatherIcon = $(".weather-icon");
        // const todaySection = $("#today");
       
        //Logic for weather icons
        const list = data.list;
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


  // Today section------------------------------------------



const todaySection = $("#today");
const city = data.city.name;
const date = list[0].dt_txt;
const iconCode = list[0].weather[0].icon;
const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
const temperature = list[0].main.temp;
const windSpeed = list[0].wind.speed;
const humidity = list[0].main.humidity;
console.log

// Clear existing content in #today section
todaySection.empty();

// Append dynamically generated content
todaySection.append(`<h2>${city}</h2>`);
todaySection.append(`<p>Date: ${date}</p>`);
todaySection.append(`<img src="${iconUrl}" alt="Weather Icon">`);
todaySection.append(`<p>Temperature: ${temperature}°C</p>`);
todaySection.append(`<p>Wind Speed: ${windSpeed} m/s</p>`);
todaySection.append(`<p>Humidity: ${humidity}%</p>`);








 });







