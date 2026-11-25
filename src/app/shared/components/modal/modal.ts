
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.css'
})
export class Modal {

  @Input() title = '';

  @Output() close = new EventEmitter<void>();

  closeModal(): void {
    console.log('Modal close clicked');
    this.close.emit();
  }
}
