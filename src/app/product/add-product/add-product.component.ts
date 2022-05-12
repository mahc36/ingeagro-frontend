import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductService } from "../services/product.service";
import {IdentificationType} from "../../shared/model/identification-type";
import {Gender} from "../../shared/model/gender";
import {ProductType} from "../../shared/model/product-type";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  public submitted = false;
  public productForm: FormGroup;

  productTypes : ProductType[] = [];

  constructor(private formBuilder: FormBuilder, private productService: ProductService) {
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
    alert("Le dieron al botón submit");
  }

  ngOnInit(): void {
    this.productService.getAllProductType().subscribe({
      next: value => {
        this.productTypes = value;
      },
      error: err => {
        alert('Ocurrio un error tratando de obterner los tipos de productos');
      }
    });
  }
}
