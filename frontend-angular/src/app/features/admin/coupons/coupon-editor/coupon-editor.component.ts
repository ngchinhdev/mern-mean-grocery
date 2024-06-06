import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { ICoupon } from '../../../../core/models/coupon.model';
import { CouponService } from '../../../../core/services/coupon.service';

@Component({
  selector: 'app-coupon-editor',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule],
  templateUrl: './coupon-editor.component.html',
  styleUrl: './coupon-editor.component.css'
})
export class CouponEditorComponent {
  private routeSub!: Subscription;
  data: ICoupon | null = null;
  editorForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private couponService: CouponService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastrService
  ) {
    this.editorForm = this.formBuilder.group({
      code: new FormControl('', [Validators.required]),
      discount: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      if (params['id']) {
        this.getCouponById(params['id']);
      }
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getCouponById(id: string) {
    this.couponService.getCouponById(id).subscribe((response) => {
      this.data = response.data;
      this.editorForm.patchValue(response.data);
    });
  }

  onSubmit() {
    console.log(this.editorForm.value);
    if (this.editorForm.valid) {
      if (this.data) {
        this.couponService.updateCoupon(this.data._id, {
          ...this.editorForm.value,
          startTime: new Date(this.editorForm.value.startDate).toISOString(),
          endTime: new Date(this.editorForm.value.endDate).toISOString(),
        }).subscribe((response) => {
          this.toast.success('Coupon updated successfully!');
        });
      } else {
        this.couponService.createCoupon({
          ...this.editorForm.value,
          startTime: new Date(this.editorForm.value.startDate).toISOString(),
          endTime: new Date(this.editorForm.value.endDate).toISOString(),
        }).subscribe((response) => {
          this.toast.success('Coupon created successfully!');
          this.router.navigate(['/admin/coupons']);
        });
      }
    } else {
      this.editorForm.markAllAsTouched();
    }
  }
}
