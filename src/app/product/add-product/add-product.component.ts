import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductService } from "../services/product.service";
import { ProductType } from "../../shared/model/product-type";
import { QuantityType } from "../../shared/model/quantity-type";
import { Subscription } from "rxjs";
import { Stock } from "../../shared/model/stock";
import { Product, ProductForm } from "../../shared/model/product";
import { AuthService } from "../../auth/service/auth.service";
import { Profile } from "../../shared/model/profile";
import {AlertService} from "../../shared/services/alert/alert.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit, OnDestroy {

  public submitted = false;
  public productForm: FormGroup;

  profile : Profile | undefined;
  productTypes : ProductType[] = [];
  quantityTypes: QuantityType[] = [];

  ptSubscription : Subscription | undefined;
  qtSubscription : Subscription | undefined;

  stock: Stock | undefined;
  quantityType: QuantityType | undefined;
  productType: ProductType | undefined;
  product: Product | undefined;
  productFormApi: ProductForm | undefined;

  constructor(private formBuilder: FormBuilder,
              private productService: ProductService,
              private authService: AuthService,
              private alertService: AlertService) {
    this.productForm = formBuilder.group({
      price: ['', Validators.required],
      stock: ['', Validators.required],
      quantityType: ['', Validators.required],
      description: ['', Validators.required],
      productType: ['', Validators.required]
    });
  }

  get f(): any { return this.productForm?.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (this.productForm.invalid) {
      this.alertService.showDanger('Por favor ingrese todos los datos');
      return;
    }
    this.createStockFromForm();
    this.createQtyTypeFromForm();
    this.createProductTypeFromForm();
    this.createProductFromForm();
    this.createProductFormApi();

    this.saveProduct();
  }

  private saveProduct() {
    this.productService.saveProduct(this.productFormApi).subscribe({
      next: value => {
        this.productForm.reset();
        this.submitted = false;
        this.alertService.showSuccess('Producto agregado');
      },
      error: err => {
        if(err.error.error()){
          this.alertService.showDanger(err.error.error());
        }else{
          this.alertService.showDanger('Ocurrió un problema al agregar un producto');
        }
      }
    });
  }

  private createProductFormApi() {
    this.productFormApi = {
      product: this.product,
      sellerId: this.profile?.seller?.id
    }
  }

  private createProductFromForm() {
    this.product = {
      productType: this.productType,
      stock: this.stock,
      quantityType: this.quantityType,
      price: this.f.price.value,
      description: this.f.description.value
    }
  }

  private createProductTypeFromForm() {
    this.productType = {
      id: this.f.productType.value
    }
  }

  private createQtyTypeFromForm() {
    this.quantityType = {
      id: this.f.quantityType.value
    }
  }

  private createStockFromForm() {
    this.stock = {
      initialQuantity: this.f.stock.value,
      remainingQuantity: this.f.stock.value,
      soldQuantity: 0
    }
  }

  ngOnInit(): void {
    this.loadProductTypes();
    this.loadQtyTypes();
    this.profile = this.authService.currentUserProfileValue;
  }

  private loadProductTypes() {
    this.ptSubscription = this.productService.getAllProductType().subscribe({
      next: value => {
        this.productTypes = value;
      },
      error: err => {
        alert('Ocurrio un error tratando de obterner los tipos de productos');
      }
    });
  }

  private loadQtyTypes() {
    this.qtSubscription = this.productService.getAllQuantityType().subscribe({
      next: value => {
        this.quantityTypes = value;
      },
      error: err => {
        alert('Ocurrio un error tratando de obterner los tipos de cantidades de un producto');
      }
    })
  }

  ngOnDestroy(): void {
    if(this.qtSubscription){
      this.qtSubscription.unsubscribe();
    }
    if(this.ptSubscription){
      this.ptSubscription.unsubscribe();
    }
  }

}
