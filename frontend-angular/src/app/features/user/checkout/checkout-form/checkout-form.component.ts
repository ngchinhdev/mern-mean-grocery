import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { CartService } from '../../../../core/services/cart.service';
import { ICreateOrder, IOrder } from '../../../../core/models/order.model';
import { AuthService } from '../../../../core/services/auth.service';
import { IUser } from '../../../../core/models/auth.model';
import { CustomValidators } from '../../../../core/validators/custom.validator';
import { OrderService } from '../../../../core/services/order.service';

@Component({
  selector: 'app-checkout-form',
  standalone: true,
  imports: [MatIconModule, ReactiveFormsModule],
  templateUrl: './checkout-form.component.html',
  styleUrl: './checkout-form.component.css'
})

export class CheckoutFormComponent implements OnInit {
  form!: FormGroup;
  user!: IUser | null;

  private formBuilder = inject(FormBuilder);
  private toast = inject(ToastrService);
  private cartService = inject(CartService);
  private orderService = inject(OrderService);
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, CustomValidators.email]),
      phone: new FormControl('', [Validators.required, CustomValidators.phone]),
      street: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      zipCode: new FormControl('', [Validators.required, CustomValidators.zipCode]),
    });

    this.authService.userProfile$.subscribe(user => this.user = user);
  }

  onSubmit() {
    if (!this.cartService.getCartItems().length) {
      this.toast.warning("You have no products to buy");
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
    } else {
      const payload: ICreateOrder = {
        userId: this.user?._id ? this.user._id : null,
        customerInfo: {
          firstName: this.form.value.firstName,
          lastName: this.form.value.lastName,
          email: this.form.value.email,
          phone: this.form.value.phone,
        },
        shippingInfo: {
          address: this.form.value.street,
          city: this.form.value.city,
          country: this.form.value.country,
          zipCode: this.form.value.zipCode,
        },
        paymentInfo: {
          isPaid: false,
          paymentMethod: 'Cash'
        },
        discount: 0,
        totalPrice: this.cartService.getTotalCartPrice(),
        orderItems: this.cartService.getCartItems().map(item => ({
          quantity: item.quantity,
          product: item.id
        }))
      };
      this.orderService.createOrder(payload).subscribe({
        next: (res) => {
          this.cartService.clearCart();
          if (this.user) {
            this.toast.success("You have placed your order successfully");
            this.router.navigate([`/order/${res.data._id}`]);
          } else {
            this.toast.success("Order successfully. Please check your email to see the invoice.");
            this.router.navigate([`/`]);
          }
          this.orderService.sendInvoice(res.data).subscribe({
            next: (res) => {
              console.log(res);
            },
            error: (err) => {
              console.log(err);
            }
          });
        },
        error: (err) => {
          this.toast.error("Order failed");
        }
      });
    }
  }

  onWarningMethod() {
    this.toast.warning("This method is not available");
  }
}
