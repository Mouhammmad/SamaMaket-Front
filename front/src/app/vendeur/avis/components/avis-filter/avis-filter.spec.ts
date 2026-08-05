import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisFilter } from './avis-filter';

describe('AvisFilter', () => {
  let component: AvisFilter;
  let fixture: ComponentFixture<AvisFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvisFilter],
    }).compileComponents();

    fixture = TestBed.createComponent(AvisFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
