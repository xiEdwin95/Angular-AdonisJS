import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapBoxComponent } from './map-box/map-box.component';
import { AddComponent } from './add/add.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path:'home', component: MapBoxComponent},
  {path:'add', component: AddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
