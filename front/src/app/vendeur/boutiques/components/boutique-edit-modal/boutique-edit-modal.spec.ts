import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueEditModal } from './boutique-edit-modal';

describe('BoutiqueEditModal', () => {
  let component: BoutiqueEditModal;
  let fixture: ComponentFixture<BoutiqueEditModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoutiqueEditModal],
    }).compileComponents();

    fixture = TestBed.createComponent(BoutiqueEditModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
