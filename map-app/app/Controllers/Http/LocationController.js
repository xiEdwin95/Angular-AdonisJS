'use strict'

const fetch = require('node-fetch')

const Location = use('App/Models/Location')

require('dotenv').config();

const APPID = process.env.API_KEY;



async function fetchWeather(lat, lon){

    const data = await fetch('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=' + APPID)
    
    const json = await data.json()
    const weather = await json.weather[0].description

    return weather
   }

class LocationController {
    async index({ response} ){
        
        const location = await Location.all()
        //different from conventional tojson()
        const locations = location.toJSON()
        
        //makes an array of objects based on return statmenet
        const fulldata = locations.map(async location => {
            
            const weather = await fetchWeather(location.lat,location.lon)
            return {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [location.lon, location.lat]
                },
                "properties": {
                "name": location.name,
                "description" : location.description,
                "url" : location.url,
                "weather" : weather

                }
            }
        })
        //map function returns a list of promises, must resolve later
        const data = await Promise.all(fulldata);


        //response will send only when the data to be sent is resolved
            response.json({
                message : "test works",
                data : data
            })
      
    
    }

    async show ({ request, response, params : {id}}){

        //selects the location data from database
        const location = await Location.find(id)
        const thislocation = location.toJSON()
        console.log('here')
        const weather = await fetchWeather(location.lat,location.lon)
        const newObject =  {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [location.lon, location.lat]
            },
            "properties": {
            "name": location.name,
            "description" : location.description,
            "url" : location.url,
            "weather" : weather

            }
        }

        //returns a json object of the location, including the image
        response.status(200).json({
            message : "this is the location",
            data : newObject
        })


    }

    async store ({ request , response }) {
        //information is passed as post, can be obtained from request.body, in this case is request.post()
        const { name , description , lat, lon, url} = request.post()
        
        const location = new Location()
        

        location.name = name
        location.description = description
        location.lat = lat
        location.lon = lon
        location.url = url


        await location.save()

        response.json({
            message : 'successfully created a location',
            data : location
        })
    }

   


}

module.exports = LocationController
