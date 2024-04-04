export interface Users {
  id?: number;
  name: string;
  email: string;
  password: string;
  addEdit?: boolean;
  showPassword?: boolean;
}

export interface DeleteUser {
  id: number;
}
