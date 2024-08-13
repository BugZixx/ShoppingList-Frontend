import { Component } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RowNumSelectorComponent } from '../row-num-selector/row-num-selector.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { animate, style, transition, trigger } from '@angular/animations';
import { ShopService } from '../services/shop.service';
import { Shop } from '../models/shop';
import { ShopSelectorComponent } from "../shop-selector/shop-selector.component";

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule, MatDialogModule, MatBottomSheetModule, ShopSelectorComponent],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(20px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateX(0)' }),
        animate('0.1s ease-in', style({ opacity: 0, transform: 'translateX(20px)' }))
      ])
    ])
  ]
})
export class ProductCreateComponent {
  productForm: FormGroup;
  shops: Shop[] = [];

  product: Product = {
    product_id: 0, product_name: '', checked: true, row_num: 0, shop_id: 0
  };

  constructor(
    private fb: FormBuilder,
    private shopService: ShopService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private bottomSheet: MatBottomSheet
  ) {
    this.productForm = this.fb.group({
      product_name: [''],
      row_num: [''],
      shop_id: [null]
    });
  }

  ngOnInit(): void {
    this.loadShops();
    this.route.params.subscribe(params => {
      if (params['name']) {
        this.product.product_name = params['name'];
      }
    });
  }

  loadShops(): void {
    this.shopService.getShops().subscribe(shops => {
      this.shops = shops;
    });
  }

  addProduct(): void {
    if (this.productForm.valid) {
      const formValue = this.productForm.value;

      formValue.shop_id = formValue.shop_id ? formValue.shop_id : null;
      formValue.row_num = formValue.row_num ? formValue.row_num : this.product.row_num;
      console.log(formValue);
      console.log(this.product);

      this.productService.addProduct(formValue).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }

  openRowNumSelector(): void {
    const bottomSheetRef = this.bottomSheet.open(RowNumSelectorComponent);

    bottomSheetRef.afterDismissed().subscribe(result => {
      if (result !== undefined) {
        this.product.row_num = result;
      }
    });
  }
}