const weather = require('./app.js')

weather.queryWeather('101020100', (data) => {
  console.log(data);
})