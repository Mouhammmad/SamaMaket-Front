import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendeurDetail } from './vendeur-detail';

describe('VendeurDetail', () => {
  let component: VendeurDetail;
  let fixture: ComponentFixture<VendeurDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendeurDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(VendeurDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
