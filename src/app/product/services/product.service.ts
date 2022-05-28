import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductType} from "../../shared/model/product-type";
import {QuantityType} from "../../shared/model/quantity-type";
import {Product, ProductForm} from "../../shared/model/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private getAllProductTypeUrl : string = `${environment.apiURL}/product-type/findAll`;
  private getAllQtyTypeUrl : string = `${environment.apiURL}/qty-type/findAll`;
  private productSaveUrl : string = `${environment.apiURL}/product/save`;
  private getAllProductsBySellerIdUrl : string = `${environment.apiURL}/product/getBySellerId`;
  private getAllProductsUrl : string = `${environment.apiURL}/product/findAll`;
  private getProductByIdUrl: string = `${environment.apiURL}/product/findById`;
  private removeProductByIdUrl: string = `${environment.apiURL}/product/remove`;

  constructor(private httpClient: HttpClient) { }

  public saveProduct(product: ProductForm | undefined) : Observable<Product> {
    return  this.httpClient.post(this.productSaveUrl, product);
  }

  public getAllProductType(): Observable<ProductType[]> {
    return this.httpClient.get<ProductType[]>(this.getAllProductTypeUrl);
  }

  public getAllQuantityType(): Observable<QuantityType[]> {
    return this.httpClient.get<QuantityType[]>(this.getAllQtyTypeUrl);
  }

  public getAllProductsBySellerId(sellerId : number | undefined) : Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.getAllProductsBySellerIdUrl}?sellerId=${sellerId}`);
  }

  public getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.getAllProductsUrl);
  }

  public getProductById(productId: number | undefined): Observable<Product> {
    return this.httpClient.get<Product>(`${this.getProductByIdUrl}?productId=${productId}`)
  }

  public removeProduct(productId: number) : Observable<Product> {
    return  this.httpClient.post(this.removeProductByIdUrl, {productId});
  }

}
