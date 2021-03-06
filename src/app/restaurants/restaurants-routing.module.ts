import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RestaurantDetailsComponent} from './restaurant-details/restaurant-details.component';
import {ShowOrderComponent} from '@app/restaurants/show-order/show-order.component';


const routes: Routes = [
    { path: 'restaurant/:id', component: RestaurantDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantsRoutingModule { }
