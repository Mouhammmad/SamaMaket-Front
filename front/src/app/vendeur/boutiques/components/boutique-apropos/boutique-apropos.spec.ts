import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueApropos } from './boutique-apropos';

describe('BoutiqueApropos', () => {
  let component: BoutiqueApropos;
  let fixture: ComponentFixture<BoutiqueApropos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoutiqueApropos],
    }).compileComponents();

    fixture = TestBed.createComponent(BoutiqueApropos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
