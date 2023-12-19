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

// URL for API Call
    const queryURLForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;
    const queryURLWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

// API Fecth Call for User City Weather search
    fetch(queryURLWeather)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
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