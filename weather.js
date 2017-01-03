$(document).ready(function(){
  jQuery.ajaxPrefilter(function(options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
  });

  function getCelcius(kelvin){
    return kelvin - 273.15;
  };

  function getFahrenheit(kelvin) {
    return ((kelvin * (9/5)) - 459.67)
  };

  var lat = '';
  var long = '';
  function weatherCoordsRequest() {
    var deferred = $.Deferred();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        deferred.resolve(position);
      });
      return deferred.promise();
    };
  }

  function getWeatherInfo() {
    var getWeatherCoords = weatherCoordsRequest();
    getWeatherCoords.then(

      function(result) {
        $.ajax({
          url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=784ef7d52b04b55508638eff3590484a',
          complete: function(){
            $('#loading').hide();
          },
          success: function(response) {
            description = response.weather[0].main;
            temperature_c = Math.round(getCelcius(response.main.temp));
            temperature_c_min = getCelcius(response.main.temp_min);
            temperature_c_max = getCelcius(response.main.temp_max);
            temperature_f = Math.round(getFahrenheit(response.main.temp));
            temperature_f_min = getFahrenheit(response.main.temp_min);
            temperature_f_max = getFahrenheit(response.main.temp_max);
            country = response.sys.country;
            city = response.name;
            user_location = response.name;


            if (description.includes("Clear")) {
              $("body").addClass("clear green");
            } else if (description.includes("Clouds")) {
              $("body").addClass("clouds grey");
            } else if (description.includes("Rain")) {
              $("body").addClass("rain yellow");
            } else if (description.includes("Drizzle")) {
              $("body").addClass("drizzle pink");
            } else if (description.includes("Thunderstorm")) {
              $("body").addClass("thunderstorm white");
            } else if (description.includes("Snow")) {
              $("body").addClass("snow");
            } else if (description.includes("Mist")) {
              $("body").addClass("mist");
            }
            $(".location").append(city + ", " + country);
            $(".temp").append("<p class='celcius'>" + temperature_c + "<button type='button' class='btn btn-link cel'>°C</button></p>");
            $(".temp").append("<p class='fahren'>" + temperature_f + "<button type='button' class='btn btn-link fahr'>°F</button></p>");
            $(".fahren").hide();
            $(".description").append(description);
          }
        });
      }
    );
  }
  getWeatherInfo();
  $(document).on('click', '.btn', function() {
    $(".fahren").toggle();
    $(".celcius").toggle();
  });
});
