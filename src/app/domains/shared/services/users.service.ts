import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { DeleteUser, Users } from '@shared/models/users.model';

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

  getUser(id?: number) {
    return this.http.get<Users>(`https://localhost:7147/api/User/GetEdit?request=${id}`);
  }

  postUser(data: Users){
    return this.http.post<Users>(`https://localhost:7147/api/User/CreateUsers`, data);
  }

  updateUser(data: Users){
    return this.http.post<Users>(`https://localhost:7147/api/User/Update`, data);
  }

  deleteUser(data: DeleteUser){
    return this.http.post<Users>(`https://localhost:7147/api/User/Delete`, data);
  }

}
