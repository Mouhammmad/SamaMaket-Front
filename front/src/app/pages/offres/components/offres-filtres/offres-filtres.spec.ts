import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffresFiltres } from './offres-filtres';

describe('OffresFiltres', () => {
  let component: OffresFiltres;
  let fixture: ComponentFixture<OffresFiltres>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffresFiltres],
    }).compileComponents();

    fixture = TestBed.createComponent(OffresFiltres);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
