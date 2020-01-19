import { environment } from '../../environments/environment';
import { MapService } from '../map.service'
import { Component, OnInit ,ChangeDetectorRef, Renderer2 } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { from } from 'rxjs';

@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.css']
})
export class MapBoxComponent implements OnInit {
 
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 1.3355825;
  lng = 103.9028103;
  constructor(
    private mapService : MapService,
    private renderer : Renderer2
  ) { }

  
  ngOnInit() {
   
    (mapboxgl as typeof mapboxgl).accessToken = environment.mapbox.accessToken;
   this.initializeMap();   

   this.renderer.setStyle(mapboxgl, 'width','200px');
  }



    private initializeMap() {
      /// locate the user
      if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(position => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.map.flyTo({
            center: [this.lng, this.lat]
          })
        });
      }
  
      this.buildMap()
  
    }
  
    buildMap() {
      this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 13,
        center: [this.lng, this.lat]});
    
        async function populate(){

          const response = await fetch('http://127.0.0.1:3333/api/locations/');
          const geojson = await response.json()
          console.log(geojson.data)
         
          //const realgeojson = geojson.data 
          return geojson.data;
         }

        
        


         var nav = new mapboxgl.NavigationControl();
         this.map.addControl(nav, 'top-left');
         var that = this 

         //below is database code, comment out so mock-data runs
          
              populate().then((response) => {
                response.forEach(function(marker) {
              
                  var el = that.renderer.createElement('div');

                  el.className = 'marker';
                  
                  //make a marker for each feature and add to the map
                  new mapboxgl.Marker(el)
                  .setLngLat(marker.geometry.coordinates)
                  .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                    .setHTML('<h3>' + marker.properties.name + '</h3><p> Description : ' + marker.properties.description +  '<br> Current weather : ' + 
                    marker.properties.weather + '</p>' +'<img src=' + marker.properties.url + ' alt="W3Schools.com" height="150" width="200" > '))
                  .addTo(that.map);
            
              })   
            })
        //imports the mock data , add this is for it to work with no db + comment out code above
       /*  var json = require('./mock-data.json');
        json.data.forEach(function(marker) {
        
          var el = that.renderer.createElement('div');

          el.className = 'marker';
          
          //make a marker for each feature and add to the map
          new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML('<h3>' + marker.properties.name + '</h3><p> Description : ' + marker.properties.description +  '<br> Current weather : ' + 
            marker.properties.weather + '</p>' +'<img src=' + marker.properties.url + ' alt="W3Schools.com" height="150" width="200" > '))
          .addTo(that.map);

        })   */



 


   
  }
}
