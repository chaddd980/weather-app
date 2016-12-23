$(document).ready(function(){
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
          success: function(response) {
            description = response.weather[0].main;
            temperature_c = Math.round(getCelcius(response.main.temp));
            temperature_c_min = getCelcius(response.main.temp_min);
            temperature_c_max = getCelcius(response.main.temp_max);
            temperature_f = getFahrenheit(response.main.temp);
            temperature_f_min = getFahrenheit(response.main.temp_min);
            temperature_f_max = getFahrenheit(response.main.temp_max);
            country = response.sys.country;
            city = response.name;
            user_location = response.name;


            if (description.includes("Clear")) {
              $("body").addClass("clear green");
              $(".btn").addClass("green");
            } else if (description.includes("Clouds")) {
              $("body").addClass("clouds grey");
              $(".btn").addClass("grey");
            } else if (description.includes("Rain")) {
              $("body").addClass("rain yellow");
              $(".btn").addClass("yellow");
            } else if (description.includes("Drizzle")) {
              $("body").addClass("drizzle pink");
              $(".btn").addClass("pink");
            } else if (description.includes("Thunderstorm")) {
              $("body").addClass("thunderstorm white");
              $(".btn").addClass("white");
            } else if (description.includes("Snow")) {
              $("body").addClass("snow");
              $(".btn").addClass("black");
            } else if (description.includes("Mist")) {
              $("body").addClass("mist");
            }
            $(".location").append(city + ", " + country)
            $(".temp").append(temperature_c + "<button type='button' class='btn btn-link'>°C</button>");
            $("body").append(temperature_f);
            $(".description").append(description);
          }
        });
      }
    );
  }
  getWeatherInfo();
});
