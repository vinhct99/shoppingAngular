
import { Component } from '@angular/core';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
order$:any;

constructor(private orderService: OrderService,private authService: AuthService) {
  this.order$ = this.authService.user$.pipe(switchMap((u:any) =>this.orderService.getOrderByUser(u.uid)));
}
}
