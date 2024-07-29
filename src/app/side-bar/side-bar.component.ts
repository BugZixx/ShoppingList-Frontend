import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SidebarComponent {
  @Input() isSidebarOpen: boolean = false;
  @Output() toggleSidebarEmit = new EventEmitter<void>();
  @Output() selectAllEmit = new EventEmitter<void>();
  @Output() deselectAllEmit = new EventEmitter<void>();

  toggleSidebar() {
    this.toggleSidebarEmit.emit();
  }

  selectAll() {
    this.selectAllEmit.emit();
  }

  deselectAll() {
    this.deselectAllEmit.emit();
  }
}