import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { CategoriesService } from '../../../../core/services/categories.service';
import { ICategory } from '../../../../core/models/categories.model';
import { PUBLIC_ENDPOINTS } from '../../../../core/constants/urls';

@Component({
  selector: 'app-admin-category-editor',
  standalone: true,
  imports: [MatIconModule, ReactiveFormsModule],
  templateUrl: './category-editor.component.html',
  styleUrl: './category-editor.component.css'
})

export class CategoryEditorComponent implements OnInit {
  private routeSub!: Subscription;
  imagePicked: string = '';
  data: ICategory | null = null;
  editorForm!: FormGroup;
  imageUrl = PUBLIC_ENDPOINTS.IMAGE_CATEGORIES;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastrService
  ) {
    this.editorForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      image: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      if (params['id']) {
        this.getCategoryById(params['id']);
      }
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  onImagePicked(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      this.editorForm.patchValue({ image: file });

      const reader = new FileReader();

      reader.onload = () => {
        this.imagePicked = reader.result as string;
      };

      reader.readAsDataURL(file);
      // this.editorForm.get('image')?.updateValueAndValidity();  
    }
  }

  onImageRemove() {
    this.imagePicked = '';
    this.editorForm.patchValue({ image: null });
  }

  getCategoryById(id: string) {
    this.categoriesService.getCategoryById(id).subscribe((response) => {
      this.data = response.data;
      this.imagePicked = this.imageUrl + '/' + response.data.image;
      this.editorForm.patchValue(response.data);
    });
  }

  onSubmit() {
    if (this.editorForm.valid) {
      if (this.data) {
        this.categoriesService.updateCategory(this.data._id, this.editorForm.value).subscribe((response) => {
          this.toast.success('Category updated successfully!');
        });
      } else {
        this.categoriesService.createCategory(this.editorForm.value).subscribe((response) => {
          this.toast.success('Category created successfully!');
          this.router.navigate(['/admin/categories']);
        });
      }
    } else {
      this.editorForm.markAllAsTouched();

      if (!this.editorForm.value.image) {
        this.toast.error('Please upload an image!');
        return;
      }
    }
  }
}
