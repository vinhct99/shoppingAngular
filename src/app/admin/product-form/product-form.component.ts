
 
import { Observable, map, take } from 'rxjs';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import {  ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})

export class ProductFormComponent implements OnInit {
  categories$ : Observable<any[]>;
  product:any = {};
  id;

  constructor(private categoryService:CategoryService,
    private productService:ProductService,
    private router:Router,
    private route: ActivatedRoute
    ) {
    this.categories$ = this.categoryService.getCategories().snapshotChanges()
    .pipe(
    map((actions) => {
        return actions.map((action) => ({
          key: action.key,
          val: action.payload.val(),
          
        }));
    })
    );

   this.id = this.route.snapshot.paramMap.get('id');
   console.log( this.id);
   if (this.id) this.productService.get(this.id).valueChanges().pipe(take(1))
.subscribe(p => {this.product = p;
  
// console.log( this.product)
}); 

  //  let id = route.snapshot.paramMap.get('id');
 
  //  if (id) 
  //     this.productService.get(id).valueChanges().pipe(take(1)).subscribe(p => this.product = p);
     // this.productService.get(id).valueChanges().pipe(take(1)).subscribe( p => console.log( this.product = p));
    
  }
  save(product: any){
    if(this.id){
      this.productService.update(this.id,product);
    }else{
      this.productService.create(product);
    }
 
    console.log(this.product);
    this.router.navigate(['/admin/products']);
  }
  delete(){
    if(!confirm('Are you sure you want to delete this product?')) return;
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }
  
  ngOnInit(): void {
  
  }
}
