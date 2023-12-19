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
    const queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;
    const queryURL1 = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
});