import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponEditorComponent } from './coupon-editor.component';

describe('CouponEditorComponent', () => {
  let component: CouponEditorComponent;
  let fixture: ComponentFixture<CouponEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouponEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CouponEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
