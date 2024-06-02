import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.css'
})

export class FilterBarComponent {
  @Input() lengthProductFound: number = 0;
}
