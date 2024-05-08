import { Component } from '@angular/core';
import { RouterOutlet, provideRouter } from '@angular/router';
import { register } from 'swiper/element/bundle';
register();

import { HeaderComponent } from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'frontend-angular';
}
