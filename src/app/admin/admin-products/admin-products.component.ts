
import { Product } from './../../models/product';
import {  Component, OnDestroy, OnInit} from '@angular/core';

import { Subscription} from 'rxjs';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit,OnDestroy {
  // items: Product[];
  // itemCount : number;
  // dataSource = new MatTableDataSource<Product>
  //  product:Product = {
  //    data: undefined,
  //    title: '',
  //    price: 0,
  //    category: '',
  //    imageUrl: '',
  //    key: '',
  //    quantity: 0
  //  };
  //products$: Observable<any[]>;
  products:Product[] ;
  filteredProducts:any[];
  subscription: Subscription;
  // @ViewChild(MatPaginator) paginator: MatPaginator;

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

constructor(private productService: ProductService){

  this.subscription = this.productService.getAll().pipe()
  .subscribe((products: any[]) =>this.filteredProducts= this.products = products); 
  

}


filter(query: string){
  this.filteredProducts = (query) ? this.products.filter(p => p.data.title.toLowerCase().includes(query.toLowerCase())) :
  this.products;
}
ngOnDestroy() {
  this.subscription.unsubscribe();
}
ngOnInit() {
  
}
}
