import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';

import { IUser } from '../../../../core/models/users.model';
import { PUBLIC_ENDPOINTS } from '../../../../core/constants/constants';
import { UsersService } from '../../../../core/services/users.service';
import { LoaderComponent } from '../../../../shared/ui/loader/loader.component';
import { PaginatorComponent } from '../../../../shared/ui/paginator/paginator.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [MatIconModule, LoaderComponent, PaginatorComponent],
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
    private usersSevices: UsersService,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(page: number = 0, limit: number = 10) {
    this.isLoading = true;
    this.usersSevices.getAllUsers(page, limit).subscribe({
      next: (response) => {
        this.users = response.data;
        this.totalRecords = response.data.length;
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      }
    });
  }

  onPageChanged(event: any) {
    console.log(event);
    this.first = event.first + 1;
    this.rows = event.rows;
    this.getAllUsers(event.first, event.rows);
  }
}