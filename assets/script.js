var cityEl = document.getElementById("enter-city");
var searchEl = document.getElementById("search-button");
var nameEl = document.getElementById("city-name");
var currentPicEl = document.getElementById("current-pic");
var currentTempEl = document.getElementById("temperature");
var currentHumidityEl = document.getElementById("humidity");
var currentWindEl = document.getElementById("wind-speed");
var historyEl = document.getElementById("history");
var fivedayEl = document.getElementById("fiveday-header");
var todayweatherEl = document.getElementById("today-weather");

var APIkey = "5238afc3f846ceadbc3c137f84bf5d39"
// var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

searchEl.addEventListener("click", function () {
    console.log(cityEl.value);
    // plug in geocode api call using city value as the query string
    geocodeCall(cityEl.value)
})

function geocodeCall(cityValue) {
    var queryURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityValue}&limit=5&appid=${APIkey}`

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
                temp.setAttribute("class", "current styling")
                temp.textContent = "temp: " + data.current.temp + " degrees F"
            var humidity = document.createElement("h3")
                humidity.textContent = "humidity: " + data.current.humidity + "%"
            var wind = document.createElement("h3")
                wind.textContent = "wind: " + data.current.wind_speed + " mph"
            var date = document.createElement("h3")
                date.textContent = moment.unix(data.current.dt).format("MM/DD/YY")




            document.getElementById("today-weather").append(date, temp, humidity, wind);
        });
}

function forecastCall(lat, lon) {
    var queryURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${APIkey}`

    fetch(queryURL)
        .then(response=> response.json())
        .then(data=> {
            console.log(data.daily[0]);

            for(var i=0; i < data.daily.length - 3; i++){
                console.log(data.daily[i]);
                var forecastCard = document.createElement("div")
                    forecastCard.setAttribute("class", "card")
                    var temp = document.createElement("h4")
                        temp.setAttribute("class", "forecast-style")
                        temp.textContent = "temp: " + data.daily[i].temp.day + " degrees F"
                    var icon = document.createElement("img")    
                        icon.textContent = data.daily[i].weather.icon
                    var humidity = document.createElement("h4")
                        humidity.setAttribute("class", "forecast-style")
                        humidity.textContent = "humidity: " + data.daily[i].humidity + "%"
                    var wind = document.createElement("h4")
                        wind.setAttribute("class", "forecast-style")
                        wind.textContent = "wind: " + data.daily[i].wind_speed + " mph"








                forecastCard.append(temp, humidity, wind)
             document.getElementById("forecast").append(forecastCard)   
            }
        });
}

// Icons according to weather

// Dynamically add the searched city to search history
// Display the searched item again when clicked on




