import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';

import { IUser } from '../../../../core/models/auth.model';
import { PUBLIC_ENDPOINTS } from '../../../../core/constants/urls';
import { LoaderComponent } from '../../../../shared/ui/loader/loader.component';
import { PaginatorComponent } from '../../../../shared/ui/paginator/paginator.component';
import { NotFoundComponent } from '../../../../shared/ui/not-found/not-found.component';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [MatIconModule, LoaderComponent, PaginatorComponent, NotFoundComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})

export class UserListComponent implements OnInit {
  users: IUser[] = [];
  // imageUrl = PUBLIC_ENDPOINTS.IMAGE_CATEGORIES;
  isLoading: boolean = false;
  totalRecords: number = 0;
  first = 0;
  rows = 10;

  constructor(
    private authService: AuthService,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(page: number = 0, limit: number = 10) {
    this.isLoading = true;
    this.authService.getAllUsers(page, limit).subscribe({
      next: (response) => {
        this.users = response.data;
        this.totalRecords = response.data.length;
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      },
      error: (error) => {
        if (this.users.length === 0) {
          this.isLoading = false;
        }
      }
    });
  }

  onDeleteUser(id: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.authService.deleteUser(id).subscribe({
        next: (response) => {
          this.toast.success('User deleted successfully!');
          this.getAllUsers();
        }
      });
    }
  }

  onPageChanged(event: any) {
    console.log(event);
    this.first = event.first + 1;
    this.rows = event.rows;
    this.getAllUsers(event.first, event.rows);
  }
}
