// Variable initialized for User City Input
let cityName, newWeatherObject;
let topEl, date, currentDateEl2, weatherIconEl2, weatherDescriptEl2, tempEl2, windEl2, humidityEl2;
const cityArray = [];

// Day.js code to get current date
const now = dayjs();
const dateNow = now.format('DD/MM/YYYY');

newWeatherObject = JSON.parse(localStorage.getItem("weatherObject_" + cityName));

function getLocalStorage() {
    
    window.onload = function () {
              
        if (newWeatherObject) {
            console.log(newWeatherObject);
            $("#cityName").text(newWeatherObject.cityName);
                     
            $("#cityDate").text(newWeatherObject.cityDate);
    
            $("#today").append(newWeatherObject.cityIcon);
     
            $("#cityWeather").text(newWeatherObject.cityWeather);
     
            $("#cityTemp").text(newWeatherObject.cityTemp);
     
            $("#cityWind").text(newWeatherObject.cityWind);
    
            $("#cityHumidity").text(cityHumidity);
        }
         
      }
    
    }
getLocalStorage();

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
    const Drizzle = "bi bi-cloud-drizzle";

    let weatherIconEl;

// API Fecth Call for User City Weather search
    fetch(queryURLWeather)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

        // Creating Elements for the History data
            const historyCityEl = $("<button></button>").addClass("list-group-item list-group-item-action active").attr({ type: "button", id: "search-city", "data-city": data.name, "aria-current": "true" }).text(data.name);
            cityArray.push(data.name);

        // Creating Elements for the Weather data
            const cityEl = $("<h4></h4>").addClass("city").attr("id", "cityName").text(data.name);
            const currentDateEl = $("<h4></h4>").attr("id", "cityDate").text("(" + dateNow + ")");
            const weatherDescriptEl = $("<p></p>").attr("id", "cityWeather").text(data.weather[0].description);
            const tempEl = $("<p></p>").attr("id", "cityTemp").text("Temp: " + data.main.temp + " °C");
            const windEl = $("<p></p>").attr("id", "cityWind").text("Wind Speed: " + data.wind.speed + " m/s");
            const humidityEl = $("<p></p>").attr("id", "cityHumidity").text("Humidity: " + data.main.humidity + "%");
            if (data.weather[0].main === "Smoke") {
                weatherIconEl = $("<i></i>").addClass(Smoke).attr("id", "cityIcon");
            } else if (data.weather[0].main === "Rain") {
                weatherIconEl = $("<i></i>").addClass(Rain).attr("id", "cityIcon");
            } else if (data.weather[0].main === "Clear") {
                weatherIconEl = $("<i></i>").addClass(Clear).attr("id", "cityIcon");
            } else if (data.weather[0].main === "Drizzle") {
                weatherIconEl = $("<i></i>").addClass(Drizzle).attr("id", "cityIcon");
            } else {
                weatherIconEl = $("<i></i>").addClass(Clouds).attr("id", "cityIcon");
            }

            const weatherObject = {
                cityName: data.name,
                cityDate: "(" + dateNow + ")",
                cityIcon: weatherIconEl,
                cityWeather: data.weather[0].description,
                cityTemp: "Temp: " + data.main.temp + " °C",
                cityWind: "Wind Speed: " + data.wind.speed + " m/s",
                cityHumidity: "Humidity: " + data.main.humidity + "%"
            }

        // Set data in Local Storage
            localStorage.setItem("weatherObject_" + cityName, JSON.stringify(weatherObject))

            // Get data from Local Storage
            newWeatherObject = JSON.parse(localStorage.getItem("weatherObject_" + cityName));
            

            $("#today").append(cityEl, currentDateEl, weatherIconEl, weatherDescriptEl, tempEl, windEl, humidityEl);
            $("#history").append(historyCityEl);            

            // Code to empty search input box
            $("#search-input").val("");
            cityName = " ";
        })

// API Fecth Call for User City Weather Forecast search
        fetch(queryURLForecast)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data.list);
            topEl = $("<h4></h4>").attr("id", "topHeading").text("5-Day Forecast:");
            $("#forecast").append(topEl);
            
            $.each(data.list, function (i, value) {
                    date = dayjs(value.dt_txt).format('DD/MM/YYYY');
                    currentDateEl2 = $("<h5></h5>").addClass("card-title").attr("id", "forecastDate").text(date);
                    weatherDescriptEl2 = $("<p></p>").addClass("card-text").attr("id", "forecastWeather").text(value.weather[0].description);
                    tempEl2 = $("<p></p>").addClass("card-text").attr("id", "forecastTemp").text("Temp: " + value.main.temp + " °C");
                    windEl2 = $("<p></p>").addClass("card-text").attr("id", "forecastWind").text("Wind Speed: " + value.wind.speed + " m/s");
                humidityEl2 = $("<p></p>").addClass("card-text").attr("id", "forecastHumidity").text("Humidity: " + value.main.humidity + "%");
                
                if (value.weather[0].main === "Smoke") {
                    weatherIconEl2 = $("<i></i>").addClass(Smoke).attr("id", "forecastIcon");
                } else if (value.weather[0].main === "Rain") {
                    weatherIconEl2 = $("<i></i>").addClass(Rain).attr("id", "forecastIcon");
                } else if (value.weather[0].main === "Clear") {
                    weatherIconEl2 = $("<i></i>").addClass(Clear).attr("id", "forecastIcon");
                } else if (value.weather[0].main === "Drizzle") {
                    weatherIconEl = $("<i></i>").addClass(Drizzle).attr("id", "forecastIcon");
                } else {
                    weatherIconEl2 = $("<i></i>").addClass(Clouds).attr("id", "forecastIcon");
                }

               

                $("#forecast").append(currentDateEl2, weatherIconEl2, weatherDescriptEl2, tempEl2, windEl2, humidityEl2);
              });
        })
});