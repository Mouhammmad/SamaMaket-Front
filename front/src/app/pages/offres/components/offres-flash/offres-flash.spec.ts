import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffresFlash } from './offres-flash';

describe('OffresFlash', () => {
  let component: OffresFlash;
  let fixture: ComponentFixture<OffresFlash>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffresFlash],
    }).compileComponents();

    fixture = TestBed.createComponent(OffresFlash);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
