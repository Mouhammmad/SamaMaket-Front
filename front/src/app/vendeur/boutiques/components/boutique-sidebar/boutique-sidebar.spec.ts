import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueSidebar } from './boutique-sidebar';

describe('BoutiqueSidebar', () => {
  let component: BoutiqueSidebar;
  let fixture: ComponentFixture<BoutiqueSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoutiqueSidebar],
    }).compileComponents();

    fixture = TestBed.createComponent(BoutiqueSidebar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
