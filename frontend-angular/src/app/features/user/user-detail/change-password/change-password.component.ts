import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})

export class ChangePasswordComponent implements OnInit {
  form!: FormGroup;

  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: new FormControl('', [Validators.required]),
      currentPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
    });
    this.form.controls['email'].disable();
    this.authService.userProfile$.subscribe(data => {
      this.form.patchValue({ email: data?.email });
    });
  }
}
