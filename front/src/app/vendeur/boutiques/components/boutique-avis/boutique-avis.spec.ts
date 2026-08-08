import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueAvis } from './boutique-avis';

describe('BoutiqueAvis', () => {
  let component: BoutiqueAvis;
  let fixture: ComponentFixture<BoutiqueAvis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoutiqueAvis],
    }).compileComponents();

    fixture = TestBed.createComponent(BoutiqueAvis);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
