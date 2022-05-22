import { Component, Input, OnInit } from '@angular/core';
import { ProductType } from "../../shared/model/product-type";

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.scss']
})
export class ProductImageComponent implements OnInit {

  @Input() productType: ProductType | undefined;

  constructor() { }

  getProductType(): string | undefined{
    return this.productType?.name?.toUpperCase();
  }

  ngOnInit(): void {
  }

}
