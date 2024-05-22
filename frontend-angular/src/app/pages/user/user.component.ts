import { RouterOutlet } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';

import { HeaderComponent } from '../../shared/layouts/user/header/header.component';
import { AboveFooterComponent } from '../../shared/layouts/user/above-footer/above-footer.component';
import { FooterComponent } from '../../shared/layouts/user/footer/footer.component';
import { CartComponent } from '../../shared/layouts/user/cart/cart.component';
import { AuthComponent } from '../../shared/layouts/user/auth/auth.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, AboveFooterComponent, FooterComponent, MatSidenavModule, CartComponent, AuthComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class UserComponent {
  constructor(public dialog: MatDialog) { }

  openAuthDialog() {
    this.dialog.open(AuthComponent, {
      width: '500px',
      height: 'auto',
    });
  }
}
