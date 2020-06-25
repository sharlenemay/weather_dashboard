var cities =[];
        displayStoredCities();

        function displayWeatherInfo(){

            var APIKey = "c36869fbb722f6deaf474e51d75975b3";
            var place = $(this).attr("data-name");
            var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + place + "&appid=" + APIKey + "&units=imperial";

            $.ajax({
                url:queryURL,
                method: "GET"
            }).then (function(response) {
                console.log(response);

                // variables for weather information

                var location = response.name;
                var country = response.sys.country;
                var temperature = response.main.temp;
                var humidity = response.main.humidity;
                var wind = response.wind.speed;
                var unixTime = response.dt
                var time = new Date(unixTime*1000);
                var today = time.toDateString();

                // Retrieve city name
                    // console.log(location);
                    // console.log(country);
                // Retrieve temp
                    // console.log(temperature);
                // Retrieve humidity
                    // console.log(humidity);
                // Retrieve date
                    // console.log(today);

                // Retrieve wind speed
                    // console.log(wind + " MPH");
                
                // GET UV Index
                var latitude = response.coord.lat;
                var longitude = response.coord.lon;
                // console.log(latitude, longitude);

                var UVURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?appid=" + APIKey + "&lat=" + latitude + "&lon=" + longitude;
                $.ajax({
                    url: UVURL,
                    method: "GET"
                    }).then (function(UV) {
                        // console.log(UV);

                        var UVindex = UV[0].value;
                        // console.log(UVindex);

                        $(".UV-index").text("UV Index: " + UVindex);
                    });
                
                // Create divs to hold weather info
                var cityTitle = `<h1> ${location}, ${country} (${today}) <img src="http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png"></img></h1>`
                $(".city").html(cityTitle);
                // $(".city").text(location + ", " + country + " (" + today +")");
                $(".temperature").text("Temperature: " + temperature + " °F");
                $(".humidity").text("Humidity: " + humidity);
                $(".wind").text(wind + " MPH");
                
                // 5 Day Forecast
    
                var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + place + "&appid=" + APIKey + "&units=imperial";
    
                $.ajax({
                    url: forecastURL,
                    method: "GET"
                }).then (function (forecast){
                    console.log(forecast);
                    // console.log(forecast.list[1].main.temp);
                    // console.log(forecast.list[9].main.temp);
                    // console.log(forecast.list[17].main.temp);
                    // console.log(forecast.list[25].main.temp);
                    // console.log(forecast.list[33].main.temp);

                    // Retrieve date for next 5 days
                    var firstDayDT = forecast.list[1].dt
                    var firstDayTime = new Date(firstDayDT*1000);
                    var firstDay = firstDayTime.toDateString();
                    // console.log(firstDay);

                    var secondDayDT = forecast.list[9].dt
                    var secondDayTime = new Date(secondDayDT*1000);
                    var secondDay = secondDayTime.toDateString();
                    // console.log(secondDay);

                    var thirdDayDT = forecast.list[17].dt
                    var thirdDayTime = new Date(thirdDayDT*1000);
                    var thirdDay = thirdDayTime.toDateString();
                    // console.log(thirdDay);

                    var fourthDayDT = forecast.list[25].dt
                    var fourthDayTime = new Date(fourthDayDT*1000);
                    var fourthDay = fourthDayTime.toDateString();
                    // console.log(fourthDay);

                    var fifthDayDT = forecast.list[33].dt
                    var fifthDayTime = new Date(fifthDayDT*1000);
                    var fifthDay = fifthDayTime.toDateString();
                    // console.log(fifthDay);

                    // Retrieve icon for next 5 days
                    var day1icon = forecast.list[1].weather[0].icon;
                    var day2icon = forecast.list[9].weather[0].icon;
                    var day3icon = forecast.list[17].weather[0].icon;
                    var day4icon = forecast.list[25].weather[0].icon;
                    var day5icon = forecast.list[33].weather[0].icon;

                    // Retrieve temp for next 5 days
                    var firstDayTemp = forecast.list[1].main.temp;
                    var secondDayTemp = forecast.list[9].main.temp;
                    var thirdDayTemp = forecast.list[17].main.temp;
                    var fourthDayTemp = forecast.list[25].main.temp;
                    var fifthDayTemp = forecast.list[33].main.temp;

                    // Retrieve humidity for next 5 days
                    var firstDayHumidity = forecast.list[1].main.humidity;
                    var secondDayHumidity = forecast.list[9].main.humidity;
                    var thirdDayHumidity = forecast.list[17].main.humidity;
                    var fourthDayHumidity = forecast.list[25].main.humidity;
                    var fifthDayHumidity = forecast.list[33].main.humidity;

                    // Append weather variables to forecast divs
                    var firstDateIcon = `<center><img src="http://openweathermap.org/img/wn/${day1icon}@2x.png" width="50"></img>`
                    var dayOne = `<h4>${firstDay}</h4> ${firstDateIcon} <br> 
                    Temperature: ${firstDayTemp} °F <br> 
                    Humidity: ${firstDayHumidity}`;
                    $(".first-day").html(dayOne);


                    var secondDateIcon = `<center><img src="http://openweathermap.org/img/wn/${day2icon}@2x.png" width="50"></img>`
                    var dayTwo = `<h4>${secondDay}</h4> ${secondDateIcon} <br> 
                    Temperature: ${secondDayTemp} °F <br> 
                    Humidity: ${secondDayHumidity}`;
                    $(".second-day").html(dayTwo);

                    var thirdDateIcon = `<center><img src="http://openweathermap.org/img/wn/${day3icon}@2x.png" width="50"></img>`
                    var dayThree = `<h4>${thirdDay}</h4> ${thirdDateIcon} <br> 
                    Temperature: ${thirdDayTemp} °F <br> 
                    Humidity: ${thirdDayHumidity}`;
                    $(".third-day").html(dayThree);

                    var fourthDateIcon = `<center><img src="http://openweathermap.org/img/wn/${day4icon}@2x.png" width="50"></img>`
                    var dayFour = `<h4>${fourthDay}</h4> ${fourthDateIcon} <br> 
                    Temperature: ${fourthDayTemp} °F <br> 
                    Humidity: ${fourthDayHumidity}`;
                    $(".fourth-day").html(dayFour);

                    var fifthDateIcon = `<center><img src="http://openweathermap.org/img/wn/${day5icon}@2x.png" width="50"></img>`
                    var dayFive = `<h4>${fifthDay}</h4> ${fifthDateIcon} <br> 
                    Temperature: ${fifthDayTemp} °F <br> 
                    Humidity: ${fifthDayHumidity}`;
                    $(".fifth-day").html(dayFive);

                })

            })



        }

        // add city to array
        function renderCityButtons(){

            $(".previous-cities").empty();

            for (var i =0; i<cities.length; i++){

                // create button div for each city added
                var cityButton = $("<button>");
                cityButton.addClass("city-name");
                cityButton.attr("data-name",cities[i]);
                cityButton.text(cities[i]);

                // append city buttons to "previous-cities" div class
                $(".previous-cities").append(cityButton);
                $(".previous-cities").append("<br>");

                storeCities();

            }
        }

        // Get from local storage previously searched cities
        function displayStoredCities(){
            var storedCities = JSON.parse(localStorage.getItem("city"))

            if (storedCities !== null){
                cities = storedCities;
            }
        }

        // Save to Local Storage
        function storeCities(){
            localStorage.setItem("city", JSON.stringify(cities));
        }

        $("#add-place").on("click",function(event){
            event.preventDefault();
            // grab city name from input
            var city = $("#place-input").val().trim();

            if (city == ""){
                return
            }

            // add city to array
            cities.push(city);

            renderCityButtons();

        });

        $(document).on("click","#add-place",displayWeatherInfo);
        $(document).on("click",".city-name",displayWeatherInfo);

        renderCityButtons();