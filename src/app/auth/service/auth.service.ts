import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../../shared/model/user";
import { HttpClient } from "@angular/common/http";
import { Profile } from "../../shared/model/profile";
import { environment } from "../../../environments/environment";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl: string = `${environment.apiURL}/user/login-profile`;

  private currentUserProfileSubject: BehaviorSubject<Profile> | undefined;
  public currentUserProfile: Observable<Profile> | undefined;

  constructor(private http: HttpClient,
              private router: Router) {
    const userProfile = localStorage.getItem('currentUserProfile');
    if(userProfile){
      this.currentUserProfileSubject = new BehaviorSubject<Profile>(JSON.parse(userProfile));
    }
    this.currentUserProfile = this.currentUserProfileSubject?.asObservable();
  }

  public get currentUserProfileValue(): Profile | undefined {
    return this.currentUserProfileSubject?.value;
  }

  public isLoggedIn(): boolean {
    return undefined != this.currentUserProfileValue;
  }

  loginUser(user: User): void {
    this.login(user).subscribe({
      next : value => {
        localStorage.setItem('currentUserProfile', JSON.stringify(value));
        this.currentUserProfileSubject?.next(value);
        this.router.navigate(['/']);
      },
      error: err => {
        alert('Ocurrió un error tratando de loguearse');
      }
    });
  }

  private login(user: User) : Observable<Profile> {
    return this.http.post<Profile>(this.loginUrl, user);
  }

  public logout(): void {
    localStorage.removeItem('currentUserProfile');
    // @ts-ignore
    this.currentUserProfileSubject?.next(null);
  }

}
