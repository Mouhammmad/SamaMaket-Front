import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetourSettings } from './retour-settings';

describe('RetourSettings', () => {
  let component: RetourSettings;
  let fixture: ComponentFixture<RetourSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetourSettings],
    }).compileComponents();

    fixture = TestBed.createComponent(RetourSettings);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
