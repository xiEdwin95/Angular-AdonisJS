import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeoJson } from './map';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  
    constructor(
      private http: HttpClient,
    ) { 
      (mapboxgl as typeof mapboxgl).accessToken = environment.mapbox.accessToken;
    }
  
  getMarker() {
    return this.http.get('api-url');
  }

}
  
 