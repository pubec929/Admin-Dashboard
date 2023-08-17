import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsElementComponent } from './details-element.component';

describe('DetailsElementComponent', () => {
  let component: DetailsElementComponent;
  let fixture: ComponentFixture<DetailsElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsElementComponent]
    });
    fixture = TestBed.createComponent(DetailsElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
