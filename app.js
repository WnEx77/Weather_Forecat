const apiKey = 'eb2aef429f5b4535afbfae2e9823dc76'; // Replace this with your OpenWeatherMap API key
const apiKey = 'YOUR_API_KEY_HERE'; // Replace this with your OpenWeatherMap API key
let selectedLanguage = 'en';  // Default language is English

// Function to handle language change
function changeLanguage() {
    selectedLanguage = document.getElementById('language').value;
}

// Fetch weather data
function getWeather() {
    const city = document.getElementById('city').value;
    const weatherOutput = document.getElementById('weather-output');
    
    if (city === "") {
        weatherOutput.innerHTML = `<p class="error">${getTranslation('enterCity')}</p>`;
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=${selectedLanguage}`)
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
                    <p><strong>${getTranslation('temperature')}:</strong> ${data.main.temp}°C</p>
                    <p><strong>${getTranslation('weather')}:</strong> ${data.weather[0].description}</p>
                    <p><strong>${getTranslation('humidity')}:</strong> ${data.main.humidity}%</p>
                    <p><strong>${getTranslation('windSpeed')}:</strong> ${data.wind.speed} m/s</p>
                `;
                weatherOutput.innerHTML = weatherInfo;
            }
        })
        .catch(error => {
            weatherOutput.innerHTML = `<p class="error">${getTranslation('errorFetching')}</p>`;
        });
}

// Get appropriate weather icon
function getWeatherIcon(iconCode) {
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

// Get translation for labels based on selected language
function getTranslation(key) {
    const translations = {
        en: {
            enterCity: "Please enter a city name.",
            temperature: "Temperature",
            weather: "Weather",
            humidity: "Humidity",
            windSpeed: "Wind Speed",
            errorFetching: "Error fetching weather data."
        },
        ar: {
            enterCity: "يرجى إدخال اسم المدينة.",
            temperature: "درجة الحرارة",
            weather: "الطقس",
            humidity: "الرطوبة",
            windSpeed: "سرعة الرياح",
            errorFetching: "خطأ في جلب بيانات الطقس."
        }
    };

    return translations[selectedLanguage][key] || key;
}



    return icons[iconCode] || "🌍"; // Default icon
}
