$(document).ready(function () {
  //OpenWeather API key and URL

  const apiKey = "e7c4d3c5bf68207d8632346a6c99878f";
  const queryURL = "api.openweathermap.org/data/2.5/forecast?q=";

  //Event listener for form

  $("#search-form").on("submit", function (event) {
    event.preventDefault();
    const cityName = $("#search-input").val().trim();
    getDataFromApi(cityName); // call getDataFromApi function
  });

  let city; //var to store current city

  // Function getDataFromApi

  function getDataFromApi(cityName) {
    $("#forecast").empty(); //Clear previous data

    if (!cityName) {
      cityName = "London";//Default
    }

    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        cityName +
        "&appid=e7c4d3c5bf68207d8632346a6c99878f&units=metric"
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        renderData(data); //Render data
        saveDataLocal(cityName, data); //Save to local storage
        createBtn(cityName); // Create history button
        // renderBtns(); //?????????????????????????
      })
      .catch(function (error) {
        console.error("Error data:", error);
      });
  }
  // Render data on the page

  function renderData(data) {
    const weatherIcon = $(".weather-icon");
    const list = data.list;

    for (let i = 0; i < list.length; i++) {
      const iconCode = list[i].weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      $(".weather-icon").attr("src", iconUrl);

      //Render today's data

      function renderToday() {
        const todaySection = $("#today");
        todaySection.empty();
        city = data.city.name;
        const todayFirst = $("<div>", { class: "today-first" });
        const todaySecond = $("<div>", { class: "today-second" });
        todaySection.append(todayFirst, todaySecond);

        todayFirst.append(`<h1>${city}</h1>`);
        todayFirst.append(`<p>${list[i].dt_txt}</p>`);
        todayFirst.append(`<img src="${iconUrl}" alt="Weather Icon">`);

        todaySecond.append(`<p>Temp: ${list[i].main.temp}°C</p>`);
        todaySecond.append(`<p>Wind: ${list[i].wind.speed} m/s</p>`);
        todaySecond.append(`<p>Humidity: ${list[i].main.humidity}%</p>`);
      }
      renderToday();

      // Render forecast

      function renderForecast() {
        const card = $("<div>", { class: "wCard" });
        $("#forecast").append(card);
        card.append(`<p> ${list[i].dt_txt}</p>`);
        card.append(`<img src="${iconUrl}" alt="Weather Icon">`);
        card.append(`<p>Temp: ${list[i].main.temp}°C</p>`);
        card.append(`<p>Wind: ${list[i].wind.speed} m/s</p>`);
        card.append(`<p>Humidity: ${list[i].main.humidity}%</p>`);
      }
      renderForecast();
    }
  }

  //  Save data to local storage

  function saveDataLocal(city, data) {
    localStorage.setItem(`${city}-data`, JSON.stringify(data));
  }

  // Create history buttons

  function createBtn(city) {
    var historyBtn = $("<button>");
    historyBtn.attr("id", "btn-" + city.toLowerCase());
    historyBtn.addClass("historyBtn");
    historyBtn.append(`${city}`);
    $("#history").prepend(historyBtn);
  }

  //History listener
  function historyListener() {
    $("#history").on("click", ".historyBtn", function (event) {
      event.preventDefault();
      var city = $(this).text();
      // getDataFromApi(city); //Get data from API
      getDataFromLocal(city);
    });
  }

  //Render buttons

  function renderBtns() {
    var storageKeys = Object.keys(localStorage);
    var uniqueCities = new Set();

    storageKeys.forEach(function (key) {
      if (key.includes("-data")) {
        const city = key.replace("-data", "");
        uniqueCities.add(city);
      }
    });

    // Clear existing buttons

    $("#history").empty();

    uniqueCities.forEach(function (city) {
      createBtn(city);
    });

    const lastCity = storageKeys[storageKeys.length - 1].replace("-data", "");
    getDataFromLocal(lastCity);
  }

  function getDataFromLocal(city) {
    if (!city) {
      var history = Object.keys(localStorage).filter((itemInStorage) =>
        itemInStorage.includes("-data")
      );
      city =
        history.length > 0
          ? history[history.length - 1].replace("-data", "")
          : "London";
    }
    try {
      const savedData = localStorage.getItem(`${city}-data`);
      if (savedData) {
        const parseSavedData = JSON.parse(savedData);
        renderData(parseSavedData);
      } else {
        console.log("No data for", city);
        getDataFromApi(city);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  
  function titleDiv() {
    var newDiv = $("<div>").attr("id", "titleForecast");
    $("#today").after(newDiv);
    newDiv.text("5-Days Forecast");
  }

//set up initial page

  titleDiv();
  historyListener();
  renderBtns();
  getDataFromApi("London"); 
});
