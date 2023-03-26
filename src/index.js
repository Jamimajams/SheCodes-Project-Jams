function formatDate(timestamp) {
  let now = new Date(timestamp);
  console.log(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  console.log(day);

  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  console.log(hour);
  let minutues = now.getMinutes();
  if (minutues < 10) {
    minutues = `0${minutues}`;
  }

  return `${day} ${hour}:${minutues}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function getForecast(coordinates) {
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  apiKey = `ca5af28648d86b7925348bb9fb85cd3a`;
  apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);

  axios.get(apiUrl).then(displayForecast);
}

function weatherSearch(Response) {
  console.log(Response.data);
  celciusTemp = Response.data.main.temp;

  let temperature = Math.round(celciusTemp);
  let updateTemp = document.querySelector("#temp");
  updateTemp.innerHTML = temperature;

  let description = Response.data.weather[0].description;
  let updateDescription = document.querySelector("#description");
  updateDescription.innerHTML = description;

  let city = Response.data.name;
  let updateCity = document.querySelector("#city");
  updateCity.innerHTML = city;

  let humitidy = Math.round(Response.data.main.humidity);
  let updateHumidity = document.querySelector("#humidity");
  updateHumidity.innerHTML = `Humidity: ${humitidy}%`;

  let wind = Response.data.wind.speed;
  let updateWind = document.querySelector("#wind");
  updateWind.innerHTML = `Wind: ${wind}km/h`;

  let icon = Response.data.weather[0].icon;
  console.log(icon);
  let updateIcon = document.querySelector("#icon");
  updateIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  updateIcon.setAttribute("alt", `${description}`);

  let updateDate = document.querySelector("#day-time");
  updateDate.innerHTML = `last updated: ${formatDate(Response.data.dt * 1000)}`;

  console.log(Response.data.coord);

  getForecast(Response.data.coord);
}

function search(city) {
  let apiKey = `cb78420e8ec5a6d8b28a4fbc28ac2f07`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(weatherSearch);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  console.log(cityInput.value);
  search(cityInput.value);
}

function displayForecast(Response) {
  let forecast = Response.data.daily;
  console.log(forecast);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col-2">
              <div class="weather-forecast-day">
                ${formatDay(forecastDay.dt)}
                </div>
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  id="forecastIcon"
                />
                <div class="degrees">
                  <span class="highest">${Math.round(
                    forecastDay.temp.max
                  )}º</span>
                  <span class="lowest">${Math.round(
                    forecastDay.temp.min
                  )}º</span>
                </div>
              </div>`;
    }
  });
  forecastHTML = forecastHTML + "</div>";
  forecastElement.innerHTML = forecastHTML;
}

search("London");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
