import { Component, OnInit } from '@angular/core';
import { MatDialogContent } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { AuthFormType, authFormTexts } from '../../../../core/constants/enums';
import { AuthService } from '../../../../core/services/auth.service';
import { CustomValidators } from '../../../../core/validators/custom.validator';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [MatDialogContent, MatIconModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})

export class AuthComponent implements OnInit {
  form!: FormGroup;

  currentForm: AuthFormType = AuthFormType.LOGIN;
  currentFormTexts = authFormTexts[this.currentForm];
  forgotPasswordForm: AuthFormType = AuthFormType.FORGOT_PASSWORD;

  isLoginForm: boolean = this.currentForm === AuthFormType.LOGIN;
  isRegisterForm: boolean = this.currentForm === AuthFormType.REGISTER;
  isForgotPasswordForm: boolean = this.currentForm === AuthFormType.FORGOT_PASSWORD;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toast: ToastrService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.updateFormControl();
  }

  private updateFormControl(): void {
    if (this.currentForm === AuthFormType.LOGIN) {
      this.form = this.formBuilder.group({
        email: new FormControl('', [Validators.required, CustomValidators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
      });
    }

    if (this.currentForm === AuthFormType.REGISTER) {
      this.form = this.formBuilder.group({
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, CustomValidators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
      });
    }

    if (this.currentForm === AuthFormType.FORGOT_PASSWORD) {
      this.form = this.formBuilder.group({
        email: new FormControl('', [Validators.required, CustomValidators.email])
      });
    }
  }

  onFormChange(formType: AuthFormType): void {
    this.currentForm = formType;
    this.currentFormTexts = authFormTexts[this.currentForm];
    this.isLoginForm = this.currentForm === AuthFormType.LOGIN;
    this.isRegisterForm = this.currentForm === AuthFormType.REGISTER;
    this.isForgotPasswordForm = this.currentForm === AuthFormType.FORGOT_PASSWORD;

    this.updateFormControl();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    }

    if (!this.form.invalid) {
      if (this.currentForm === AuthFormType.LOGIN) {
        this.authService.loginUser(this.form.value).pipe(
          switchMap(response => {
            this.authService.isLoggedIn = true;
            localStorage.setItem('accessToken', response.data.accessToken);

            return this.authService.getUserProfile();
          })
        ).subscribe({
          next: (response) => {
            this.authService.setUserProfile(response.data);
            if (response.data.isAdmin) {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/user/information']);
            }
          },
          error: (error) => {
            console.error(error);
            if (error.status === 400) {
              this.toast.error('Incorrect email or password', 'Error', {
              });
            }
          }
        });
      }

      if (this.currentForm === AuthFormType.REGISTER) {
        this.authService.createUser(this.form.value).subscribe({
          next: (response) => {
            console.log(response);
            this.toast.success('User created successfully', 'Success');
            this.onFormChange(AuthFormType.LOGIN);
          },
          error: (error) => {
            console.error(error);
          }
        });
      }

      if (this.currentForm === AuthFormType.FORGOT_PASSWORD) {
        this.authService.forgotPassword(this.form.value.email).subscribe({
          next: (response) => {
            console.log(response);
            this.toast.success("Please check your email to recover your password");
          },
          error: (error) => {
            console.error(error);
          }
        });
      }
    }
  }

  onGoogleAuth() {
    window.location.href = 'http://localhost:3500/api/v1/auth/google/callback';
  }
}
