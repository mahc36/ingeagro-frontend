import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ProductService } from "../services/product.service";
import { Product, ProductForm } from "../../shared/model/product";
import { AlertService } from "../../shared/services/alert/alert.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductType } from "../../shared/model/product-type";
import { QuantityType } from "../../shared/model/quantity-type";
import { Subscription } from "rxjs";
import { Stock } from "../../shared/model/stock";
import {Profile} from "../../shared/model/profile";
import {AuthService} from "../../auth/service/auth.service";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  @Input()
  public productId: number = 0;
  public submitted = false;
  public product: Product | undefined;
  productTypes : ProductType[] = [];
  quantityTypes: QuantityType[] = [];
  public productForm: FormGroup;

  ptSubscription : Subscription | undefined;
  qtSubscription : Subscription | undefined;
  pSubscription : Subscription | undefined;

  profile : Profile | undefined;

  stock: Stock | undefined;
  quantityType: QuantityType | undefined;
  productType: ProductType | undefined;
  productApi: Product | undefined;
  productFormApi: ProductForm | undefined;

  constructor(private activeModal: NgbActiveModal,
              private productService: ProductService,
              private alertService: AlertService,
              private formBuilder: FormBuilder,
              private authService: AuthService) {
    this.productForm = formBuilder.group({
      price: ['', Validators.required],
      stock: ['', Validators.required],
      quantityType: ['', Validators.required],
      description: ['', Validators.required],
      productType: ['', Validators.required]
    });
  }

  get f(): any { return this.productForm?.controls; }

  closeModal(reason: any): any {
    this.activeModal.close(reason);
  }

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

    this.updateProduct();
  }

  private updateProduct() {
    this.pSubscription = this.productService.saveProduct(this.productFormApi).subscribe({
      next: value => {
        this.alertService.showSuccess('Producto editado');
        this.activeModal.close('Producto editado');
      },
      error: err => {
        if(err.error.error){
          this.alertService.showDanger(err.error.error);
        }else{
          this.alertService.showDanger('Ocurrió un problema al editar un producto');
        }
      }
    });
  }

  private createProductFormApi() {
    this.productFormApi = {
      product: this.product,
      updateProduct: true,
      sellerId: this.profile?.seller?.id
    }
  }

  private createProductFromForm() {
    this.product = {
      id: this.productId,
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
    if(this.productId > 0){
      // Llamado en cadena
      this.loadProductTypes();
      this.profile = this.authService.currentUserProfileValue;
    }
  }

  private loadProduct() {
    this.productService.getProductById(this.productId).subscribe({
      next: value => {
        this.product = value;
        if (!this.product) {
          this.editProductError();
        }
        this.productForm = this.formBuilder.group({
          price: [this.product.price, Validators.required],
          stock: [this.product.stock?.remainingQuantity, Validators.required],
          quantityType: [this.product.quantityType?.id, Validators.required],
          description: [this.product.description, Validators.required],
          productType: [this.product.productType?.id, Validators.required]
        });

      },
      error: err => {
        this.editProductError();
      }
    });
  }

  private loadQtyTypes() {
    this.qtSubscription = this.productService.getAllQuantityType().subscribe({
      next: value => {
        this.quantityTypes = value;
        this.loadProduct();
      },
      error: err => {
        alert('Ocurrio un error tratando de obterner los tipos de cantidades de un producto');
      }
    })
  }

  private loadProductTypes() {
    this.ptSubscription = this.productService.getAllProductType().subscribe({
      next: value => {
        this.productTypes = value;
        this.loadQtyTypes();
      },
      error: err => {
        alert('Ocurrio un error tratando de obterner los tipos de productos');
      }
    });
  }

  private editProductError() {
    this.alertService.showDanger('No se pudo obtener información del producto a editar');
    this.closeModal('No hay producto a editar');
  }
}
