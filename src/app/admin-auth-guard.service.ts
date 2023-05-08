
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {   Observable, map, switchMap } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard { 

  constructor(private auth: AuthService,private userService: UserService) { }
  canActivate() :Observable<boolean> {
   return this.auth.appUser$
    .pipe(map(appUser => appUser!.isAdmin))
  }
}





// canActivate(){
//   return this.auth.user$
//   .pipe(switchMap( user => this.userService.get(user.uid)))
//   .pipe(map((appUser => appUser.isAdmin)));
  
// }




