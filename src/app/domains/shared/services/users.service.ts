import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Users } from '@shared/models/users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private http = inject(HttpClient);

  constructor() { }

  getAll() {
    const url = new URL(`https://localhost:7147/api/User/Get`);
    return this.http.get<Users[]>(url.toString());
  }
}
