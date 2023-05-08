import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute } from '@angular/router';
import firebase from 'firebase/compat/app'
import { Observable, of, switchMap  } from 'rxjs';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User|null| undefined>;
  constructor(private userService: UserService, private afAuth: AngularFireAuth,private route: ActivatedRoute) {
    this.user$ = afAuth.authState;
    }
    login(){
      let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
      localStorage.setItem('returnUrl',returnUrl)
      this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    }
    logout() {
      this.afAuth.signOut();
  }
  get appUser$() : Observable<AppUser|null> {
    return this.user$
    .pipe(switchMap(user => {
     if(user) {return this.userService.get(user.uid).valueChanges()
    }else{
      return of(null);
    }
      
    }
    ));
  }
}
