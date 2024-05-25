import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPromotionComponent } from './detail-promotion.component';

describe('DetailPromotionComponent', () => {
  let component: DetailPromotionComponent;
  let fixture: ComponentFixture<DetailPromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailPromotionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
