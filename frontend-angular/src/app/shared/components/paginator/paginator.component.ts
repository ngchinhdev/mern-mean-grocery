import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [PaginatorModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})

export class PaginatorComponent {
  @Input() totalRecords: number = 0;
  @Input() first!: number;
  @Input() rows!: number;

  @Output() pageChangeEvent = new EventEmitter<PageEvent>();

  constructor() { }

  onPageChange(event: PageEvent) {
    this.pageChangeEvent.emit(event);
    this.first = event.first;
    this.rows = event.rows;
    console.log(this.first, this.rows, event);
  }
}
