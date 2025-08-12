import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { LayoutComponent } from '../../shared/components/layout/layout.component';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css'],
  imports: [LayoutComponent]
})
export class HomePage {
  authService = inject(AuthService);
}
