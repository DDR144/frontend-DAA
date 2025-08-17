import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../core/auth.service';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user.add.component',
  imports: [ReactiveFormsModule],
  templateUrl: './user.add.component.html',
  styleUrl: './user.add.component.css'
})
export class UserAddComponent {
  form!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  , private userService: UserService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      role: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
      ]],
    })
  }

  async save() {
    if (this.form.invalid) {
      this.toastr.error('Error formulario contiene errores');
      return;
    }
    this.loading = true;
    this.form.disable();
    const { password, ...userData } = this.form.value;
    try {
      // Registrar usuario en Firebase Auth
      const cred = await this.authService.register(userData.email, password);
      // Guardar datos en Firestore
      const userToSave: User = {
        uid: cred.user.uid,
        name: userData.name,
        lastName: userData.lastName,
        email: userData.email,
        role: userData.role,
        active: true
      };
      await this.userService.save(userToSave);
      this.toastr.success('Usuario registrado correctamente');
      this.router.navigate(['user/register']);
    } catch (error: any) {
      this.toastr.error('Error al registrar usuario: ' + (error?.message || error));
    } finally {
      this.form.enable();
      this.loading = false;
    }
  }

  cancel() {
    this.router.navigate(['user'])
  }
}
