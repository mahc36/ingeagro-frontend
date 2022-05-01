import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {RegisterComponent} from "../../user/modal/register/register.component";
import {AuthService} from "../../auth/service/auth.service";
import {Profile} from "../model/profile";
import {LoginComponent} from "../../user/modal/login/login.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  closeResult: string;
  isLoggedIn: boolean = false;

  constructor(private modalService: NgbModal,
              private authService: AuthService) {
    this.closeResult = "";
  }

  openRegisterForm(): void {
    this.openModal(RegisterComponent);
  }

  openLoginForm(): void {
    this.openModal(LoginComponent);
  }

  openModal(component: any): void {
    let modalRef: NgbModalRef;
    const options = {
      ariaLabelledBy: 'modal-basic-title',
      windowClass: 'app-open-modal logout-modal',
      backdropClass: 'light-blue-backdrop',
      size: 'lg',
      centered: true,
      scrollable: true
    };
    modalRef = this.modalService.open(component, options);
    modalRef.result.then((result) => {
      this.closeResult = `Cerrado con: ${result}`;
    }, (reason) => {
      this.closeResult = `Cerrado ${this.getDismissReason(reason)}`;
    });
  }

  public logout(): void {
    this.authService.logout();
    this.isLoggedIn =  this.authService.isLoggedIn();
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'Presionando Escape';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'Presionando afuera del recuadro';
    } else {
      return  `con: ${reason}`;
    }
  }

  ngOnInit(): void {
    this.isLoggedIn =  this.authService.isLoggedIn();
  }

}
