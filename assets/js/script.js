$(document).ready(function () {
  const apiKey = "e7c4d3c5bf68207d8632346a6c99878f";
  const queryURL = "api.openweathermap.org/data/2.5/forecast?q=";

  $("#search-form").on("submit", function (event) {
    event.preventDefault();
    const cityName = $("#search-input").val().trim();

    getDataFromApi(cityName);
  });

  let city;
// let list;

// Function getDataFromApi  start
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
        renderData(data)
        saveDataLocal(city, data);//--------------------------

        createBtn(city);//---------------------------
      })
      .catch(function (error) {
        console.error("Error fetching weather data:", error);
      });
  }

// Function getDataFromApi  end

  // Function render data start

function renderData(data){
  const weatherIcon = $(".weather-icon");

  //Logic for weather icons

  const list = data.list;

  for (let i = 0; i < list.length; i++) {
    const iconCode = list[i].weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    $(".weather-icon").attr("src", iconUrl);



    // -----------------------------today

    const todaySection = $("#today");

    todaySection.empty();

    // const city = data.city.name;?????

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

    // ---------------------------today

    // -----------------------------forecast

    const card = $("<div>", { class: "wCard" });
    $("#forecast").append(card);
    card.append(`<p> ${list[i].dt_txt}</p>`);
    card.append(`<img src="${iconUrl}" alt="Weather Icon">`);
    card.append(`<p>Temp: ${list[i].main.temp}°C</p>`);
    card.append(`<p>Wind: ${list[i].wind.speed} m/s</p>`);
    card.append(`<p>Humidity: ${list[i].main.humidity}%</p>`);
  }

}
// Function render data end




//  Function save list to local storage start

function saveDataLocal(city, data) {
  localStorage.setItem(`${city}-data`, JSON.stringify(data));
}

//  Function save list to local storage end




  // ------------------------------------------forecast

  // function writeForecastTitle(){
  //   var divForecastTitle = $('<div>');
  //   var forecastTitle = $('<h2>').text('5-Days Forecast');
  //   divForecastTitle.append(forecastTitle);
  //   $('#forecast').prepend(divForecastTitle);
  // }
  // writeForecastTitle();

  // -------------------------historyButtons

  function createBtn(city) {

 //add conditional logic to render btn
    var historyBtn = $("<button>");
    historyBtn.attr("id", "btn-" + city.toLowerCase());
    historyBtn.addClass("historyBtn");
    // console.log(city);
    historyBtn.append(`${city}`);
    $("#history").prepend(historyBtn);
  }


  
  
  
  
  $("#history").on("click", ".historyBtn", function(event) {
    event.preventDefault();
    var city = $(this).text();
    getDataFromApi(city) 
  });
  
  function renderBtns(){
    // First we get all the items in local storage and get the keys. Then filter the list by removing any that do not contain "-data"
    var history = Object.keys(localStorage).filter(itemInStorage => itemInStorage.includes("-data"))
    // console.log(history)
    history.forEach(city => createBtn(city.replace("-data","")))
  }
  
  renderBtns()
// ????????????????????no data for Paris

  // var clickedBtnId = $(this).attr("id");
  // console.log("Button  ID:", clickedBtnId);


  // var city = $(this).attr("id").replace("btn-", "");
  
  // var cityData = getDataFromLocal(`${city}-data`);

  // var cityData = getDataFromLocal(city);
  // console.log("Data for", city, ":", cityData);


})

// -----------------retrieve data from local storage

  
// --function getDataFromLocal--  end

function getDataFromLocal(city) {
  console.log(Object.keys(localStorage))
  if(!city) {
    var history = Object.keys(localStorage).filter(itemInStorage => itemInStorage.includes("-data"))
    city = history[history.length - 1]
  }
  try {
    const savedData = localStorage.getItem(city);
    if (savedData) {
      const parseSavedData = JSON.parse(savedData);
      console.log(parseSavedData);
      renderData(parseSavedData);
    } else {
      console.log('No data ', city);
      return null;
    }
  } catch (error) {
    console.error('Error :', error);
    return null;
  }
}
getDataFromLocal();

// ---function getDataFromLocal--  end
  


// event listener delegated

// function buttonCliked(){

//   $('.list-group').on('click', function() {
//     console.log('clicked!');
  
// })

// }
// buttonCliked();


function titleDiv(){

  var newDiv = $("<div>").attr("id", "titleForecast");
  
  $("#today").after(newDiv);
  newDiv.text('5-Days Forecast');

}
titleDiv();



// function clearLocalStorage() {
//   // Clear the local storage
//   localStorage.clear();
  
//   alert('Local storage has been cleared.');
// }
// clearLocalStorage()

    // });
  // });
  
  













    
