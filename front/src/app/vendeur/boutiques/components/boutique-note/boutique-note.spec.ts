import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueNote } from './boutique-note';

describe('BoutiqueNote', () => {
  let component: BoutiqueNote;
  let fixture: ComponentFixture<BoutiqueNote>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoutiqueNote],
    }).compileComponents();

    fixture = TestBed.createComponent(BoutiqueNote);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
