import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationProducts } from './confirmation-products';

describe('ConfirmationProducts', () => {
  let component: ConfirmationProducts;
  let fixture: ComponentFixture<ConfirmationProducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationProducts],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmationProducts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
