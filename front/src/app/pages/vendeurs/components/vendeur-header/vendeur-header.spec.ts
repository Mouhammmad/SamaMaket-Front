import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendeurHeader } from './vendeur-header';

describe('VendeurHeader', () => {
  let component: VendeurHeader;
  let fixture: ComponentFixture<VendeurHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendeurHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(VendeurHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
