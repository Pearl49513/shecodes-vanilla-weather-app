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
    minute = `0${mintues}`;
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
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let precipitationElement = document.querySelector("#precipitation");
  let dateElement = document.querySelector("#date");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].main;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

let weatherApiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${weatherApiKey}&units=metric`;

console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);
