import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadAppSectionComponent } from './download-app-section.component';

describe('DownloadAppSectionComponent', () => {
  let component: DownloadAppSectionComponent;
  let fixture: ComponentFixture<DownloadAppSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadAppSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DownloadAppSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
