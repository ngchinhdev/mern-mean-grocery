import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroSwiperComponent } from './hero-swiper.component';

describe('HeroSwiperComponent', () => {
  let component: HeroSwiperComponent;
  let fixture: ComponentFixture<HeroSwiperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroSwiperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeroSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
