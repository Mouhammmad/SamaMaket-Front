import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueHeader } from './boutique-header';

describe('BoutiqueHeader', () => {
  let component: BoutiqueHeader;
  let fixture: ComponentFixture<BoutiqueHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoutiqueHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(BoutiqueHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
