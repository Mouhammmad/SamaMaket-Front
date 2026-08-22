import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendeursHeader } from './vendeurs-header';

describe('VendeursHeader', () => {
  let component: VendeursHeader;
  let fixture: ComponentFixture<VendeursHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendeursHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(VendeursHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
