let apiKey = `7ed26a6948c661d05fafe7355b41b2ec`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Kampala&appid=${apiKey}&units=metric`;

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
}
axios.get(apiUrl).then(weatherSearch);
