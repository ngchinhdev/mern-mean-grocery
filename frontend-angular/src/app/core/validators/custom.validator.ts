import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidators {
    static email(control: AbstractControl): ValidationErrors | null {
        const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        const valid = emailRegex.test(control.value);

        return valid ? null : { email: true };
    }
}