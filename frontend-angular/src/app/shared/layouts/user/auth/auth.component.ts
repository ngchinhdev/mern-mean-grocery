import { Component } from '@angular/core';
import { MatDialog, MatDialogContent } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [MatDialogContent, MatIconModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})

export class AuthComponent {

}
