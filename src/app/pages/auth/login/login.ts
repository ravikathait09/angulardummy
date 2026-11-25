
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, UserRole } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  role: string;

  constructor(
  private route: ActivatedRoute,
  private authService: AuthService,
  private router: Router
) {
  this.role = this.route.snapshot.data['role'] ?? 'customer';
}

  get roleTitle() {
    return this.role.charAt(0).toUpperCase() + this.role.slice(1);
  }

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });
  errorMessage = '';
  login() {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const formData = this.loginForm.getRawValue();

    const user = this.authService.login(
      formData.email!,
      formData.password!,
      this.role as UserRole
    );

    if (!user) {
      this.errorMessage = 'Invalid email or password';
      return;
    }

    this.errorMessage = '';
    console.log(user.role)
    if(user.role =='customer'){
       this.router.navigate([`dashboard`]);
       return;
    }

    this.router.navigate([`/${user.role}/dashboard`]);

  }
}
