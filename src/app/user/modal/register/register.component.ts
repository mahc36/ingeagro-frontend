import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IdentificationTypeService } from "../../../shared/services/identification-type/identification-type.service";
import { IdentificationType } from "../../../shared/model/identification-type";
import { Subscription } from "rxjs";
import { Gender } from "../../../shared/model/gender";
import { GenderService } from "../../../shared/services/gender/gender.service";
import { Person } from "../../../shared/model/person";
import { User } from "../../../shared/model/user";
import { UserService } from "../../services/user.service";
import { AuthService } from "../../../auth/service/auth.service";
import {AlertService} from "../../../shared/services/alert/alert.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  justNumbersPattern = "^[0-9]*$"
  maxLengthIdentificationNumber = 10;
  minLengthIdentificationNumber = 10;

  // Create the JSON registration
  person : Person | undefined;
  user : User | undefined;
  gender : Gender | undefined;
  identificationType: IdentificationType | undefined;
  // ********* END ********
  createdUser: User | undefined;

  registerForm: FormGroup;
  submitted = false;
  identificationTypes : IdentificationType[] = [];
  genders : Gender[] = [];

  // SUBSCRIPTIONS
  itSubscription: Subscription | undefined;
  genderSubscription : Subscription | undefined;
  userSubscription : Subscription | undefined;

  constructor(private activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private identificationTypeService: IdentificationTypeService,
              private genderService: GenderService,
              private userService: UserService,
              private authService: AuthService,
              private alertService: AlertService) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      bornDate: ['', Validators.required],
      identificationNumber: ['', [
        Validators.required,
        Validators.pattern(this.justNumbersPattern),
        Validators.maxLength(this.maxLengthIdentificationNumber),
        Validators.minLength(this.minLengthIdentificationNumber)]],
      identificationType: ['', Validators.required],
      gender: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.createGenderFromForm();
    this.createIdentificationTypeFromForm();
    this.createPersonFromForm();
    this.createUserFromForm();
    this.saveUser();
  }

  private saveUser() : void {
    this.userSubscription = this.userService.save(this.user).subscribe({
      next: value => {
        this.createdUser = value;
        this.authService.loginUser(this.createdUser);
      },
      error: err => {
        this.alertService.showDanger('No se pudo registrar al usuario');
      }
    });
  }

  private createUserFromForm() {
    this.user = {
      username: this.f.username.value,
      password: this.f.password.value,
      person: this.person
    }
  }

  private createPersonFromForm() {
    let value = this.f.bornDate.value;
    const date = new Date();
    date.setFullYear(value.year, value.month - 1, value.day);
    this.person = {
      firstName: this.f.firstName.value,
      lastName: this.f.lastName.value,
      bornDate: date,
      identificationNumber: this.f.identificationNumber.value,
      gender: this.gender,
      identificationType: this.identificationType,
    }
  }

  private createIdentificationTypeFromForm() {
    this.identificationType = {
      id: this.f.identificationType.value
    }
  }

  private createGenderFromForm() {
    this.gender = {
      id: this.f.gender.value
    }
  }

  closeModal(reason: any): any {
    this.activeModal.close(reason);
  }

  get f(): any { return this.registerForm?.controls; }

  ngOnInit(): void {
    this.loadIdentificationTypes();
    this.loadGenders();
  }

  private loadGenders() : void {
    this.genderSubscription = this.genderService.getGenders().subscribe({
      next: value => {
        this.genders = value;
      },
      error: err => {
        this.alertService.showDanger('No se pudieron cargar los tipos de género');
      }
    })
  }

  private loadIdentificationTypes(): void {
    this.itSubscription = this.identificationTypeService.getIdentificationTypes().subscribe({
      next: value => {
        this.identificationTypes = value;
      },
      error: err => {
        this.alertService.showDanger('No se pudieron cargar los tipos de identificación');
      }
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe(this.itSubscription);
    this.unsubscribe(this.genderSubscription);
    this.unsubscribe(this.userSubscription);
  }

  private unsubscribe(subscription: Subscription | undefined){
    subscription?.unsubscribe();
  }

}
