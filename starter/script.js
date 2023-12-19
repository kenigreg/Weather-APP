// Variable initialized for User City Input
let cityName

// Day.js code to get current date
const now = dayjs();
const dateNow = now.format('DD/MM/YYYY');

// Event Listener to get User input for City
$("#search-input").on("keyup", function (e) {
    e.preventDefault();
    cityName = $("#search-input").val();
    return cityName;    
});

//Event Listener on the search button for City and API Call
$("#search-button").on("click", function (event) {
    event.preventDefault();

// Code to empty data for Current Weather and Forecast on Each API Call
    $("#today").empty();
    $("#forecast").empty();

// URL for API Call
    const queryURLForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;
    const queryURLWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

//Bootstrap Icon Variables
    const Clouds = "bi bi-cloud";
    const Rain = "bi bi-cloud-rain";
    const Clear = "bi bi-sun";
    const Smoke = "bi bi-cloud-haze-fill";

    let weatherIconEl;

// API Fecth Call for User City Weather search
    fetch(queryURLWeather)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

        // Creating Elements for the History data
            const historyCityEl = $("<button></button>").addClass("list-group-item list-group-item-action active").attr({ type: "button", id: "search-city", "aria-current": "true" }).text(data.name);

        // Creating Elements for the Weather data
            const cityEl = $("<h4></h4>").addClass("city").attr("id", "cityName").text(data.name);
            const currentDateEl = $("<h4></h4>").attr("id", "cityName").text("(" + dateNow + ")");
            const weatherDescriptEl = $("<p></p>").attr("id", "cityName").text(data.weather[0].description);
            const tempEl = $("<p></p>").text("Temp: " + data.main.temp + " °C");
            const windEl = $("<p></p>").text("Wind Speed: " + data.wind.speed + " m/s");
            const humidityEl = $("<p></p>").text("Humidity: " + data.main.humidity + "%");
            if (data.weather[0].main === "Smoke") {
                weatherIconEl = $("<i></i>").addClass(Smoke).attr("id", "cityName");
            } else if (data.weather[0].main === "Rain") {
                weatherIconEl = $("<i></i>").addClass(Rain).attr("id", "cityName");
            } else if (data.weather[0].main === "Clear") {
                weatherIconEl = $("<i></i>").addClass(Clear).attr("id", "cityName");
            } else {
                weatherIconEl = $("<i></i>").addClass(Clouds).attr("id", "cityName");
            }

            $("#today").append(cityEl, currentDateEl, weatherIconEl, weatherDescriptEl, tempEl, windEl, humidityEl);
            $("#history").append(historyCityEl);

            // Code to empty search input box
            $("#search-input").val("");

        })

// API Fecth Call for User City Weather Forecast search
        fetch(queryURLForecast)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
});