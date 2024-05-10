import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from '../../shared/layouts/user/header/header.component';
import { AboveFooterComponent } from '../../shared/layouts/user/above-footer/above-footer.component';
import { FooterComponent } from '../../shared/layouts/user/footer/footer.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, AboveFooterComponent, FooterComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})

export class UserComponent {

}
