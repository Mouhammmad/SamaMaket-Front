import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueTabs } from './boutique-tabs';

describe('BoutiqueTabs', () => {
  let component: BoutiqueTabs;
  let fixture: ComponentFixture<BoutiqueTabs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoutiqueTabs],
    }).compileComponents();

    fixture = TestBed.createComponent(BoutiqueTabs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
