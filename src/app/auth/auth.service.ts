import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';

import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training.service';

@Injectable()
export class AuthService {
  private isAuthenticated = false;
  authChange = new Subject<boolean>();

  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
    private trainingService: TrainingService
  ) {}

  initAuthListener() {
    this.fireAuth.authState.subscribe((user) => {
      if (user) {
        console.log('YYYEEEEEEHHHHAAA');
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(['']);
      }
    });
  }

  registerUser(authData: AuthData) {
    this.fireAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {})
      .catch((error) => console.log(error));
  }

  login(authData: AuthData) {
    this.fireAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {})
      .catch((error) => console.log(error));
  }

  logout() {
    this.fireAuth.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
