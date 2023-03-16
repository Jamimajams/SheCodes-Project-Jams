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
}

function search(city) {
  let apiKey = `7ed26a6948c661d05fafe7355b41b2ec`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(weatherSearch);
}

function displayfahrenheitTemp(event) {
  event.preventDefault();
  // remove active class from celcius.
  celciusLink.classList.remove("active");
  // add active class to fahrenheit.
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temp");
  let fahrenheit = (celciusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheit);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  console.log(cityInput.value);
  search(cityInput.value);
}

function displayCelciusTemp(event) {
  event.preventDefault();
  // remove active class from fahrenheit.
  fahrenheitLink.classList.remove("active");
  // add active class to celcius.
  celciusLink.classList.add("active");
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celciusTemp);
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed", "Thu"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
              <div class="col-2">
                ${day}</div>
                <img
                  src="http://openweathermap.org/img/wn/04n@2x.png"
                  alt=""
                  id="forecastIcon"
                  width="42"
                />
                <div class="degrees">
                  <span class="highest">21º</span>
                  <span class="lowest"> 8º</span>
                </div>
              </div>`;
  });
  forecastElement.innerHTML = forecastHTML;
}

search("London");
displayForecast();

let fahrenheitLink = document.querySelector("#fahrenheitLink");
fahrenheitLink.addEventListener("click", displayfahrenheitTemp);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celciusLink = document.querySelector("#celciusLink");
celciusLink.addEventListener("click", displayCelciusTemp);
