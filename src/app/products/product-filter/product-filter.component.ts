import { Component, Input } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {
  categories$: Observable<any[]>;
  @Input('category') category: any;
  constructor(categoryService:CategoryService){
    this.categories$ = categoryService.getCategories().snapshotChanges()
    .pipe(
      (map(actions => {
        return actions.map(a => {
          const key = a.payload.key;
          const data = a.payload.val();
          return {data, key};
        })
      }))
    );
  }
}
