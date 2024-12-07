const API_KEY = "3e7b161b15cd2127dd602826d2543cee";

function fetchWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === "200") {
        displayWeather(data);
      } else {
        alert("City not found. Please try again.");
      }
    })
    .catch((error) => console.error("Error fetching weather data:", error));
}

function displayWeather(data) {
  var weatherCards = document.getElementById("weatherCards");
  weatherCards.innerHTML = ""; 


  var dailyForecast = [];
  var today = new Date().getDate();

  data.list.forEach((item) => {
    var forecastDate = new Date(item.dt_txt).getDate();
    if (
      forecastDate !== today &&
      !dailyForecast.some((forecast) => new Date(forecast.dt_txt).getDate() === forecastDate)
    ) {
      dailyForecast.push(item);
    }
  });

  var nextThreeDays = dailyForecast.slice(0, 3);


  nextThreeDays.forEach((day) => {
    var date = new Date(day.dt_txt).toDateString();
    var temperature = day.main.temp.toFixed(1);
    var description = day.weather[0].description;
    var wind = day.wind.speed;
    var humidity = day.main.humidity;

    var card = `
      <div class="card col-md-3 mx-2">
        <div class="card-body text-center">
          <h5>${date}</h5>
          <p><strong>${temperature}°C</strong></p>
          <p>${description}</p>
          <p>Wind: ${wind} m/s</p>
          <p>Humidity: ${humidity}%</p>
        </div>
      </div>
    `;
    weatherCards.innerHTML += card;
  });
}