const tempraturefield = document.querySelector('.temp h1');
const locationfield = document.querySelector('.location-time h2');  
const timefield = document.querySelector('.location-time h4');
const conditionfield = document.querySelector('.condition h4'); 
const searchbar = document.querySelector('.search-bar');
const conditionIconElement = document.querySelector('.weather-icon');
const countryElement= document.querySelector('.country');
const latlonElement = document.querySelector('.lat-lon');
const form = document.querySelector('form');

form.addEventListener('submit', search);

let target = 'Mumbai';

const fetchWeather = async (targetlocation) => {
    let url = `http://api.weatherapi.com/v1/current.json?key=40471e2c1e7f4c998c6133903252108&q=${targetlocation}&aqi=no`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);

        let locationName = data.location.name;
        let time = data.location.localtime;
        let tempc = data.current.temp_c;
        let condition = data.current.condition.text;
        let conditionIcon = data.current.condition.icon;
        let country = data.location.country
        let lat = data.location.lat
        let lon = data.location.lon

        updateWeather(locationName, time, tempc, condition, conditionIcon,country,lat,lon);
    }
    catch (err) {
        console.error("Error fetching weather data:", err);
    }
};

function updateWeather(locationName, time, tempc, condition, conditionIcon, country, lat,lon) {
    const currentDate = time.split(' ')[0];
    const currentTime = time.split(' ')[1];
    let currentDay = new Date(currentDate).toLocaleDateString('en-US', { weekday: 'long' });

    locationfield.textContent = locationName;
    timefield.textContent = `${currentTime} - ${currentDay} ${currentDate}`;
    tempraturefield.textContent = tempc;
    conditionfield.textContent = condition;
    conditionIconElement.src = conditionIcon;
    conditionIconElement.alt = condition;
    countryElement.textContent = `${country} `;
    latlonElement.innerHTML = 'Latitude : ' + lat + '<br>Longitude : ' + lon;
    searchbar.value = locationName; // Update search bar with the current location
}

function search(e) {
    e.preventDefault();
    target = searchbar.value;
    fetchWeather(target);
}

fetchWeather(target);
