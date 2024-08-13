import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Shop } from '../models/shop';
import { FormControl } from '@angular/forms';
import { ShopService } from '../services/shop.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shop-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shop-selector.component.html',
  styleUrl: './shop-selector.component.css'
})
export class ShopSelectorComponent implements OnInit {
  @Input() selectedShopId: number | null = null;
  @Output() shopChanged = new EventEmitter<number | null>();

  shops: Shop[] = [];
  shopControl: FormControl = new FormControl();

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.loadShops();

    // Set the selected shop in the control if it exists
    this.shopControl.setValue(this.selectedShopId);
    
    // Emit changes when the selected shop changes
    this.shopControl.valueChanges.subscribe(value => {
      console.log("trocou para " + this.selectedShopId);
      this.shopChanged.emit(value);
    });
  }

  loadShops(): void {
    this.shopService.getShops().subscribe(shops => {
      this.shops = shops;
    });
  }
}