
const express = require('express');
const https = require('https');
const bodyParser = require("body-parser");
const request = require('request');

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('view engine', 'ejs');
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  let city = req.body.CityName;

  request.get({
      url: 'https://api.api-ninjas.com/v1/city?name=' + city,
      headers: {
        'X-Api-Key': 'vIOblSpVOwH7v/xU72X3lA==9A8AsB1ax35qD49B'
      },
    },
    function(error, response, body) {
      try {

        // conveting body into json format
        let cityPopulation = JSON.parse(body);
        //intantiating intances
        let population1 = cityPopulation[0].population;
        let countryCode = cityPopulation[0].country;
        let latitude1 = cityPopulation[0].latitude;
        let longitude1 = cityPopulation[0].longitude;

        res.render("result", {
          cityName: city,
          cityName1: city,
          cityName2: city,
          population: population1,
          latitude: latitude1,
          longitude: longitude1,
          countryCode: countryCode
        });
        if (error) return console.error('Request failed:', error);
        else if (response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
        else console.log(body);
      } catch (error) {
        // handle the error here
        res.render("error", {city : city});

      }
    });


});

app.listen(process.env.PORT || 5100, function() {
  console.log("Your server is connected to port 5100.");
});
