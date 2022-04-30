import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(private activeModal: NgbActiveModal,
              private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      bornDate: ['', Validators.required],
      identificationNumber: ['', Validators.required],
      identificationType: ['', Validators.required],
      gender: ['', Validators.required]
    });
  }

  onSubmit(): void {
    console.log(this.f);
  }

  closeModal(reason: any): any {
    this.activeModal.close(reason);
  }

  get f(): any { return this.registerForm?.controls; }

  ngOnInit(): void {

  }

}
