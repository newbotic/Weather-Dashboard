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
     
        
        const weatherIcon = $(".weather-icon");
       
        //Logic for weather icons

        const list = data.list;
        for (let i = 0; i < list.length; i++) {
          const iconCode = list[i].weather[0].icon;
          const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

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
        
          
          
          // -----------------------------today
          
          const todaySection = $("#today");
          
          todaySection.empty();
          
          const city = data.city.name;
          
          const todayFirst= $("<div>", { class: "today-first" });
          const todaySecond = $('<div>', {class:"today-second" });
          todaySection.append(todayFirst, todaySecond);

          todayFirst.append(`<h1>${city}</h1>`);
          todayFirst.append(`<p>${list[i].dt_txt}</p>`);
          todayFirst.append(`<img src="${iconUrl}" alt="Weather Icon">`);

          todaySecond.append(`<p>Temp: ${list[i].main.temp}°C</p>`);
          todaySecond.append(`<p>Wind: ${list[i].wind.speed} m/s</p>`);
          todaySecond.append(`<p>Humidity: ${list[i].main.humidity}%</p>`);
          
          
          // ---------------------------today

          function createBtn(){

          
          var a = $('<button>');
          // a.addClass('historyBtn');
          // a.attr('data-name',`${city}`);
          // a.text(city);
          a.append(`${city}`);
          $('#history').append(a);
          }
          
          createBtn();
          
          
          
          // -----------------------------forecast
          
          const card = $("<div>", { class: "wCard" });
          $("#forecast").append(card);
          card.append(`<p> ${list[i].dt_txt}</p>`);
          card.append(`<img src="${iconUrl}" alt="Weather Icon">`);
          card.append(`<p>Temp: ${list[i].main.temp}°C</p>`);
          card.append(`<p>Wind: ${list[i].wind.speed} m/s</p>`);
          card.append(`<p>Humidity: ${list[i].main.humidity}%</p>`);
        }
      })
      .catch(function (error) {
        console.error("Error fetching weather data:", error);
      });
  }



// ------------------------------------------forecast









// // --------------------------------footer
//   $(document).ready(function () {
//     const footer = $("<footer>");
  
//     footer.addClass("footer");
  
//     const copyrightText = "&copy; 2023 Newbotic. All rights reserved.";
//     const copyright = $("<p>").html(copyrightText);
  
//     footer.append(copyright);
  
//     $("body").append(footer);
//   });
//   // footer--------------------------create 








// ------------------aside


// aside section----------------------




// ---------------------------------aside








});

















