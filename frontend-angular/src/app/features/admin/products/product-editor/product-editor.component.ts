import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { IProduct } from '../../../../core/models/products.model';
import { PUBLIC_ENDPOINTS } from '../../../../core/constants/constants';
import { ProductsService } from '../../../../core/services/products.service';
import { CategoriesService } from '../../../../core/services/categories.service';
import { ICategory } from '../../../../core/models/categories.model';

@Component({
  selector: 'app-admin-product-editor',
  standalone: true,
  imports: [MatIconModule, CKEditorModule, ReactiveFormsModule],
  templateUrl: './product-editor.component.html',
  styleUrl: './product-editor.component.css'
})

export class ProductEditorComponent implements OnInit {
  public Editor = ClassicEditor;
  private routeSub!: Subscription;
  imagePicked: string = '';
  productData: IProduct | null = null;
  categoriesData: ICategory[] = [];
  editorForm!: FormGroup;
  imageUrl = PUBLIC_ENDPOINTS.IMAGE_CATEGORIES;

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastrService,
    private formBuilder: FormBuilder) {
    this.editorForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      orgPrice: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      images: new FormControl(null, [Validators.required]),
      hot: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getAllCategories();
    this.getProductById();
  }

  getProductById() {
    this.routeSub = this.route.params.subscribe((params) => {
      if (params['id']) {
        this.productsService.getProductById(params['id']).subscribe((response) => {
          this.productData = response.data;
          this.imagePicked = this.imageUrl + '/' + response.data.images;
          this.editorForm.patchValue({
            ...response.data,
            hot: response.data.hot ? '1' : '0',
            categoryId: response.data.categoryId._id
          });
        });
      }
    });
  }

  getAllCategories() {
    this.categoriesService.getAllCategories().subscribe({
      next: (response) => {
        this.categoriesData = response.data;
      }
    });
  }

  onSubmit() {
    if (this.editorForm.valid) {
      // if (this.productData) {
      //   this.categoriesService.updateCategory(this.productData._id, this.editorForm.value).subscribe((response) => {
      //     this.toast.success('Category updated successfully!');
      //   });
      // } else {
      //   this.categoriesService.createCategory(this.editorForm.value).subscribe((response) => {
      //     this.toast.success('Category created successfully!');
      //   });
      // }
      // this.router.navigate(['/admin/categories']);
    } else {
      this.editorForm.markAllAsTouched();

      if (!this.editorForm.value.image) {
        this.toast.error('Please upload images!');
        return;
      }
    }
  }
}
