import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisStats } from './avis-stats';

describe('AvisStats', () => {
  let component: AvisStats;
  let fixture: ComponentFixture<AvisStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvisStats],
    }).compileComponents();

    fixture = TestBed.createComponent(AvisStats);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
