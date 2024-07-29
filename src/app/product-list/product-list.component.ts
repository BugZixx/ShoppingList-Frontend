import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-20px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateX(0)' }),
        animate('0s ease-in', style({ opacity: 0, transform: 'translateX(-20px)' }))
      ])
    ]),
    trigger('listAnimation', [
      transition('* => *', [
        // each time the binding value changes
        query(':enter', [
          style({ opacity: 0 }),
          stagger(100, [
            animate('0.1s', style({ opacity: 1 }))
          ])
        ], { optional: true }),
        query(':leave', [
          stagger(100, [
            animate('0.1s', style({ opacity: 0 }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class ProductListComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchText: string = '';
  isSaveButtonVisible: boolean = false;
  isSidebarOpen: boolean = false;

  constructor(private productService: ProductService, private toastr: ToastrService) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products.sort((a, b) => {
        // First sort by checked status (checked first)
        if (a.checked !== b.checked) {
          return a.checked ? -1 : 1;
        }
        // If both have the same checked status, sort by row number
        return a.row_num - b.row_num;
      });
      this.filterProducts();
    });
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter(product =>
      product.product_name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  onCheckboxChange(): void {
    this.isSaveButtonVisible = true;
  }

  toggleCheckbox(product: Product): void {
    product.checked = !product.checked;
    this.onCheckboxChange();
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  updateCheckedStatus(): void {
    this.productService.updateProducts(this.products).subscribe(
      response => {
        console.log('Updated products:', response);
        this.loadProducts(); // Refresh the product list
        this.isSaveButtonVisible = false; // Hide the button after saving

        // Show success toast message
        this.toastr.success(`<div class="custom-toast-message">Changes have been saved successfully!</div>`, '', {
          toastClass: 'ngx-toastr custom-toast',
          enableHtml: true,
        });
      },
      error => {
        // Show error toast message
        this.toastr.error(`<div class="custom-toast-message">Failed to save changes. Please try again.</div>`, '', {
          toastClass: 'ngx-toastr custom-toast',
          enableHtml: true,
        });
      }
    );
  }

  selectAll(): void {
    this.products.forEach(product => product.checked = true);
    this.onCheckboxChange();
    this.toggleSidebar();
  }

  deselectAll(): void {
    this.products.forEach(product => product.checked = false);
    this.onCheckboxChange();
    this.toggleSidebar();
  }
}
