import { Router, RouterOutlet } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';

import { HeaderComponent } from './header/header.component';
import { AboveFooterComponent } from './above-footer/above-footer.component';
import { FooterComponent } from './footer/footer.component';
import { CartComponent } from './cart/cart.component';
import { AuthComponent } from './auth/auth.component';



@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, AboveFooterComponent, FooterComponent, MatSidenavModule, CartComponent, AuthComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class UserComponent {
  constructor(
    private dialog: MatDialog,
    private router: Router
  ) { }

  openAuthDialog() {
    const dialogRef = this.dialog.open(AuthComponent, {
      width: '500px',
      height: 'auto',
      autoFocus: false,
      closeOnNavigation: true
    });

    this.router.events
      .subscribe(() => {
        dialogRef.close();
      });
  }
}
