import { CommonModule } from '@angular/common';
import { Component, SimpleChanges, inject, signal } from '@angular/core';
import { DeleteUser, Users } from '@shared/models/users.model';
import { UsersService } from '@shared/services/users.service';
import { AddEditComponent } from '@users/components/add-edit/add-edit.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, AddEditComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  users = signal<Users[]>([]);
  user = signal<Users | null>(null);
  showModal: boolean = false;
  addEdit: boolean = false;
  title: string = '';

  private usersService = inject(UsersService);


  ngOnInit(){
    this.getAll()
  }

  private getAll(){
    this.usersService.getAll()
    .subscribe({
      next: (user) => {
        this.users.set(user);
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'Ocurrió un error al obtener los usuarios.',
        });
      }
    })
  }

  onChangeAdd() {
    this.openCustomModal(null, false, 'Agregar Usuario');
  }

  onChangeEdit(user: Users) {
    console.log(user)
    this.usersService.getUser(user.id).subscribe({
      next: (user) => {
        console.log('users', user)
        this.openCustomModal(user, true, 'Editar Usuario');

      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: `Ocurrió un error al obtener el usuario ${user.name}.`,
        });
      }
    })
  }

  openCustomModal(user: Users | null, addEdit: boolean, title: string) {

    this.showModal = true;
    this.user.set(user);
    this.addEdit = addEdit;
    this.title = title;
  }

  closeModal() {
    this.showModal = false;
  }

  handleUserAddedOrEdited(event: Users) {
    console.log(event)
    this.closeModal();
    if(!event.addEdit){
      this.PostUser(event)
    }
    else{
      this.updateUser(event)
    }

  }

  PostUser(user: Users){
    console.log('post',user)
    this.usersService.postUser(user).subscribe({
      next: (user) => {
        console.log('create user', user)
        if (user) {
          Swal.fire({
            icon: 'success',
            title: 'Usuario agregado exitosamente.',
            showConfirmButton: false,
            timer: 2000
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'No se pudo agregar usuario.',
            showConfirmButton: false,
            timer: 2000
          });
        }
        this.getAll();
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: `Ocurrió un error al agregar el usuario ${user.name}.`,
        });
      }
    })
  }

  updateUser(user: Users){
    console.log('update',user)
    this.usersService.updateUser(user).subscribe({
      next: (user) => {
        console.log('update user', user)
        if (user) {
          Swal.fire({
            icon: 'success',
            title: 'Usuario actualizado exitosamente.',
            showConfirmButton: false,
            timer: 2000
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'No se pudo actualizar usuario.',
            showConfirmButton: false,
            timer: 2000
          });
        }
        this.getAll();
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: `Ocurrió un error al actualizar el usuario ${user.name}.`,
        });
      }
    })
  }

  onChangeDelete(user: Users) {
    console.log('delete',user)
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Deseas eliminar el usuario ${user.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Verificar si user.id es undefined antes de asignarlo
        if (user.id !== undefined) {
          const userDelete: DeleteUser = {
            id: user.id
          };
          this.usersService.deleteUser(userDelete).subscribe({
            next: (user) => {
              console.log('delete user', user)
              if (user) {
                Swal.fire({
                  icon: 'success',
                  title: 'Usuario eliminado exitosamente.',
                  showConfirmButton: false,
                  timer: 2000
                });
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'No se pudo eliminar usuario.',
                  showConfirmButton: false,
                  timer: 2000
                });
              }
              this.getAll();
            },
            error: () => {
              Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: `Ocurrió un error al actualizar el usuario ${user.name}.`,
              });
            }
          })
        }
      }else {
        console.error('El usuario no tiene un ID válido.');
      }
    })
  }

  toggleShowPassword(user: Users) {
    user.showPassword = !user.showPassword;
  }
}
