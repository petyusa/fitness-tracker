import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() closeSidenav = new EventEmitter<void>();
  isAuth = false;
  authSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe((status) => {
      this.isAuth = status;
    });
  }

  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.authService.logout();
    this.onClose();
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
