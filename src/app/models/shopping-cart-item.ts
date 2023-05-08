import { Product } from "./product";

export class ShoppingCartItem{
    key:string;
    title :string;
    imageUrl :string;
    price:number;
    quantity: number= 0;
    product:Product;
     constructor(init?:Partial<ShoppingCartItem| Product>){
        Object.assign(this,init);
     }
//  constructor(public product:Product, public quantity:number){
    
//  }

    get totalPrice(){
        return this.product.price * this.quantity;
      //  return this.price * this.quantity;
    }
   
}