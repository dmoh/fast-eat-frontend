import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RestaurantDashboardComponent} from '@app/restaurants/restaurant-dashboard/restaurant-dashboard.component';
import {OrderComponent} from '@app/restaurants/restaurant-dashboard/order/order.component';
import {OverviewComponent} from '@app/restaurants/restaurant-dashboard/overview/overview.component';
import {ProductComponent} from '@app/restaurants/restaurant-dashboard/product/product.component';
import {CommerceComponent} from '@app/restaurants/restaurant-dashboard/commerce/commerce.component';
import {RoleGuard} from '@app/_helpers/role.guard';
import {OrdersCurrentComponent} from '@app/restaurants/restaurant-dashboard/orders-current/orders-current.component';
import {ContactComponent} from '@app/restaurants/restaurant-dashboard/contact/contact.component';
import {HistoryComponent} from '@app/restaurants/restaurant-dashboard/history/history.component';


const routes: Routes = [ {
   path: 'restaurant-dashboard/:id',
   component: RestaurantDashboardComponent,
   canActivate: [RoleGuard],
   children: [
     {
       path: 'orders',
       component: OrderComponent,
     },
     {
       path: 'orders-current',
       component: OrdersCurrentComponent,
     },
     {
       path: 'overview',
       component: OverviewComponent,
     },
     {
       path: 'products',
       component: ProductComponent,
     },
     {
       path: 'contact',
       component: ContactComponent,
     }
     ,
     {
       path: 'commerce',
       component: CommerceComponent,
     },
     {
       path: 'stats',
       component: HistoryComponent,
     }
   ]
}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantDashboardRoutingModule { }
