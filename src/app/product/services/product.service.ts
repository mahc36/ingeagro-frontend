import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductType} from "../../shared/model/product-type";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private getAllProductTypeUrl : string = `${environment.apiURL}/product-type/findAll`;

  constructor(private httpClient: HttpClient) { }

  public getAllProductType(): Observable<ProductType[]> {
    return this.httpClient.get<ProductType[]>(this.getAllProductTypeUrl);
  }
}
