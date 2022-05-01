import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from "../../../shared/model/user";
import { AuthService } from "../../../auth/service/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  user : User | undefined;

  constructor(private activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private authService: AuthService) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  closeModal(reason: any): any {
    this.activeModal.close(reason);
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.createUserFromForm();
    this.login();
  }

  get f(): any { return this.loginForm?.controls; }

  private createUserFromForm() {
    this.user = {
      username: this.f.username.value,
      password: this.f.password.value
    }
  }

  private login(): void {
    if(this.user){
      this.authService.loginUser(this.user);
    }
  }

  ngOnInit(): void {
  }

}
