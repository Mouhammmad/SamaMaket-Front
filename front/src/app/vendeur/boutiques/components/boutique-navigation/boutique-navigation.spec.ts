import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueNavigation } from './boutique-navigation';

describe('BoutiqueNavigation', () => {
  let component: BoutiqueNavigation;
  let fixture: ComponentFixture<BoutiqueNavigation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoutiqueNavigation],
    }).compileComponents();

    fixture = TestBed.createComponent(BoutiqueNavigation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
