import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboveFooterComponent } from './above-footer.component';

describe('AboveFooterComponent', () => {
  let component: AboveFooterComponent;
  let fixture: ComponentFixture<AboveFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboveFooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboveFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
