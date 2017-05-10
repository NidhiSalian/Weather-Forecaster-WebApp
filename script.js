  function error() {
    $('#loc').append("Unable to retrieve your location");
  };


//get co-ords:
$.getJSON('http://ip-api.com/json', function(ipAPI) {
  var latitude = ipAPI.lat;
  var longitude = ipAPI.lon;
  $("#loc").html( ipAPI.city + ", " + ipAPI.country);
//find more data on the weather using co-ords:
  $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' +
    latitude + '&lon=' + longitude + '&APPID=2d4b956f8e46e95fa7a2b3599f5b439e', function(owinfo){
    $("#wtr").html(owinfo.weather[0].description);
    var wiconinfo = owinfo.weather[0].icon;
   var  wicons = { // ow.weather[0].icon to wi
                  // Daytime conditions
                  '01d': 'wi-day-sunny',
                  '02d': 'wi-day-sunny-overcast',
                  '03d': 'wi-day-cloudy',
                  '04d': 'wi-cloudy',
                  '09d': 'wi-day-sprinkle',
                  '10d': 'wi-day-rain',
                  '11d': 'wi-day-thunderstorm',
                  '13d': 'wi-day-snow',
                  '50d': 'wi-day-fog',

                  // Nightime conditions
                  '01n': 'wi-stars',
                  '02n': 'wi-night-partly-cloudy',
                  '03n': 'wi-night-cloudy',
                  '04n': 'wi-cloudy',
                  '09n': 'wi-night-sprinkle',
                  '10n': 'wi-night-rain',
                  '11n': 'wi-night-thunderstorm',
                  '13n': 'wi-night-snow',
                  '50n': 'wi-night-fog'
        };
    var wName = wiconinfo.split(' ').map(function(code) {
          var results = [];
          results.push(wicons[code]);
          return results.join('');
        });
        var wicon = wName[0];
   var tempf = Math.round(((((owinfo.main.temp - 273.15) * 1.8000) + 32) * 10) / 10).toFixed(0);
   var tempc = Math.round(owinfo.main.temp - 273.15);
          $('#weather-icons > i').addClass(wicon);

     $("#tmpf > span").empty().append(tempf);
    $("#tmpc > span").empty().append(tempc);
  });
  
$('button').click(function() {
$("#tmpf").toggle();
$("#tmpc").toggle();
 
});  
});

