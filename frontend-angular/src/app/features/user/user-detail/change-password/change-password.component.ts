import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
  userId!: string;

  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private toast = inject(ToastrService);

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: new FormControl('', [Validators.required]),
      currentPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
    this.form.controls['email'].disable();
    this.authService.userProfile$.subscribe(data => {
      if (data) {
        this.userId = data._id;
        this.form.patchValue({ email: data.email });
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    } else {
      this.form.value.newPassword;
      this.authService.changePassword(this.userId, this.form.value).subscribe({
        next: (res) => {
          console.log(res);
          this.toast.success("Your password is updated");
        },
        error: (err) => {
          if (err?.status === 403) {
            this.toast.error("Your current password is incorrect");
          }
          console.error(err);
        }
      });
    }
  }
}
