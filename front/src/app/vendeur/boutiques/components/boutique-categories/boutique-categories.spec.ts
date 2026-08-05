import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueCategories } from './boutique-categories';

describe('BoutiqueCategories', () => {
  let component: BoutiqueCategories;
  let fixture: ComponentFixture<BoutiqueCategories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoutiqueCategories],
    }).compileComponents();

    fixture = TestBed.createComponent(BoutiqueCategories);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
