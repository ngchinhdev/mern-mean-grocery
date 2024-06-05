import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidators {
    static email(control: AbstractControl): ValidationErrors | null {
        const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        const valid = emailRegex.test(control.value);

        return valid ? null : { email: true };
    }

    static phone(control: AbstractControl): ValidationErrors | null {
        const phoneRegex = /^[0-9\+]{1,}[0-9\-]{3,15}$/;

        if (!control.value) {
            return null;
        }

        const valid = phoneRegex.test(control.value);

        return valid ? null : { phone: true };
    }

    static zipCode(control: AbstractControl): ValidationErrors | null {
        const zipCodeRegex = /^\d{5}(-\d{4})?$|^\d{6}$/;

        const valid = zipCodeRegex.test(control.value);

        return valid ? null : { zipCode: true };
    }
}