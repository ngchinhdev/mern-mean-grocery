import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-admin-product-editor',
  standalone: true,
  imports: [MatIconModule, CKEditorModule],
  templateUrl: './product-editor.component.html',
  styleUrl: './product-editor.component.css'
})

export class ProductEditorComponent {
  public Editor = ClassicEditor;
}
