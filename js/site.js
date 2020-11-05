$(document).ready(function(){ 
    $("#searchForm").submit(function(event){

        //validate input
        if($.trim($('#inputCityOrZip').val()) == ''){
            $("#formErrorMsg").show();
            event.preventDefault();
         } else {
            $("#formErrorMsg").hide();
            event.preventDefault();
            let forecastType = $('input[name="forecastType"]:checked').val()
           // console.log(forecastType);
            loadData(forecastType);
         }
    }); 
});

function loadData(forecastType) {

    let $cityName = $('#cityName');
    let $countryName = $('#countryName');
    let $sunriseTime = $('#sunriseTime');
    let $sunsetTime = $('#sunsetTime');
    let $temperature = $('#temperature');
    let $feelsLike = $('#feelsLike');
    let $humidity = $('#humidity');
    let $pressure = $('#pressure');
    let $windSpeed = $('#windSpeed');
    let $windDirection = $('#windDirection');
    let $cloudsDescription = $('#cloudsDescription');
    let $visibility = $('#visibility');
    let $lastUpdated = $('#lastUpdated');

    let inputCityOrZipVal = $('#inputCityOrZip').val();

    //determine from value if zip or 
    let isZip = /^\d+$/.test(inputCityOrZipVal);
    let urlParam = '';


    if (isZip){
        urlParam = "zip=" + inputCityOrZipVal;
    } else {
        urlParam = "city=" + inputCityOrZipVal;
    }

    let quickenWeatherURL = 'https://interviews.apps.qlmortgageservices.com/api/v2/weather?' + urlParam;

    $.ajax({
        url: quickenWeatherURL,
        method: 'GET'
    }).done(function(result) {

        $cityName.append(result.name);
        $countryName.append(result.sys.country);
        $sunriseTime.append(getTime(result.sys.sunrise));
        $sunsetTime.append(getTime(result.sys.sunset));
        $temperature.append(result.main.temp);
        $feelsLike.append(result.main.feels_like);
        $humidity.append(result.main.humidity);
        $pressure.append(result.main.pressure);
        $windSpeed.append(result.wind.speed);
        $windDirection.append(result.wind.deg);
        $cloudsDescription.append(result.weather[0].description);
        $visibility.append(result.visibility);
        $lastUpdated.append(getTime(Date.now()));
        $("#weatherSummary").show();
    }).fail(function(err) { 
        $("#formErrorMsg").show();
    });


}

function getTime(string) {
    var date = new Date(string);
    var hours = date.getHours();
    if (hours < 10) {
      hours = '0' + hours;
    }
    var minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    var time = hours + ':' + minutes;
    return time;
}

