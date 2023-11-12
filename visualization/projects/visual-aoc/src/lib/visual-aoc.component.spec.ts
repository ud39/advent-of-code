import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualAocComponent } from './visual-aoc.component';

describe('VisualAocComponent', () => {
  let component: VisualAocComponent;
  let fixture: ComponentFixture<VisualAocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VisualAocComponent]
    });
    fixture = TestBed.createComponent(VisualAocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
