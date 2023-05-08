
import { Component,OnInit} from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product';
import { switchMap, Observable } from 'rxjs';
import { ActivatedRoute,} from '@angular/router';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';




@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent  implements OnInit   {
  category:string |null ;
  products:Product[] = [];
  filteredProducts : Product[] = [];
  key:string
 // productService: any;
 // cart:any;
  //subscription:any
cart$:Observable<ShoppingCart>;

constructor(private route:ActivatedRoute,private productService: ProductService,private shoppingCartService: ShoppingCartService){
 

}
filter(query: string){
  this.filteredProducts = (query) ? this.products.filter(p => p.data.title.toLowerCase().includes(query.toLowerCase()) ||  p.data.title.toUpperCase().includes(query.toUpperCase())) :
  this.products;
}

 async ngOnInit() {
//this.subscription =  (await this.shoppingCartService.getCart()).pipe().subscribe((cart => this.cart = cart))
this.cart$ = await this.shoppingCartService.getCart();
this.populateProducts();
}
private populateProducts(){
  this.productService
  .getAll().pipe(
  switchMap((products:any[])=>{
    this.products = products;
    return this.route.queryParamMap;
  }))
  .subscribe(params =>{
    this.category =params.get('category');
    console.log(this.category);
    this.applyFilter();
  });
}
private applyFilter(){
  this.filteredProducts =(this.category)?
  this.products.filter(p=>p.data.category === this.category):
  this.products;
  console.log(this.filteredProducts);
}

}




