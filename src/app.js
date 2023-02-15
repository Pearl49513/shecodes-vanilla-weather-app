//Display time
function formatDate(timestamp) {
  //calculate the date
  let date = new Date(timestamp);
  //Format hours
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  //Format mintues
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
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
  //Return Date
  return `${day} ${hour}:${minute}`;
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
  let weatherIconElement = document.querySelector("#weather-icon");

  celsTemp = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].main;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIconElement.setAttribute("alt", response.data.weather[0].main);
}

//Detects input value of search engine
function searchCity(city) {
  //Weather API Key and URL
  let weatherApiKey = "88724523008dc9e1be18f6eb6a959b67";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`;
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
  let temperatureElement = document.querySelector("#temperature");
  let fahrTemp = (celsTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrTemp);
  //Remove activation of celsius
  celsLink.classList.remove("active");
  fahrLink.classList.add("active");
}

//Activates Celsius Temperature
function displayCelsTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsTemp);
  //Remove activation of fahrenheit
  fahrLink.classList.remove("active");
  celsLink.classList.add("active");
}

//Unit Switch Fahrenheit
let celsTemp = null;
let fahrLink = document.querySelector("#fahr-link");
fahrLink.addEventListener("click", displayFahrTemp);

//Unit Switch Celsius
let celsLink = document.querySelector("#cels-link");
celsLink.addEventListener("click", displayCelsTemp);

//Search City Event
let citySearch = document.querySelector("#search-form");
citySearch.addEventListener("submit", submitCityEvent);
searchCity("New York");

//test
