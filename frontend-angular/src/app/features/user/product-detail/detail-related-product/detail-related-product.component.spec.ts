import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRelatedProductComponent } from './detail-related-product.component';

describe('DetailRelatedProductComponent', () => {
  let component: DetailRelatedProductComponent;
  let fixture: ComponentFixture<DetailRelatedProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailRelatedProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailRelatedProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
