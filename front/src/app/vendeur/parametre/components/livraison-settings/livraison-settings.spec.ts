import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivraisonSettings } from './livraison-settings';

describe('LivraisonSettings', () => {
  let component: LivraisonSettings;
  let fixture: ComponentFixture<LivraisonSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivraisonSettings],
    }).compileComponents();

    fixture = TestBed.createComponent(LivraisonSettings);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
