const apiKey = 'eb2aef429f5b4535afbfae2e9823dc76'; // Replace this with your OpenWeatherMap API key

function getWeather() {
    const city = document.getElementById('city').value;
    const weatherOutput = document.getElementById('weather-output');
    
    if (city === "") {
        weatherOutput.innerHTML = `<p class="error">Please enter a city name.</p>`;
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                weatherOutput.innerHTML = `<p class="error">${data.message}</p>`;
            } else {
                const iconCode = data.weather[0].icon;
                const weatherIcon = getWeatherIcon(iconCode);
                
                const weatherInfo = `
                    <div class="weather-icon">${weatherIcon}</div>
                    <h2>${data.name}, ${data.sys.country}</h2>
                    <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
                    <p><strong>Weather:</strong> ${data.weather[0].description}</p>
                    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
                `;
                weatherOutput.innerHTML = weatherInfo;
            }
        })
        .catch(error => {
            weatherOutput.innerHTML = `<p class="error">Error fetching weather data.</p>`;
        });
}

function getWeatherIcon(iconCode) {
    // Map OpenWeatherMap icon codes to emoji or Unicode characters
    const icons = {
        "01d": "☀️", // clear sky
        "01n": "🌙", // clear sky night
        "02d": "🌤️", // few clouds
        "02n": "🌙", // few clouds night
        "03d": "☁️", // scattered clouds
        "03n": "☁️", // scattered clouds night
        "04d": "☁️", // broken clouds
        "04n": "☁️", // broken clouds night
        "09d": "🌧️", // shower rain
        "09n": "🌧️", // shower rain night
        "10d": "🌦️", // rain
        "10n": "🌧️", // rain night
        "11d": "⛈️", // thunderstorm
        "11n": "⛈️", // thunderstorm night
        "13d": "❄️", // snow
        "13n": "❄️", // snow night
        "50d": "🌫️", // mist
        "50n": "🌫️"  // mist night
    };

    return icons[iconCode] || "🌍"; // Default icon
}
