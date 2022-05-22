import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Buyer } from "../../shared/model/buyer";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BuyerService {

  private getAGuestUserUrl: string = `${environment.apiURL}/buyer/getABuyer`;

  constructor(private http: HttpClient) { }

  getAGuestUser(): Observable<Buyer>{
    return this.http.get<Buyer>(this.getAGuestUserUrl);
  }

}
