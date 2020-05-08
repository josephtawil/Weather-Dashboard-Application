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
                console.log(response);
                var cityname = response.name;
                var citytemp = response.main.temp;
                var cityhumidity = response.main.humidity;
                var windspeed = response.wind.speed;
                var weathericon = response.weather[0].icon;
                var date = moment().format("MMMM Do YYYY");
                var item = JSON.parse(localStorage.getItem("city")).city;

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
                }



                function createCard() {
                    $("#cardbody").text("");
                    $("#cardbody").append(`<h1>${cityname} <h4>${date}</h4> <img src="https://openweathermap.org/img/wn/${weathericon}@2x.png"></img> </h1>`);
                    $("#cardbody").append(`<p>Temperature: ${citytemp} &#8457;</p>`);
                    $("#cardbody").append(`<p>Humidity: ${cityhumidity}%</p>`);
                    $("#cardbody").append(`<p>Wind Speed: ${windspeed} MPH</p>`)
                };
            });
    });

});