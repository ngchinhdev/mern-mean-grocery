import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { CategoriesService } from '../../../../core/services/categories.service';
import { ICategory } from '../../../../core/models/categories.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-category-editor',
  standalone: true,
  imports: [MatIconModule, ReactiveFormsModule],
  templateUrl: './category-editor.component.html',
  styleUrl: './category-editor.component.css'
})

export class CategoryEditorComponent implements OnInit {
  @Input() data: ICategory | null = null;
  editorForm!: FormGroup;
  private routeSub!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private toast: ToastrService
  ) {
    this.editorForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      image: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit() {
    this.onGetCategoryById();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  onImagePicked(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      this.editorForm.patchValue({ image: file });
      // this.editorForm.get('image')?.updateValueAndValidity();  
    }
  }

  onGetCategoryById() {
    this.routeSub = this.route.params.subscribe((params) => {
      if (params['id']) {
        this.categoriesService.getCategoryById(params['id']).subscribe((response) => {
          console.log(response);
          this.data = response.data;
          this.editorForm.patchValue(response.data);
        });
      }
    });
  }

  onSubmit() {
    if (this.editorForm.valid) {
      if (this.data) {
        this.categoriesService.updateCategory(this.data._id, this.editorForm.value).subscribe((response) => {
          this.toast.success('Category updated successfully!', 'Success', {
            toastClass: "toast-icon bg-primary-600 ngx-toastr"
          });
        });
      } else {
        this.categoriesService.createCategory(this.editorForm.value).subscribe((response) => {
          this.toast.success('Category created successfully!');
        });
      }
    } else {
      this.editorForm.markAllAsTouched();
    }
  }
}
