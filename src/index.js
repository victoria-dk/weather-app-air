// Current date and time:

let now = new Date();

let currentDateTime = document.querySelector("#date");

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let currentDay = days[now.getDay()];
let currentMonth = months[now.getMonth()];
let currentYear = now.getFullYear();
let currentDate = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

date.innerHTML = `${currentDay}, ${currentDate} ${currentMonth} ${currentYear}, ${hours}:${minutes}`;

//Display temperature in Celsius, add a link to convert it to Fahrenheit:
function convertToFarenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = "46";
}

let farenheitLink = document.querySelector("#farenheit");
farenheitLink.addEventListener("click", convertToFarenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let newTemperature = document.querySelector(".temperature");
  newTemperature.innerHTML = "8";
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);

//API - when a user searches for a city (example: New York),
// it should display the name of the city on the result page and the current temperature of the city:

function displayCurrentWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "87429fdbf593621029427a484995b880";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrentWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "87429fdbf593621029427a484995b880";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayCurrentWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

// Feature #2
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector(
  "#current-geolocation-button"
);
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Copenhagen");
