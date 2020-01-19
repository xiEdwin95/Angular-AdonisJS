'use strict'


const fetch = require('node-fetch')
const Location = use('App/Models/Location')
async function fetchWeather(lat, lon){

  const data = await fetch('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=997f607cea9af7e445829e46ae273c57')
  
  const json = await data.json()
  const weather = await json.weather[0].description

  return weather
 }

class AllWeather {
 
  async handle ({ request }, next) {
         const location = await Location.all()
         const jsonData = await location.toJSON()
         
         const allLocation = []

         jsonData.forEach(function(data){
   
  
          
          allLocation.push({
          "type": "Feature",
          "geometry": {
              "type": "Point",
              "coordinates": [data.lon, data.lat]
          },
          "properties": {
          "name": data.name,
          "description" : data.description,
          "id" : data.id,
          
      
          } 
         })
      
         
      })

      request.body = allLocation
    await next()
  }
}

module.exports = AllWeather
