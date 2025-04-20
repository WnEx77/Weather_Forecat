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
                const weatherInfo = `
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
