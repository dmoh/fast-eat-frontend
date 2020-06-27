import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProductModalComponent} from "../../product-modal/product-modal.component";
import {Product} from "../../models/product";
import {CartService} from "../../cart/service/cart.service";
import {Cart} from "../../cart/model/cart";

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.scss']
})
export class RestaurantDetailsComponent implements OnInit {

  cartCurrent: Cart;
  starsRestaurant: any[] = [];
  products: Product[] = [];
  constructor(private modal: NgbModal,
              private cartService: CartService
              ) {

    this.products = [
        {
          name: 'Tacos',
          id: 1,
          price: 5,
          quantity: 4,
          remainingQuantity: 23,
          ingredients: 'Salade, Tomate, Oignon',
          urlPhoto: 'assets/home_images/sushi.jpg'
        },
        {
          name: 'Salades',
          id: 2,
          price: 2,
          quantity: 4,
          remainingQuantity: 23,
          ingredients: 'Salade, Tomate, Oignon'
        },
        {
          name: 'Kebab',
          id: 4,
          price: 2,
          quantity: 4,
          remainingQuantity: 23,
          ingredients: 'Salade, Tomate, Oignon'
        },
    ];
  }

  ngOnInit(): void {
    this.starsRestaurant = [1, 3, 4, 5, 4];

  }

  scroll(id) {
      const elmnt = document.getElementById(id);
      elmnt.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  openModal(product: Product): void {
    const modal = this.modal.open(ProductModalComponent);
    modal.componentInstance.product = product;
    modal.result.then((prod: Product) => {
      if (prod) {
          this.cartService.cartUpdated.subscribe((cart: Cart) => this.cartCurrent = cart);
      }
    });
  }

}