import { Component } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RowNumSelectorComponent } from '../row-num-selector/row-num-selector.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, MatDialogModule, MatBottomSheetModule],
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
  product: Product = { product_id: 0, product_name: '', checked: true, row_num: 0 };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['name']) {
        this.product.product_name = params['name'];
      }
    });
  }
  
  addProduct(): void {
    this.productService.addProduct(this.product).subscribe(() => {
      this.router.navigate(['/products']);
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