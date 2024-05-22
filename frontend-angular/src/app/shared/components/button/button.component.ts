import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})

export class ButtonComponent implements OnInit {
  @Input() text!: string;
  @Input() type!: string;
  @Input() linkTo: string = '';
  @Input() rounded!: 'little' | 'much';

  constructor() { }

  ngOnInit(): void {
    if (!this.text) {
      this.text = 'Button';
    }
  }
}
