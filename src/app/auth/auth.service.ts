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

  registerUser(authData: AuthData) {
    this.fireAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        console.log(result);
        this.authSuccessfully();
      })
      .catch((error) => console.log(error));
  }

  login(authData: AuthData) {
    this.fireAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        console.log(result);
        this.authSuccessfully();
      })
      .catch((error) => console.log(error));
    this.authSuccessfully();
  }

  logout() {
    this.trainingService.cancelSubscriptions();
    this.fireAuth.auth.signOut();
    this.isAuthenticated = false;
    this.authChange.next(false);
    this.router.navigate(['']);
  }

  isAuth() {
    return this.isAuthenticated;
  }

  private authSuccessfully() {
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}
