var cityEl = document.getElementById("enter-city");
var searchEl = document.getElementById("search-button");
var nameEl = document.getElementById("city-name");
var currentPicEl = document.getElementById("current-pic");
var currentTempEl = document.getElementById("temperature");
var currentHumidityEl = document.getElementById("humidity");
var currentWindEl = document.getElementById("wind-speed");
var fivedayEl = document.getElementById("fiveday-header");
var todayweatherEl = document.getElementById("today-weather");

var APIkey = "5238afc3f846ceadbc3c137f84bf5d39"
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

// Fetch current weather from API upon user inputting city
    // Apply response to the todayweatherEl and remove the display none
        // Parse the response to display:
            // city (date)
            // icon according to weather
            // Temp
            // Humidity
            // Wind Speed

// Fetch 5 Day Forecast from API upon user inputting city





