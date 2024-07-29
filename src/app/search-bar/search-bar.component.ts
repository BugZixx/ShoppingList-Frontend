import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  @Input() searchText: string = '';
  @Output() searchTextChange = new EventEmitter<string>();

  onSearchChange() {
    this.searchTextChange.emit(this.searchText);
  }
}
