import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [MatIconModule, ReactiveFormsModule, CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})

export class InputComponent {
  @Input() form!: FormGroup;
  @Input() label?: string;
  @Input() icon?: string;
  @Input() value?: string;
  @Input() type!: string;
  @Input() placeholder!: string;
  @Input() formControlName: string = '';

  get control(): FormControl {
    return this.form.get(this.formControlName) as FormControl;
  }
}
