import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCartControlComponent } from './add-cart-control.component';

describe('AddCartControlComponent', () => {
  let component: AddCartControlComponent;
  let fixture: ComponentFixture<AddCartControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCartControlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCartControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
