$(document).ready(function () {
    var apikey = "4ad952e4b391b4310845e1ccc7314888";

    $("#button").on("click", function () {
        var input = $("#text").val();
        var list = document.querySelector("#list");
        $.ajax(
            {
                type: "GET",
                url: `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=imperial&appid=${apikey}`,
                dataType: "json",

            }).then(function (response) {
                console.log(response.coord);
                var cityname = response.name;
                var citytemp = response.main.temp;
                var cityhumidity = response.main.humidity;
                var windspeed = response.wind.speed;
                var weathericon = response.weather[0].icon;
                var date = moment().format("MMMM Do YYYY");
                var tommorow = moment().add(1, 'days').format("MMMM Do YYYY");
                var secondday = moment().add(2, 'days').format("MMMM Do YYYY");
                var thirdday = moment().add(3, 'days').format("MMMM Do YYYY");
                var item = JSON.parse(localStorage.getItem("city")).city;
                var latitude = response.coord.lat;
                var longitude = response.coord.lon;
                // $("#list").append(`<li class="list-group-item">${cityname}</li>`)
                if (cityname === item) {
                    $("#list").prepend(`<div class="alert alert-danger" id="alert" role="alert">
                        The city is already in the history table! </div>`);
                    var alert = document.querySelector("#alert");
                    setInterval(function () {
                        // alert.innerHTML = ""; would only remove the text from the danger alert box
                        //remove() would delete the object completely
                        alert.remove();
                    }, 2000);
                }
                else {
                    $("#list").append(`<li class="list-group-item">${cityname}</li>`);
                    localStorage.setItem("city", JSON.stringify({ city: cityname }));
                    createCard();
                    createTommorowCard();
                    createSecondDayCard();
                    createThirdDayCard();
                }

                $.ajax(
                    {
                        type: "GET",
                        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&exclude=hourly,minutely&appid=${apikey}`,
                        dataType: "json",
                    }).then(function (response) {
                        console.log(response.current);
                        var tommorrowtemp = response.daily[0].temp.day;
                        var tommorrowweathericon = response.daily[0].weather[0].icon;
                        var tommorrowhumidity = response.daily[0].humidity;
                        var seconddaytemp = response.daily[1].temp.day;
                        var seconddayweathericon = response.daily[1].weather[0].icon;
                        var seconddayhumidity = response.daily[1].humidity;
                        var thirddaytemp = response.daily[2].temp.day;
                        var thirddayweathericon = response.daily[2].weather[0].icon;
                        var thirddayhumidity = response.daily[2].humidity;
                        var uvi = response.current.uvi;

                        if ($("#cardbody").innerHTML != "") {
                            addtoCard();
                        }
                        addtoTommorrowCard();
                        addtoSecondDayCard();
                        addtoThirdDayCard();
                        function addtoCard() {
                            if (uvi > 7) {
                                $("#cardbody").append(`UV Index <p class="alert alert-danger" style="width:100px" role="alert">${uvi}</p>`);
                            }
                            else if (uvi <= 7 && uvi >= 5) {
                                $("#cardbody").append(`UV Index <p class="alert alert-success"style="width:100px" role="alert">${uvi}</p>`);
                            }
                            else {
                                $("#cardbody").append(`UV Index <p class="alert alert-warning" style="width:100px"role="alert">${uvi}</p>`);
                            }
                        };
                        function addtoTommorrowCard() {
                            $("#firstday").text("");
                            createTommorowCard();
                            $("#firstday").append(`<img src="https://openweathermap.org/img/wn/${tommorrowweathericon}@2x.png"></img>`);
                            $("#firstday").append(`<p style="color:white">Temp: ${tommorrowtemp} &#8457;</p>`);
                            $("#firstday").append(`<p style = "color:white">Humidity: ${tommorrowhumidity}% </p>`)

                        };
                        function addtoSecondDayCard() {
                            $("#secondday").text("");
                            createSecondDayCard();
                            $("#secondday").append(`<img src="https://openweathermap.org/img/wn/${seconddayweathericon}@2x.png"></img>`);
                            $("#secondday").append(`<p style="color:white">Temp: ${seconddaytemp} &#8457;</p>`);
                            $("#secondday").append(`<p style = "color:white">Humidity: ${seconddayhumidity}% </p>`)

                        };
                        function addtoThirdDayCard() {
                            $("#thirdday").text("");
                            createThirdDayCard();
                            $("#thirdday").append(`<img src="https://openweathermap.org/img/wn/${thirddayweathericon}@2x.png"></img>`);
                            $("#thirdday").append(`<p style="color:white">Temp: ${thirddaytemp} &#8457;</p>`);
                            $("#thirdday").append(`<p style = "color:white">Humidity: ${thirddayhumidity}% </p>`)

                        };
                    });

                //Functions That Creates Cards
                function createCard() {
                    $("#cardbody").text("");
                    $("#cardbody").append(`<h1>${cityname} <h4>${date}</h4> <img src="https://openweathermap.org/img/wn/${weathericon}@2x.png"></img> </h1>`);
                    $("#cardbody").append(`<p>Temperature: ${citytemp} &#8457;</p>`);
                    $("#cardbody").append(`<p>Humidity: ${cityhumidity}%</p>`);
                    $("#cardbody").append(`<p>Wind Speed: ${windspeed} MPH</p>`)
                };
                function createTommorowCard() {

                    $("#firstday").append(`<h5 style = "color:white">${tommorow}</h5>`);
                };
                function createSecondDayCard() {
                    $("#secondday").append(`<h5 style = "color:white">${secondday}</h5>`);
                };
                function createThirdDayCard() {
                    $("#thirdday").append(`<h5 style = "color:white">${thirdday}</h5>`);
                };
            });
    });

});