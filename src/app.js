//Weather Search Function===========================================================================================
//Display Time and Date
function formatDate(timestamp) {
  //calculate the day
  let date = new Date(timestamp);

  //Format Weekdays
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  //Return Day
  return `${day}`;
}

function formatTime(timestamp) {
  //Calculcate the time
  let time = new Date(timestamp);

  //Format hours
  let hour = time.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  //Format mintues
  let minute = time.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  //Meridiem
  let meridiem = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  hour = hour ? hour : 12;

  return `${hour}:${minute} ${meridiem}`;
}

// Display Temperature, City, Weather Description, Humidity, Wind
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  //let precipitationElement = document.querySelector("#precipitation");
  let dateElement = document.querySelector("#date");
  let timeElement = document.querySelector("#time");
  let weatherIconElement = document.querySelector("#weather-icon");
  let weatherImageElement = document.querySelector("#current-Weather-Image");

  coords = response.data.coordinates;
  //celsTemp = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city.toUpperCase();
  //descriptionElement.innerHTML = response.data.condition[0].description;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  timeElement.innerHTML = `  ${formatTime(response.data.time * 1000)}`;

  //Changing Icons
  //let newIcon = response.data.condition[0].icon;
  let newIcon = response.data.condition.icon;
  weatherIconElement.setAttribute("src", `src/icons/${newIcon}.svg`);
  //weatherIconElement.setAttribute("alt", response.data.condition[0].description);
  weatherIconElement.setAttribute("alt", response.data.condition.description);

  //Changing Images
  //let newImage = response.data.condition[0].description;
  let newImage = response.data.condition.icon;
  weatherImageElement.setAttribute("src", `src/images/${newImage}.png`);

  getForecast(response.data.coordinates);
  //console.log(response.data.dt);
}

//Detects input value of search engine
function searchCity(city) {
  //Weather API Key and URL
  //let weatherApiKey = "88724523008dc9e1be18f6eb6a959b67";
  let weatherApiKey= "309754a3a46253td7b5d7a3o460bcacf";
  //let units = "metric";
  let apiUrl =`https://api.shecodes.io/weather/v1/current?query=${city}&key=${weatherApiKey}&units=${units}`;
  /*let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=${units}`;*/
  axios.get(apiUrl).then(displayTemperature);
}

//Activate Search button
function submitCityEvent(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  //User Input being Detected
  searchCity(cityInputElement.value);
}

//Activates Fahrenheit Temperature
function displayFahrTemp(event) {
  event.preventDefault();
  //Remove activation of celsius
  celsLink.classList.remove("active");
  fahrLink.classList.add("active");
  //document.getElementById("wind-unit").hidden = true;
  let windUnit = document.getElementById("wind-unit").innerHTML;
  document.getElementById("wind-unit").innerHTML = windUnit.replace(
    " km/h",
    " mph"
  );

  //newWindUnit.textContent = "mph";

  //let temperatureElement = document.querySelector("#temperature");
  //let fahrTemp = (celsTemp * 9) / 5 + 32;
  units = "imperial";
  //let weatherApiKey = "88724523008dc9e1be18f6eb6a959b67";
  let weatherApiKey = "309754a3a46253td7b5d7a3o460bcacf"
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${coords.longitude}&lat=${coords.latitude}&key=${weatherApiKey}&units=${units}`
  //let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${weatherApiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);
  //temperatureElement.innerHTML = Math.round(fahrTemp);
}

//Activates Celsius Temperature
function displayCelsTemp(event) {
  event.preventDefault();
  //Remove activation of fahrenheit
  fahrLink.classList.remove("active");
  celsLink.classList.add("active");
  //document.getElementById("wind-unit").hidden = false;
  let windUnit = document.getElementById("wind-unit").innerHTML;
  document.getElementById("wind-unit").innerHTML = windUnit.replace(
    " mph",
    " km/h"
  );
  //let temperatureElement = document.querySelector("#temperature");
  //temperatureElement.innerHTML = Math.round(celsTemp);
  units = "metric";
  //let weatherApiKey = "88724523008dc9e1be18f6eb6a959b67";
  //let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${weatherApiKey}&units=${units}`;
  let weatherApiKey ="309754a3a46253td7b5d7a3o460bcacf"
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${coords.latitude}&lon=${coords.longitude}&key=${weatherApiKey}&units=${units}`
  axios.get(apiUrl).then(displayTemperature);
}

//Weather Forecast Function================================================================================================================
//Displays the Six Day Forecast
function displayForecast(response) {
  let dailyForecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast-columns");
  let forecastHTML = `<div class="row">`;

  /*let iconHTML = `<img
                  src="http://openweathermap.org/img/wn/${newIcon}@2x.png"
                  alt=""
                  width="60"
                />`;*/

  dailyForecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      let maxi = Math.round(forecastDay.temperature.maximum);
      let mini = Math.round(forecastDay.temperature.minimum);
      //let newIcon = forecastDay.weather[0].icon;
      let newIcon = forecastDay.condition.icon;
      forecastHTML =
        forecastHTML +
        `    
              <!--Column for future date, icon, maximum temperature, and minimum temperature-->
              <div class="col-2 forecastDay">
                <div class="weather-forecast-date">${formatDay(
                  forecastDay.time
                )}</div>
                <img
                  src="src/icons/${newIcon}.svg"
                  alt=""
                  width="20"
                  class="forecast-IconColor"
                  
                />
                <div class="weather-forecast-temp">
                  <span class="weather-forecast-temp">${maxi}°</span>
                  <span class="weather-forecast-temp weather-forecast-temp-min">${mini}°</span>
                </div>
              </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//Gets the Six Week Forecast
function getForecast(coordinates) {
  //console.log(coordinates);
  //let weatherApiKey = "88724523008dc9e1be18f6eb6a959b67";
  //let units = "metric";
  //let apiForecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${weatherApiKey}&units=${units}`;
  let weatherApiKey = "309754a3a46253td7b5d7a3o460bcacf";
  let apiForecastUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coords.longitude}&lat=${coords.latitude}&key=${weatherApiKey}&units=${units}`;
  //console.log(apiForecastUrl);
  axios.get(apiForecastUrl).then(displayForecast);
}

//Day format for Forecast
function formatDay(timestamp) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  return days[day];
}

//Current Location Function===========================================================================================

function detectLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(positionLocated);
}

function positionLocated(position) {
  //let weatherApiKey = "88724523008dc9e1be18f6eb6a959b67";
  //let apiCurrentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${weatherApiKey}&units=${units}`;
  let weatherApiKey = "309754a3a46253td7b5d7a3o460bcacf";
  let apiCurrentUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${weatherApiKey}&units=${units}`;
  axios.get(apiCurrentUrl).then(displayTemperature);
  console.log(displayTemperature);
}

//Weather Search===================================================================================================
//Unit Switch
let units = "metric";
let coords = null;

//Fahrenheit
let fahrLink = document.querySelector("#fahr-link");
fahrLink.addEventListener("click", displayFahrTemp);

//Celsius
let celsLink = document.querySelector("#cels-link");
celsLink.addEventListener("click", displayCelsTemp);

//Search City Event
let citySearch = document.querySelector("#search-form");
citySearch.addEventListener("submit", submitCityEvent);
searchCity("New York");

//Activate Current Location

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", detectLocation);

//Weather Forecast================================================================================================
//let celsTemp = null;
