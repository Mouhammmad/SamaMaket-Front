import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffresHeader } from './offres-header';

describe('OffresHeader', () => {
  let component: OffresHeader;
  let fixture: ComponentFixture<OffresHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffresHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(OffresHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
