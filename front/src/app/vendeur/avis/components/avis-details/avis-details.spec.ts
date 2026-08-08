import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisDetails } from './avis-details';

describe('AvisDetails', () => {
  let component: AvisDetails;
  let fixture: ComponentFixture<AvisDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvisDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(AvisDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
