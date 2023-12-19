$(document).ready(function () {
  //OpenWeather API key and URL

  const apiKey = "e7c4d3c5bf68207d8632346a6c99878f";
  const queryURL = "api.openweathermap.org/data/2.5/forecast?q=";

  //Event listener for form

  $("#search-form").on("submit", function (event) {
    event.preventDefault();
    const cityName = $("#search-input").val().trim();

    // call getDataFromApi function

    getDataFromApi(cityName);
  });

  let city; //var to store current city

  // Function getDataFromApi

  function getDataFromApi(cityName) {
    $("#forecast").empty(); //Clear previous data

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
        saveDataLocal(city, data); //Save to local storage
        createBtn(city); //Create a history button
      })
      .catch(function (error) {
        console.error("Error data:", error);
      });
  }

  // Function render data on the page

  function renderData(data) {
    const weatherIcon = $(".weather-icon");
    const list = data.list;
    for (let i = 0; i < list.length; i++) {
      const iconCode = list[i].weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      $(".weather-icon").attr("src", iconUrl);

      // Render today's data

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
    // localStorage.setItem(`${city}-data`, JSON.stringify(data));
    localStorage.setItem(`${city}`, JSON.stringify(data));

  }

// Create history buttons

  function createBtn(city) {
    //add conditional logic to render btn
    var historyBtn = $("<button>");
    historyBtn.attr("id", "btn-" + city.toLowerCase());
    historyBtn.addClass("historyBtn");
    historyBtn.append(`${city}`);
    $("#history").prepend(historyBtn);
  }

  function historyListener(){
    
  
  $("#history").on("click", ".historyBtn", function (event) {
    event.preventDefault();
    var city = $(this).text();
    // getDataFromApi(city); ????? changed
    getDataFromLocal(city); 

  });
  };

historyListener();

  function renderBtns() {
    // First we get all the items in local storage and get the keys. 
    //Then filter the list by removing any that do not contain "-data"
    var history = Object.keys(localStorage).filter((itemInStorage) =>
      itemInStorage.includes("-data")
    );
    history.forEach((city) => createBtn(city.replace("-data", "")));
  }

  renderBtns();



// --function getDataFromLocal--  end

function getDataFromLocal(city) {
  // console.log(Object.keys(localStorage));
  if (!city) {
    var history = Object.keys(localStorage).filter((itemInStorage) =>
      itemInStorage.includes("-data")
    );
    city = history[history.length - 1];
  }
  try {
    const savedData = localStorage.getItem(city);
    if (savedData) {
      const parseSavedData = JSON.parse(savedData);
      // console.log(parseSavedData);
      renderData(parseSavedData);
    } else {
      console.log("No data ", city);
      return null;
    }
  } catch (error) {
    // console.error('Error :', error);
    return null;
  }
}
getDataFromLocal();


function titleDiv() {
  var newDiv = $("<div>").attr("id", "titleForecast");

  $("#today").after(newDiv);
  newDiv.text("5-Days Forecast");
}
titleDiv();


});

