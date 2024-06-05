import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '../../../../core/services/auth.service';
import { IUser } from '../../../../core/models/auth.model';
import { PUBLIC_ENDPOINTS } from '../../../../core/constants/urls';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [MatIconModule, NzIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit, OnDestroy {
  @Input() isCollapsed!: boolean;
  @Input() toggleCollapsed!: () => void;
  user!: IUser;
  routeSub!: Subscription;
  avatarUrl!: string;
  isOpenSetting = false;

  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit(): void {
    this.routeSub = this.authService.userProfile$.subscribe(user => {
      if (user) {
        this.avatarUrl = user.avatar.startsWith('https://') ? user.avatar : PUBLIC_ENDPOINTS.IMAGE_USERS + '/' + user.avatar;
        this.user = user;
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  onLogout() {
    this.authService.logoutUser().subscribe({
      next: (response) => {
        this.authService.isLoggedIn = false;
        this.authService.setUserProfile(null);

        localStorage.removeItem('accessToken');

        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log(error);
        return null;
      }
    });
  }

  onToggleOpenSetting() {
    this.isOpenSetting = !this.isOpenSetting;
  }
}
