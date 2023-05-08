import { Component, Input } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent {
  cart$ :Observable<ShoppingCart>;
@Input('cart') cart:ShoppingCart;
constructor(private shoppingCartService:ShoppingCartService){

}
async ngOnInit(){
  this.cart$ =  await this.shoppingCartService.getCart();  
 }
}
