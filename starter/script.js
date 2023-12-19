let cityName

const now = dayjs();
const dateNow = now.format('DD/MM/YYYY');

$("#search-input").on("keyup", function (e) {
    e.preventDefault();
    cityName = $("#search-input").val();

    console.log(cityName);
    return cityName;    
});