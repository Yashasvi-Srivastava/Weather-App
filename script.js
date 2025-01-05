const inputBox = document.querySelector('.input-box');
const searchBtn = document.querySelector('button');  // Select button directly
const weatherImg = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

const locationNotFound = document.querySelector('.location-not-found');
const weatherBody = document.querySelector('.weather-body');

async function checkWeather(city) {
    const apiKey = "62d0448451fa3d4bda7eb52c7da4ab66"; // My API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const weatherData = await response.json();

        if (weatherData.cod !== 200) {
            console.error("Error:", weatherData.message);
            locationNotFound.style.display = "block";
            weatherBody.style.display = "none";
            return;
        }

        locationNotFound.style.display = "none";
        weatherBody.style.display = "block";

        temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}°C`;
        description.innerHTML = weatherData.weather[0].description;
        humidity.innerHTML = `${weatherData.main.humidity}%`;
        windSpeed.innerHTML = `${weatherData.wind.speed}Km/H`;

        switch (weatherData.weather[0].main) {
            case 'Clouds':
                weatherImg.src = "cloud.png";
                break;
            case 'Clear':
                weatherImg.src = "clear.png";
                break;
            case 'Rain':
                weatherImg.src = "rain.png";
                break;
            case 'Mist':
                weatherImg.src = "mist.png";
                break;
            case 'Snow':
                weatherImg.src = "snow.png";
                break;
            default:
                weatherImg.src = "default.png";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        locationNotFound.style.display = "block";
        weatherBody.style.display = "none";
    }
}

searchBtn.addEventListener('click', () => {
    const city = inputBox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        alert("Please enter a city name!");
    }
});
