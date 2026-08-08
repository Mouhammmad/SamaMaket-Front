import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendeurLayout } from './vendeur-layout';

describe('VendeurLayout', () => {
  let component: VendeurLayout;
  let fixture: ComponentFixture<VendeurLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendeurLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(VendeurLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
