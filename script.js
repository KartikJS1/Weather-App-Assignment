// API Key (Replace with your API key)
const apiKey = 'a324378e99550b9cb203d178bf7b33de';

// DOM Elements
const locationInput = document.getElementById('locationInput');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const unitToggle = document.getElementById('unitToggle');
const weatherDisplay = document.getElementById('weatherDisplay');

// Event listeners
getWeatherBtn.addEventListener('click', getWeather);
unitToggle.addEventListener('change', getWeather);

// Get weather data from the API
async function getWeather() {
    const location = locationInput.value;
    const unit = unitToggle.value;

    try {
        // Fetch weather data from the API
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=${apiKey}`);
        const data = await response.json();

        // Check if the location exists
        if (data.cod === "404") {
            throw new Error("Location not found.");
        }

        // Display weather data
        const weatherHTML = `
            <h2>Weather in ${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp} °${unit === 'metric' ? 'C' : 'F'}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
            <p>Weather: ${data.weather[0].description}</p>
        `;
        weatherDisplay.innerHTML = weatherHTML;
    } catch (error) {
        // Handle errors
        weatherDisplay.innerHTML = `<p>${error.message}</p>`;
    }
}

// Call getWeather when the page loads (optional)
getWeather();

// Event listener for the "Use My Location" button
const geolocationBtn = document.getElementById('geolocationBtn');

geolocationBtn.addEventListener('click', () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                // Fetch weather data based on geolocation
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`);
                const data = await response.json();

                // Display weather data (similar to the getWeather function)
                // ...
            } catch (error) {
                // Handle errors
                // ...
            }
        });
    } else {
        alert("Geolocation is not supported by your browser.");
    }
});
