import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffresVides } from './offres-vides';

describe('OffresVides', () => {
  let component: OffresVides;
  let fixture: ComponentFixture<OffresVides>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffresVides],
    }).compileComponents();

    fixture = TestBed.createComponent(OffresVides);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
