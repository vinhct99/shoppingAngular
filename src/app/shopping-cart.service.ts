
import { Injectable } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/compat/database';
import { Product } from './models/product';
import { map, take } from 'rxjs/operators';


import { Observable } from 'rxjs';
import { ShoppingCart } from './models/shopping-cart';
import { ShoppingCartItem } from './models/shopping-cart-item';

@Injectable({
  providedIn: 'root'
})

export class ShoppingCartService {
  key:string;

  constructor(private db: AngularFireDatabase) {
    // this.db.object('items/').snapshotChanges().pipe(map((action:any) => {
    //   const key = action.payload.key;
    //   const data = { key, ...action.payload.val() };
    //   return data;
    // }));
   
  }
  
  async getCart() : Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
//     return this.db
//     .object('/shopping-carts/' + cartId)
//     .valueChanges()
//     .pipe(map((x:any)=> new ShoppingCart(x.items)
// ));

return this.db
.object('/shopping-carts/' + cartId)
.valueChanges()
.pipe(map((x)=> (x) ? new ShoppingCart(( x as any).items): (x as any)
));
  }

 
  async addToCart(product: Product) {
   this.updateItem(product,1)
  }
  async removeFromCart(product:Product){
    this.updateItem(product,-1)
  }
  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items/').remove();
}
  
  // public createSavedDoc(){ 
  //   var documentKey = this.db.database.ref().child('items').push().key;
  //        this.db.database.ref('/items/'+documentKey).set({
  //          documentId:documentKey,
  //        });    
  //  }

  private create( ) {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
      //productId : this.db.database.ref().child('items').push().key,
    });
  
    
  }
  private getItem(cartId: string, productId: any) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId );
  }
  private async getOrCreateCartId() :Promise<string>{
    const cartId = localStorage.getItem('cartId');
    if (cartId) { return cartId; }
    let result = await this.create() as any;
    localStorage.setItem('cartId', result.key);
    return result.key;
  }
 

  private async updateItem(product: Product, change :number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId,product.key);
   
      item$.valueChanges().pipe(take(1)).subscribe((item: any) => {
      //  let quantity = (item.quantity || 0) +change;
      //   item$.update({ product: product,quantity: (item.quantity || 0) + change});
      //  if(quantity ===0) item$.remove();  
      
        if (item !=null) {
           item$.update({ 
            // product: product,
            // title : product.title,
            // imageUrl : product.imageUrl,
            // price: product.price,
            quantity: (item.quantity || 0) + change
          });
          console.log(item);
          if ( (item.quantity || 0) + change  ===0 ) return item$.remove();
         }
        else  {
          item$.set({ 
            product: product,
             quantity: 1  });
           
        }   
       //console.log(item.quantity);
       // let quantity = ((item.data['quantity'] || 0) +change).value()  
      
      });
  }
}


