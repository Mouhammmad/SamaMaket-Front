import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanierEmpty } from './panier-empty';

describe('PanierEmpty', () => {
  let component: PanierEmpty;
  let fixture: ComponentFixture<PanierEmpty>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanierEmpty],
    }).compileComponents();

    fixture = TestBed.createComponent(PanierEmpty);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
