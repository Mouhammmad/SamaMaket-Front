import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivraisonFilter } from './livraison-filter';

describe('LivraisonFilter', () => {
  let component: LivraisonFilter;
  let fixture: ComponentFixture<LivraisonFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivraisonFilter],
    }).compileComponents();

    fixture = TestBed.createComponent(LivraisonFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
