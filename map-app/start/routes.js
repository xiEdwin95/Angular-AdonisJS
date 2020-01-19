
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//cn just remove to connect a proper front end
/* Route.get('/', ({view}) => {
  return  view.render('mapbox')
}) */


//gets information on all markers
Route.get('/api/locations', 'LocationController.index')

//Route.get('/api/locations/weather/:id', 'LocationController.test')

//returns the info about a specific marker
Route.get('/api/locations/:id', 'LocationController.show');


Route.post('/api/locations', 'LocationController.store');


