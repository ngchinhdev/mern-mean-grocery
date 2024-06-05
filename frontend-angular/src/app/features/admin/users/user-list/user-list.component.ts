import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';

import { IUser } from '../../../../core/models/auth.model';
import { PUBLIC_ENDPOINTS } from '../../../../core/constants/urls';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';
import { NotFoundComponent } from '../../../../shared/components/not-found/not-found.component';
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
  admin!: IUser;
  imageUrl = PUBLIC_ENDPOINTS.IMAGE_USERS;
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
    this.authService.userProfile$.subscribe(user => {
      if (user) {
        this.admin = user;
      }
    });
  }

  getAllUsers(page: number = 0, limit: number = 10) {
    this.isLoading = true;
    this.authService.getAllUsers(page, limit).subscribe({
      next: (response) => {
        this.users = response.data.filter(user => user._id !== this.admin._id);
        this.totalRecords = response.totalRecords;
        this.isLoading = false;
      },
      error: (error) => {
        if (this.users.length === 0) {
          this.isLoading = false;
        }
      }
    });
  }

  onChangeRole($event: Event, id: string) {
    const selectEl = $event.target as HTMLSelectElement;
    this.authService.changeRole(id, selectEl.value === '0' ? false : true).subscribe({
      next: (res) => {
        console.log(res);
        this.toast.success("Updated user role successfully");
      },
      error: () => {
        this.toast.error("Failed to update user role");
      }
    });
  }

  onPageChanged(event: any) {
    console.log(event);
    this.first = event.first;
    this.rows = event.rows;
    this.getAllUsers(event.page + 1, event.rows);
  }
}
