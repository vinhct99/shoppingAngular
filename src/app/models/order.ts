import { Product } from './product';
import { ShoppingCart } from "./shopping-cart";

export class Order{
    datePlaced:number;
    items:any = [];

    constructor(public userId:string,public shipping:any,shoppingCart:ShoppingCart){
        this.datePlaced = new Date().getTime();
        this.items = shoppingCart.items.map((i:any) =>{
            return{
              product: {
                title:i.product.title,
                imageUrl:i.product.imageUrl,
                price:i.product.price,
                quantity:i.quantity,
              },
              quantity:i.quantity,
              totalPrice:i.totalPrice ,
              
            }
         
          })
    }
}