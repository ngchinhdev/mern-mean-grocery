import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [RouterOutlet, MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css',
  encapsulation: ViewEncapsulation.None
})

export class UserDetailComponent implements OnInit {
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.getUserProfile().subscribe({
      next: (res) => {
        this.authService.setUserProfile(res.data);
      }
    });
  }
}
