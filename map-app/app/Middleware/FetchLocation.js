
'use strict'

const fetch = require('node-fetch');
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Location = use('App/Models/Location')




class FetchLocation {

  //middleware is to fetch lat and lon for further api calls in the controller. here is fetch from db
  async handle ({ request,  params : {id}}, next) {
    
    const location = await Location.find(id)
    console.log(location)
    const lat = parseFloat(location.lat)
    const lon = parseFloat(location.lon)
    
    request.lat = lat
    request.lon = lon
   
    
    
    await next()
  }
}

module.exports = FetchLocation





//this function retrieves data from db to format as geojson 
