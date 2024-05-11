import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from '../../shared/layouts/admin/header/header.component';
import { SidebarComponent } from '../../shared/layouts/admin/sidebar/sidebar.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})

export class AdminComponent {
  isCollapsed = false;
}
