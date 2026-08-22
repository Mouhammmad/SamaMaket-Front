import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendeurFiltres } from './vendeur-filtres';

describe('VendeurFiltres', () => {
  let component: VendeurFiltres;
  let fixture: ComponentFixture<VendeurFiltres>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendeurFiltres],
    }).compileComponents();

    fixture = TestBed.createComponent(VendeurFiltres);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
