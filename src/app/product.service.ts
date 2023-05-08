import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  surveys2: any;
  userDetails: any;

  constructor(private db:AngularFireDatabase) { 

  }
  create(product: any){
    return this.db.list('/products').push(product);
  }
  getAll(){
    return this.db.list('/products').snapshotChanges().pipe(map(actions => {
        return actions.map((a:any) => {
          const key = a.payload.key;
          const data = { key, ...a.payload.val() };
          return {data,key};
        })
      }));
   
      // .snapshotChanges().pipe(map((action:any) => {
      //   const key = action.payload.key;
      //   const data = { key, ...action.payload.val() };
      //   return data;
      // }));
  }

  get(productId: any){
    return this.db.object('/products/'+productId)
  }
  
  update(productId: any,product: any){
   return this.db.object('/products/'+productId).update(product);
  }

  delete(productId: any){
    return this.db.object('/products/'+productId).remove();
  }
  
}
