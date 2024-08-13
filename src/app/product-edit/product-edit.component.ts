import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { RowNumSelectorComponent } from '../row-num-selector/row-num-selector.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { ShopSelectorComponent } from "../shop-selector/shop-selector.component";

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, MatDialogModule, MatBottomSheetModule, ShopSelectorComponent],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css',
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

export class ProductEditComponent implements OnInit {
  productForm: FormGroup;
  selectedShopId: number | null = null;
  product: Product = {
    product_id: 0, product_name: '', checked: false, row_num: 0, shop_id: 0
  };

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet
  ) {
    this.productForm = this.fb.group({
      product_name: [''],
      row_num: [''],
      shop: [null]
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(id).subscribe(product => {
      this.product = product;
    });
  }

  onShopChanged(shopId: number | null): void {
    this.selectedShopId = shopId;
    this.productForm.patchValue({ shop: shopId });
  }

  updateProduct(): void {
    this.productService.updateProduct(this.product.product_id, this.product).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }

  deleteProduct(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const id = this.product.product_id;
        this.productService.deleteProduct(id).subscribe(() => {
          this.router.navigate(['/products']);
        });
      }
    });
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