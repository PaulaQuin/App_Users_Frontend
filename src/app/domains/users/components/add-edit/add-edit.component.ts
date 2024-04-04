import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UppercaseDirective } from '@shared/directives/uppercase.directive';
import { Users } from '@shared/models/users.model';

@Component({
  selector: 'app-add-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UppercaseDirective],
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.scss'
})
export class AddEditComponent {

  @Input() showModal: boolean = false;
  @Input() user = signal<Users | null>(null);
  @Input() addEdit: boolean = false;
  @Input() title: string = '';
  @Output() closeModal = new EventEmitter();
  @Output() userAddedOrEdited: EventEmitter<Users> = new EventEmitter<Users>();

  form: FormGroup;


  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(){
    this.formCreateEdit();
  }

  formCreateEdit(){

    if(!this.addEdit){
      this.form = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
    }
    else{
      this.form = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });

      this.form.get('name')?.setValue(this.user()?.name);
      this.form.get('email')?.setValue(this.user()?.email);
      this.form.get('password')?.setValue(this.user()?.password);

    }

  }


  AddUser(){
    if (this.form.invalid) {
      return;
    }
    const userData = this.form.getRawValue();
    const data : Users = {
      id: this.user()?.id,
      name: userData.name,
      email: userData.email,
      password: userData.password,
      addEdit: this.addEdit
    }
    this.userAddedOrEdited.emit(data);
  }

  close() {
    this.closeModal.emit();
  }

}
