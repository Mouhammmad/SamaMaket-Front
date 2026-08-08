import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalerieProduit } from './galerie-produit';

describe('GalerieProduit', () => {
  let component: GalerieProduit;
  let fixture: ComponentFixture<GalerieProduit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalerieProduit],
    }).compileComponents();

    fixture = TestBed.createComponent(GalerieProduit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
