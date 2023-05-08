import { Product } from './../models/product';
import { ShoppingCart } from './../models/shopping-cart';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
// import { Order } from '../models/order';
import { ShoppingCartService } from '../shopping-cart.service';
import { Order } from '../models/order';



@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit,OnDestroy {
shipping:any = {};
userId:string;
userSubscription:Subscription;
product:Product;
@Input ('cart') cart:ShoppingCart;
subscription:Subscription
constructor(
  private router:Router,
  private authService:AuthService, 
  private orderService:OrderService, 
  //private shoppingCartService:ShoppingCartService
  ){
 
}
async ngOnInit(){
  // let cart$ =  await this.shoppingCartService.getCart();
  // this.subscription =  cart$.subscribe((cart=> this.cart=cart))
  this.userSubscription = this.authService.user$.pipe().subscribe(user=>this.userId = user.uid);
}
ngOnDestroy() {
 // this.subscription.unsubscribe();
  this.userSubscription.unsubscribe();
}
 async placeOrder() {
  console.log(this.shipping);

 

  let order = new Order(this.userId, this.shipping,this.cart)
   let result = await this.orderService.storeOrder(order);
   //this.orderService.storeOrder(order);
  this.router.navigate(['/order-success',result.key]);
  

}  
}
