import { ShoppingCartService } from './shopping-cart.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';
// import { Order } from './models/order';




@Injectable()
export class OrderService {

  constructor(private db:AngularFireDatabase,private shoppingCartService:ShoppingCartService) { }
  async storeOrder(order: any){
    let result =  await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }
  // getOrders(){
  //   return this.db.list('/orders')
  // }
  getOrders(){
    // return this.db.list('/orders').snapshotChanges().pipe(map(actions => {
    //   return actions.map((a:any) => {
    //     const key = a.payload.key;
    //     const data = { key, ...a.payload.val() };
    //     return {data,key};
    //   })
    // }));
    return this.db.list('/orders').valueChanges()
    
  }
  // getOrderByUser(userId:string){
  //   return this.db.list('/orders',
  //   ref => {
  //     return ref.orderByChild(userId).equalTo(userId)
  //   }
  //   )
  // }
    getOrderByUser(userId:string){
    return this.db.list('/orders', ref =>
    ref.orderByChild('userId').equalTo(userId)).valueChanges();
  }
}
