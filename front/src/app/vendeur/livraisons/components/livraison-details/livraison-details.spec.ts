import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivraisonDetails } from './livraison-details';

describe('LivraisonDetails', () => {
  let component: LivraisonDetails;
  let fixture: ComponentFixture<LivraisonDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivraisonDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(LivraisonDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
