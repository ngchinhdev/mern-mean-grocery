import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { InputComponent } from '../../../../shared/components/input/input.component';
import { AuthService } from '../../../../core/services/auth.service';
import { PUBLIC_ENDPOINTS } from '../../../../core/constants/urls';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-information',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, MatIconModule],
  templateUrl: './user-information.component.html',
  styleUrl: './user-information.component.css'
})

export class UserInformationComponent implements OnInit {
  form!: FormGroup;
  userAvatar!: string;
  userId!: string;

  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private toast = inject(ToastrService);

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl(),
      address: new FormControl(),
      avatar: new FormControl(),
    });

    this.authService.userProfile$.subscribe(data => {
      if (data) {
        this.userAvatar = PUBLIC_ENDPOINTS.IMAGE_USERS + '/' + data.avatar;
        this.userId = data._id;
        this.form.patchValue(data);
      }
    });
  }

  onImageRemove() {
    this.userAvatar = '';
    this.form.patchValue({ image: null });
  }

  onImagePicked(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      this.form.patchValue({ avatar: file });

      const reader = new FileReader();

      reader.onload = () => {
        this.userAvatar = reader.result as string;
      };

      reader.readAsDataURL(file);
      // this.form.get('image')?.updateValueAndValidity();  
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    } else {
      this.authService.updateUserProfile(this.userId, this.form.value).subscribe((response) => {
        this.toast.success('Your profile updated successfully!');
      });;
    }
  }
}
