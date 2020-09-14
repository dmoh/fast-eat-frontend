import { Component, OnInit } from '@angular/core';
import {RestaurantDashboardService} from '@app/restaurants/restaurant-dashboard/services/restaurant-dashboard.service';
import {RestaurantDashboardComponent} from '@app/restaurants/restaurant-dashboard/restaurant-dashboard.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {UpdateDialogComponent} from '@app/restaurants/restaurant-dashboard/product/update-dialog/update-dialog.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  restaurantDatas: any;
  restaurant: any;
  products: any[];
  productBeforeUpdate: any;
  constructor(private restaurantService: RestaurantDashboardService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.restaurantService.getRestaurantDatas(1).subscribe((res) => {
      this.restaurant = RestaurantDashboardComponent.extractRestaurantData('business', res);
      this.products = RestaurantDashboardComponent.extractRestaurantData('product', res);
    });
  }


  onDelete(type: string, {product, supplement}): void {
    switch (type) {
      case 'supplement':
        this.products = this.products.filter((prod) => {
           if (+(prod.product.id) === product.id) {
             prod.product.supplmentsProduct = prod.product.supplmentsProduct.filter((elem) => {
               return elem.id !== supplement;
             });
           }
           return prod;
        });
        break;
        case 'product':
        this.products = this.products.filter((prod) => {
           return prod.product.id !== product.id;
        });
        break;
    }
  }


  openDialog(product: any): void {
    // add business id to product
    product = Object.assign({business_id: this.restaurant.id }, product);
    this.productBeforeUpdate = Object.assign({}, product);
    console.log(this.productBeforeUpdate);
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      width: '60%',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'no-update') {
        this.products = this.products.filter((prod) => {
          if (prod.product.id === product.id) {
            prod.product = this.productBeforeUpdate;
          }
          return prod.product;
        });
      } else {
        result['business_id'] = this.restaurant.id;
        this.restaurantService
          .updateProduct(JSON.stringify(result))
          .subscribe((resp) => {
              console.log(resp);
            }, (error) => {
              console.warn(error);
            }
          );
      }
    });
  }

}