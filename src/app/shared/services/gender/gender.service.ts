import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Gender } from "../../model/gender";

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  private getAllUrl: string = `${environment.apiURL}/gender/findAll`;

  constructor(private httpClient: HttpClient) {
  }

  public getGenders(): Observable<Gender[]> {
    return this.httpClient.get<Gender[]>(this.getAllUrl);
  }
}
