import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailImagesComponent } from './detail-images.component';

describe('DetailImagesComponent', () => {
  let component: DetailImagesComponent;
  let fixture: ComponentFixture<DetailImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailImagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
