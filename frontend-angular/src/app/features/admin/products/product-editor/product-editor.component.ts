import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription, forkJoin } from 'rxjs';

import { IProduct } from '../../../../core/models/products.model';
import { PUBLIC_ENDPOINTS } from '../../../../core/constants/urls';
import { ProductsService } from '../../../../core/services/products.service';
import { CategoriesService } from '../../../../core/services/categories.service';
import { ICategory } from '../../../../core/models/categories.model';
import { ShareService } from '../../../../core/services/share.service';

@Component({
  selector: 'app-admin-product-editor',
  standalone: true,
  imports: [MatIconModule, CKEditorModule, ReactiveFormsModule],
  templateUrl: './product-editor.component.html',
  styleUrl: './product-editor.component.css'
})

export class ProductEditorComponent implements OnInit, OnDestroy {
  public Editor = ClassicEditor;
  private routeSub!: Subscription;
  imagesPicked: string[] = [];
  files: File[] = [];
  productData: IProduct | null = null;
  categoriesData: ICategory[] = [];
  editorForm!: FormGroup;
  imageUrl = PUBLIC_ENDPOINTS.IMAGE_PRODUCTS;

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private shareService: ShareService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastrService,
    private formBuilder: FormBuilder) {
    this.editorForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ]),
      orgPrice: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ]),
      quantity: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ]),
      description: new FormControl('', [Validators.required]),
      images: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(4)
      ]),
      hot: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getAllCategories();

    this.routeSub = this.route.params.subscribe((params) => {
      if (params['id']) {
        this.getProductById(params['id']);
      }
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getProductById(id: string) {
    this.productsService.getProductById(id).subscribe((response) => {
      this.productData = response.data;
      const imageObservables: Observable<File>[] = [];
      response.data.images?.forEach((image: string) => {
        const mimeType = image.split('.').pop();
        this.imagesPicked.push(this.imageUrl + '/' + image);
        imageObservables.push(this.getImageAsBlob(this.imageUrl + '/' + image, mimeType!));
      });
      forkJoin(imageObservables).subscribe((files: File[]) => {
        this.files = files;
        console.log(this.files);
        this.editorForm.patchValue({
          ...response.data,
          hot: response.data.hot ? '1' : '0',
          categoryId: response.data.categoryId._id,
        });
      });
    });
  }

  getAllCategories(page: number = 1, limit: number = 10) {
    this.categoriesService.getAllCategories(page, limit).subscribe({
      next: (response) => {
        this.categoriesData = response.data;
      }
    });
  }

  getImageAsBlob(imageUrl: string, mimeType: string): Observable<File> {
    return this.shareService.getImageAsBlob(imageUrl, mimeType);
  }

  onImagePicked(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      const files = input.files;

      this.files.push(files[0]);
      this.editorForm.patchValue({ images: this.files });

      const reader = new FileReader();
      reader.onload = () => {
        this.imagesPicked.push(reader.result as string);
      };

      reader.readAsDataURL(files[0]);
      // this.editorForm.get('image')?.updateValueAndValidity();  
    }
  }

  onRemoveImage(index: number) {
    this.imagesPicked.splice(index, 1);
    this.files.splice(index, 1);
    this.editorForm.patchValue({ images: this.files });
  }

  onSubmit() {
    if (this.editorForm.valid) {
      if (this.files?.length < 2) {
        this.toast.error('Please upload 2-4 images!');
        return;
      }
      if (this.productData) {
        this.productsService.updateProduct(
          this.productData._id,
          {
            ...this.editorForm.value,
            hot: this.editorForm.value.hot === '1' ? true : false,
            images: this.files
          }).subscribe({
            next: (response) => {
              this.toast.success('Product updated successfully!');
            },
            error: (error) => {
              this.toast.error(error);
            }
          });
      } else {
        this.productsService.createProduct({
          ...this.editorForm.value,
          hot: this.editorForm.value.hot === '1' ? true : false,
          images: this.files
        }).subscribe({
          next: (response) => {
            this.toast.success('Product created successfully!');
            this.router.navigate(['/admin/products']);
          },
          error: (error) => {
            this.toast.error(error);
          }
        });
      }
    } else {
      this.editorForm.markAllAsTouched();
      if (this.files?.length < 2) {
        this.toast.error('Please upload 2-4 images!');
        return;
      }
    }
  }
}
