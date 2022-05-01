import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IdentificationType } from "../../model/identification-type";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class IdentificationTypeService {

  private getAllUrl : string = `${environment.apiURL}/identification-type/findAll`;

  constructor(private httpClient: HttpClient) { }

  public getIdentificationTypes(): Observable<IdentificationType[]> {
    return this.httpClient.get<IdentificationType[]>(this.getAllUrl);
  }

}
