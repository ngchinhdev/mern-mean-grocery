import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { AuthService } from './core/services/auth.service';

register();

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit() {
    this.authService.initializeAccessToken();
    this.getUserProfile();
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  getUserProfile() {
    this.authService.getUserProfile().subscribe({
      next: (res) => {
        this.authService.setUserProfile(res.data);
      }
    });
  }
}
