import { CommonModule } from '@angular/common';
import { Component, SimpleChanges, inject, signal } from '@angular/core';
import { Users } from '@shared/models/users.model';
import { UsersService } from '@shared/services/users.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  users = signal<Users[]>([]);

  private usersService = inject(UsersService);

  ngOnInit(){
    this.getAll()
  }

  private getAll(){
    this.usersService.getAll()
    .subscribe({
      next: (user) => {
        console.log('get', user)
        this.users.set(user);
      },
      error: () => {

      }
    })
  }


}
