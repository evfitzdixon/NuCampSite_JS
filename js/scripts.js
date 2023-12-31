
require('dotenv').config();

document.addEventListener('DOMContentLoaded', (event) => {
  fetchWeather();
});


console.log('javascript connected!');
    
const carousel = new bootstrap.Carousel('#homeCarousel', {
    interval: 2000,
    pause: false
})
const carouselButton = document.getElementById('carouselButton');
const faIcon = document.getElementById('faButton');
carouselButton.addEventListener('click', function () {
    if (faIcon.classList.contains('fa-pause')) {
        faIcon.classList.remove('fa-pause');
        faIcon.classList.add('fa-play');
        carousel.pause();
    } else {
        faIcon.classList.remove('fa-play');
        faIcon.classList.add('fa-pause');
        carousel.cycle();
    }
})


async function fetchWeather() {
    const apiKey = process.env.OPEN_WEATHER_API_KEY;
    const city = "Toronto";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log("Full JSON Response:", data);
        displayWeather(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Call the fetchWeather function to execute it
// fetchWeather();


function displayWeather(data) {
    let temperature = data.main.temp;
    let description = data.weather[0].description;
    let iconCode = data.weather[0].icon;

    let weatherIcon = document.createElement('img');
    weatherIcon.src = `https://openweathermap.org/img/w/${iconCode}.png`;
    weatherIcon.alt = description; 

    let weatherIconContainer = document.getElementById('weather-icon');

    while (weatherIconContainer.firstChild) {
        weatherIconContainer.removeChild(weatherIconContainer.firstChild);
    }
    weatherIconContainer.appendChild(weatherIcon);

    document.getElementById('weather-temp').textContent = `${temperature}\u00B0F`;

    document.getElementById('weather-description').textContent = description;
}

// const data = await response.json();
// console.log(data);
// displayWeather(data);



