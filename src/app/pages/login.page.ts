import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
})
export class LoginPage {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);


  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  error = '';

  login() {

    console.log('Se intentó hacer login');
    if (this.form.invalid) return;

    const { email, password } = this.form.value;
    this.authService
      .login(email!, password!)
      .then(() => {
        this.error = '';
        console.log('Login exitoso');
        this.router.navigate(['/home']);
      })
      .catch((err) => {
        this.error = 'Credenciales inválidas';
        console.error(err);
      });
  }
}
