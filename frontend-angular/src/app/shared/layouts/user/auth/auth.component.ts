import { Component } from '@angular/core';
import { MatDialog, MatDialogContent } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { AuthFormType, authFormTexts } from '../../../../core/constants/enums';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [MatDialogContent, MatIconModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})

export class AuthComponent {
  currentForm: AuthFormType = AuthFormType.LOGIN;
  currentFormTexts = authFormTexts[this.currentForm];
  forgotPasswordForm: AuthFormType = AuthFormType.FORGOT_PASSWORD;

  isLoginForm: boolean = this.currentForm === AuthFormType.LOGIN;
  isRegisterForm: boolean = this.currentForm === AuthFormType.REGISTER;
  isForgotPasswordForm: boolean = this.currentForm === AuthFormType.FORGOT_PASSWORD;

  onFormChange(formType: AuthFormType): void {
    this.currentForm = formType;
    this.currentFormTexts = authFormTexts[this.currentForm];
    this.isLoginForm = this.currentForm === AuthFormType.LOGIN;
    this.isRegisterForm = this.currentForm === AuthFormType.REGISTER;
    this.isForgotPasswordForm = this.currentForm === AuthFormType.FORGOT_PASSWORD;
  }
}
