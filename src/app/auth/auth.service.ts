import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';

import { AuthData } from './auth-data.model';
import { MatSnackBar } from '@angular/material';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';

@Injectable()
export class AuthService {
  private isAuthenticated = false;
  authChange = new Subject<boolean>();

  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService
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
    this.uiService.loadingStateChanged.next(true);
    this.fireAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.uiService.loadingStateChanged.next(false);
      })
      .catch((error) => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackBar(error.message, null, 3000);
      });
  }

  login(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.fireAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.uiService.loadingStateChanged.next(false);
      })
      .catch((error) => {
        this.uiService.loadingStateChanged.next(false);
        const snackBar = this.uiService.showSnackBar(error.message, 'X', 3000);
        snackBar.onAction().subscribe(() => snackBar.dismiss());
      });
  }

  logout() {
    this.fireAuth.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
