import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../models/product';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.css'
})
export class ProductTableComponent {
  @Input() products: Product[] = [];
  @Input() searchText: string = '';
  @Output() checkboxChange = new EventEmitter<Product>();

  toggleCheckbox(product: Product) {
    product.checked = !product.checked;
    this.checkboxChange.emit(product);
  }

  onCheckboxChange() {
    // Logic for handling checkbox change
  }
}