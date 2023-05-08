import { Observable } from 'rxjs';
import { AppUser } from './../models/app-user';

import { Component, OnInit} from '@angular/core';
import { AuthService } from '../auth.service';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';




@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser | null;
  shoppingCartItemCount:number;
  cart$ :Observable<ShoppingCart>;

  constructor(private  auth:AuthService,private shoppingCartService:ShoppingCartService){
    
  }
  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
   this.cart$ =  await this.shoppingCartService.getCart();
  //   let cart$ =  await this.shoppingCartService.getCart();
  // cart$.subscribe((cart:any) => {
  //   this.shoppingCartItemCount = 0;
  //   for(let productId in cart.items){
  //     this.shoppingCartItemCount  +=  cart.items[productId].quantity;
      
  // }
  // })
  }
  logout(){
   this.auth.logout();
  }
}
