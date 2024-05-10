import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularProductComponent } from './popular-products.component';

describe('PopularProductComponent', () => {
  let component: PopularProductComponent;
  let fixture: ComponentFixture<PopularProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularProductComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PopularProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
