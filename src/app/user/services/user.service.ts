import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import {Observable, throwError} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { User } from "../../shared/model/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private saveUrl : string = `${environment.apiURL}/user/save`;

  constructor(private httpClient: HttpClient) { }

  public save(user: User | undefined): Observable<User> {
    if(!user){
      // TODO - investigate and improve this
      return throwError('Usuario no puede ser nulo');
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'my-auth-token'
      })
    };
    return this.httpClient.post<User>(this.saveUrl, user);
  }


}
