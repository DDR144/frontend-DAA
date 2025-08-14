import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user.interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-user.component',
  imports: [NgClass],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
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
      
      this.users.update(currentUsers => 
        currentUsers.map(user => 
          user.uid === uid ? { ...user, active: !user.active } : user
        )
      );
    } catch (error) {
      this.toastr.error('Error al cambiar estado');
    }
  }
}
