var express = require('express')
var app = express()
let req = require('request')

let latitude = 39.963692
let longitude = -75.139946
let secretKey = 'b2de6e9cb127bd3babbe5c8696a790fb'
let url = `https://api.darksky.net/forecast/${secretKey}/${latitude},${longitude}`

app.set('view engine', 'ejs')

req(url, (error, res, data) => {
  if (error) {
    throw error
  }
  let body = JSON.parse(data)

  var utcSeconds = body.currently.time
  var localDate = new Date(0)
  localDate.setUTCSeconds(utcSeconds)

  app.get('*', function (req, res) {
    res.render('../index.ejs', {
      records: [
        { label: 'Recorded Time(timezone)', value: `${localDate}(${body.timezone})` },
        { label: 'Location Cordinates', value: `${body.latitude}(lat.) and ${body.longitude}(long.)` },
        { label: 'Skies', value: `${body.currently.summary}` },
        { label: 'Precipitation Probability', value: `${body.currently.precipIntensity}` },
        { label: 'Precipitation Intensity', value: `${body.currently.precipProbability}` },
        { label: 'Temperature', value: `${body.currently.temperature}` },
        { label: 'Humidity', value: `${body.currently.humidity}` },
        { label: 'Pressure', value: `${body.currently.pressure}` },
        { label: 'Wind Speed', value: `${body.currently.windspeed}` },
        { label: 'Visibility', value: `${body.currently.visibility}` }
      ]
    })
  })
})

app.listen(8091)
