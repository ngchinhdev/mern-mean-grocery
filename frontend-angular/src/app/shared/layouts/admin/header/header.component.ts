import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [MatIconModule, NzIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  @Input() isCollapsed!: boolean;
  @Input() toggleCollapsed!: () => void;
}
