import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-user.update.component',
  imports: [ReactiveFormsModule],
  templateUrl: './user.update.component.html',
  styleUrl: './user.update.component.css'
})
export class UserUpdateComponent {
  form!: FormGroup;
  loading = false;
  uid!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      active: [true, Validators.required]
    });
  }

  async ngOnInit() {
    this.uid = this.route.snapshot.params['uid'];
    this.loading = true;
    try {
      const user = await this.userService.getById(this.uid);
      this.form.patchValue(user);
    } catch (error: any) {
      this.toastr.error('Error cargando usuario: ' + (error?.message || error));
      this.router.navigate(['user']);
    } finally {
      this.loading = false;
    }
  }

  async save() {
    if (this.form.invalid) {
      this.toastr.error('Formulario inválido');
      return;
    }
    this.loading = true;
    this.form.disable();
    try {
      await this.userService.update(this.uid, this.form.value);
      this.toastr.success('Usuario actualizado correctamente');
      this.router.navigate(['user']);
    } catch (error: any) {
      this.toastr.error('Error al actualizar usuario: ' + (error?.message || error));
    } finally {
      this.form.enable();
      this.loading = false;
    }
  }

  cancel() {
    this.router.navigate(['user/list']);
  }
}
