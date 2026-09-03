import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendeursFiltres } from './vendeurs-filtres';

describe('VendeursFiltres', () => {
  let component: VendeursFiltres;
  let fixture: ComponentFixture<VendeursFiltres>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendeursFiltres],
    }).compileComponents();

    fixture = TestBed.createComponent(VendeursFiltres);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
