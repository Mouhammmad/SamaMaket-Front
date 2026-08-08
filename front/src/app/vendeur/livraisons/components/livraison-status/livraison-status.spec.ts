import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivraisonStatus } from './livraison-status';

describe('LivraisonStatus', () => {
  let component: LivraisonStatus;
  let fixture: ComponentFixture<LivraisonStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivraisonStatus],
    }).compileComponents();

    fixture = TestBed.createComponent(LivraisonStatus);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
