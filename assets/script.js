var cityEl = document.getElementById("enter-city");
var searchEl = document.getElementById("search-button");
var nameEl = document.getElementById("city-name");
var currentPicEl = document.getElementById("current-pic");
var currentTempEl = document.getElementById("temperature");
var currentHumidityEl = document.getElementById("humidity");
var currentWindEl = document.getElementById("wind-speed");
var historyEl = document.getElementById("history");
var fiveDayEl = document.getElementById("fiveday-header");
var todayWeatherEl = document.getElementById("today-weather");
var weatherContainer = document.getElementById("weather")
var forecastEl = document.getElementById("forecast")
var APIkey = "5238afc3f846ceadbc3c137f84bf5d39"

function loadHistory() { //make this run on document.ready
    // load the search history from local storage
    if (window.localStorage.getItem('searches')) {
        var previousSearches = JSON.parse(window.localStorage.getItem('searches'))
    } else {
        var previousSearches = [];
    }

    // populate buttons for each previous search
    previousSearches.forEach(function (search) {
        // create a button
        // set a listener to call geocodeCall(search)
        //append to #history
    })
}

searchEl.addEventListener("click", function () {
    console.log(cityEl.value);
    todayWeatherEl.textContent = ""
    geocodeCall(cityEl.value)
    if (window.localStorage.getItem('searches')) {
        var previousSearches = JSON.parse(window.localStorage.getItem('searches'))
    } else {
        var previousSearches = [];
    }
    previousSearches.push(cityEl.value);
    window.localStorage.setItem('searches', JSON.stringify(previousSearches))
})

function geocodeCall(cityValue) {
    var queryURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityValue}&limit=5&appid=${APIkey}`

    fiveDayEl.classList.remove("d-none");
    todayWeatherEl.classList.remove("d-none");

    var citySearch = cityEl.value
    var cityh2 = document.createElement("h2")
    cityh2.textContent = citySearch
    todayWeatherEl.append(citySearch)

    fetch(queryURL)
        .then(response=> response.json())
        .then(data=> {
            console.log(data);
            currentWeatherCall(data[0].lat, data[0].lon)
            forecastCall(data[0].lat, data[0].lon)
        });
}

function currentWeatherCall(lat, lon) {
    var queryURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${APIkey}`

    fetch(queryURL)
        .then(response=> response.json())
        .then(data=> {
            console.log(data);

            var temp = document.createElement("h3")
                temp.setAttribute("class", "current-styling")
                temp.textContent = "Temp: " + data.current.temp + "\u00B0 F"
            var icon = document.createElement("img") 
                icon.setAttribute("class", "icon-styling")   
                icon.src = "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png"
            var humidity = document.createElement("h3")
                humidity.setAttribute("class", "current-styling")
                humidity.textContent = "Humidity: " + data.current.humidity + "%"
            var wind = document.createElement("h3")
                wind.setAttribute("class", "current-styling")
                wind.textContent = "Wind: " + data.current.wind_speed + " mph"
            var date = document.createElement("h3")
                date.setAttribute("class", "current-styling")
                date.textContent = moment.unix(data.current.dt).format("MM/DD/YY")




            document.getElementById("today-weather").append(date, icon, temp, humidity, wind);
        });
}

function forecastCall(lat, lon) {
    var queryURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${APIkey}`

    fetch(queryURL)
        .then(response=> response.json())
        .then(data=> {
            console.log(data.daily[0]);
        forecastEl.textContent = ""
            for(var i=0; i < data.daily.length - 3; i++){
                console.log(data.daily[i]);
                var forecastCard = document.createElement("div")
                    forecastCard.setAttribute("class", "card")
                    var temp = document.createElement("h4")
                        temp.setAttribute("class", "forecast-style")
                        temp.textContent = "Temp: " + data.daily[i].temp.day + "\u00B0 F"
                    var icon = document.createElement("img")    
                        icon.setAttribute("class", "icon-styling")
                        icon.src = "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png"
                    var humidity = document.createElement("h4")
                        humidity.setAttribute("class", "forecast-style")
                        humidity.textContent = "Humidity: " + data.daily[i].humidity + "%"
                    var wind = document.createElement("h4")
                        wind.setAttribute("class", "forecast-style")
                        wind.textContent = "Wind: " + data.daily[i].wind_speed + " mph"








                forecastCard.append(temp, icon, humidity, wind)
             forecastEl.append(forecastCard)   
            }
        });
}

// Dynamically add the searched city to search history
// Display the searched item again when clicked on



document.addEventListener('DOMContentLoaded', function () {
    loadHistory();
}, false);

