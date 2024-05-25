import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailInfomationComponent } from './detail-infomation.component';

describe('DetailInfomationComponent', () => {
  let component: DetailInfomationComponent;
  let fixture: ComponentFixture<DetailInfomationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailInfomationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailInfomationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
