import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-row-num-selector',
  standalone: true,
  imports: [CommonModule, MatListModule],
  templateUrl: './row-num-selector.component.html',
  styleUrl: './row-num-selector.component.css'
})
export class RowNumSelectorComponent {
  rowNumbers: number[] = Array.from({ length: 29 }, (_, i) => i - 1); // Generate numbers 1 to 25
  selectedRowNum: number | null = null;
  minSelectableNumber: number = 1;
  maxSelectableNumber: number = 25;

  constructor(private bottomSheetRef: MatBottomSheetRef<RowNumSelectorComponent>) {}

  selectRowNum(rowNum: number): void {
    this.selectedRowNum = rowNum;
    this.bottomSheetRef.dismiss(rowNum);
  }

  close(): void {
    this.bottomSheetRef.dismiss();
  }
}
