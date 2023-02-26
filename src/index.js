let city = `Kampala`;
let apiKey = `7ed26a6948c661d05fafe7355b41b2ec`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

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
  let temperature = Math.round(Response.data.main.temp);
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
axios.get(apiUrl).then(weatherSearch);
