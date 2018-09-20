let http = require('http');
let latitude = 39.963692
let longitude = -75.139946
let secretKey = 'b2de6e9cb127bd3babbe5c8696a790fb'
let url = `https://api.darksky.net/forecast/${secretKey}/${latitude},${longitude}`

    http.createServer((request, response) => {
        let req = require('request')
        req(url, (error, res, data) => {
            
            let body = JSON.parse(data)
            response.writeHeader(200, {"Content-Type": "text/html"});
            var utcSeconds = body.currently.time;
            var localDate = new Date(0);
            localDate.setUTCSeconds(utcSeconds);
            response.end(`<!doctype html>
            <html>
                <head>
                <title>Weather API</title>
            
                <meta charset="utf-8">
                <meta http-equiv="Content-type" content="text/html; charset=utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">   
                </head>
            
                <body>
                    <h1>Weather information for Philadelphia</h1>
                    <ul>
                        <li><strong>Recorded Time(timezone): </strong><span>${localDate}(${body.timezone})</span></li>
                        <li><strong>Location Cordinates: </strong><span>${body.latitude}(lat.) and ${body.longitude}(long.)</span></li>
                        <li><strong>Skies: </strong><span>${body.currently.summary}</span></li>
                        <li><strong>Precipitation Probability: </strong><span>${body.currently.precipIntensity}</span></li>
                        <li><strong>Precipitation Intensity: </strong><span>${body.currently.precipProbability}</span></li>
                        <li><strong>Temperature: </strong><span>${body.currently.temperature}</span></li>
                        <li><strong>Humidity: </strong><span>${body.currently.humidity}</span></li>
                        <li><strong>Pressure: </strong><span>${body.currently.pressure}</span></li>
                        <li><strong>Wind Speed: </strong><span>${body.currently.windspeed}</span></li>
                        <li><strong>Visibility: </strong><span>${body.currently.visibility}</span></li>
                    </ul>
                </body>
            </html>`)
        })
    }).listen(8091);
    