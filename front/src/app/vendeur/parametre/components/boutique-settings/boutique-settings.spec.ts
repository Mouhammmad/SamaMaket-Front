import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueSettings } from './boutique-settings';

describe('BoutiqueSettings', () => {
  let component: BoutiqueSettings;
  let fixture: ComponentFixture<BoutiqueSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoutiqueSettings],
    }).compileComponents();

    fixture = TestBed.createComponent(BoutiqueSettings);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
