import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user.interface';
import { NgClass } from '@angular/common';
import { LayoutComponent } from '../../../../shared/components/layout/layout.component';
import { Loader } from '../../../../shared/components/loader/loader';

@Component({
  selector: 'app-user.component',
  imports: [NgClass, LayoutComponent, Loader],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  private userService = inject(UserService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  loading = false;
  users = signal<User[]>([]);

  async ngOnInit() {
    this.loading = true;
    const usuarios = await this.userService.getAll();
    this.users.set(usuarios);
    this.loading = false;
  }

  addUser() {
    this.router.navigate(['user/add']);
  }

  editUser(uid: string) {
    this.router.navigate([`user/update/${uid}`]);
  }

  async stateUser(uid: string) {
    try {
      await this.userService.toggleActive(uid);

      this.users.update((currentUsers) =>
        currentUsers.map((user) =>
          user.uid === uid ? { ...user, active: !user.active } : user
        )
      );
    } catch (error) {
      this.toastr.error('Error al cambiar estado');
    }
  }

  // Obtener usuarios activos para las cards de user.component.html 
  get activeUsersCount(): number {
    return this.users().filter((u) => u.active).length;
  }

  // Obtener usuarios inactivos para las cards de user.component.html 
  get unactiveUsersCount(): number {
    return this.users().filter((u) => !u.active).length;
  }
}
