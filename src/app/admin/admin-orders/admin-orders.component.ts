import { Observable, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from 'src/app/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
//orders$:any = [];
orders:any;
constructor(private orderService:OrderService){
this.orderService.getOrders().pipe()
.subscribe((orders: any) =>this.orders = orders);
  

}


}
