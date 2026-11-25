import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '../../../core/services/auth';
import { UpperCasePipe } from '@angular/common';
@Component({
  imports: [UpperCasePipe],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header implements OnInit {

  currentUser: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();

    console.log('Header User:', this.currentUser);
  }

  logout(): void {
    const user = this.authService.getCurrentUser();

    console.log('Logging out role:', user?.role);

    this.authService.logout();

    this.router.navigate(['/login'], {
      queryParams: { role: user?.role }
    });
  }
}