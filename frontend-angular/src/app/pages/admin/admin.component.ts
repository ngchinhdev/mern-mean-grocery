import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { MatIconModule } from '@angular/material/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { HeaderComponent } from '../../shared/layouts/admin/header/header.component';
import { SidebarComponent } from '../../shared/layouts/admin/sidebar/sidebar.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, NzLayoutModule, NzMenuModule, MatIconModule, NzIconModule, SidebarComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})

export class AdminComponent {
  isCollapsed = false;

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
