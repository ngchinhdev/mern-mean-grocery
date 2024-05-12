import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryEditorComponent } from './category-editor.component';

describe('CategoryEditorComponent', () => {
  let component: CategoryEditorComponent;
  let fixture: ComponentFixture<CategoryEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
