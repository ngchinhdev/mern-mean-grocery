import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PUBLIC_ENDPOINTS } from '../../../../core/constants/urls';

@Component({
  selector: 'app-detail-images',
  standalone: true,
  imports: [],
  templateUrl: './detail-images.component.html',
  styleUrl: './detail-images.component.css'
})

export class DetailImagesComponent implements OnInit, OnChanges {
  @Input() images!: string[];
  curImage: string = '';
  imageUrl = PUBLIC_ENDPOINTS.IMAGE_PRODUCTS;

  ngOnInit(): void {
    if (this.images && this.images.length > 0) {
      this.curImage = this.images[0];
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['images']) {
      if (this.images && this.images.length > 0) {
        this.curImage = this.images[0];
      }
    }
  }

  onChangeImage(url: string) {
    this.curImage = url;
  }

  get imm() {
    return this.curImage;
  }
}
