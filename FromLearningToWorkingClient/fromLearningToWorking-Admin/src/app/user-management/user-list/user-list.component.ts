import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  viewUser(id: number): void {
    this.router.navigate(['/users', id]); // נתיב להצגת פרטי משתמש
  }
  
  editUser(id: number): void {
    this.router.navigate(['/users/edit', id]); // נתיב לעריכת פרטי משתמש
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(
        () => {
          this.fetchUsers(); // Refresh the user list after deletion
        },
        (error) => {
          console.error('Error deleting user', error);
        }
      );
    }
  }

  addUser(): void {
    this.router.navigate(['/user-add']);
  }
}