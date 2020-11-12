import {Component, OnInit, Optional} from '@angular/core';
import {Product} from "../models/product";
import {Cart} from "./model/cart";
import {CartService} from "./service/cart.service";
import { Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  qMax: number[];
  cart: Cart;
  @Optional() products: Product[];
  hasProduct: boolean;
  constructor(private cartService: CartService,
              private route: Router
  ) { }

  ngOnInit(): void {
    this.cartService.cartUpdated.subscribe((cartSub) => this.cart = cartSub);
    if (!this.products) {
      this.hasProduct = false;
    }

    this.qMax = [1, 2, 3, 4, 5, 6, 7, 8];
  }

  onUpdateCart(event, product: Product): void {
        product.quantity = +(event.target.value);
        this.cartService.UpdateCart('update', product);
    // this.cartService.UpdateCart()
  }

  onDelete(product: Product) {
    this.cartService.UpdateCart('remove', product);
  }


  seeCart(): void {
    // if() // todo if is connected goto cartDEtail else
    this.route.navigate(['cart-detail']);
  }





}
