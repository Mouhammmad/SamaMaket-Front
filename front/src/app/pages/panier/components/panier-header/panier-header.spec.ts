import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanierHeader } from './panier-header';

describe('PanierHeader', () => {
  let component: PanierHeader;
  let fixture: ComponentFixture<PanierHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanierHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(PanierHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
