import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisHeader } from './avis-header';

describe('AvisHeader', () => {
  let component: AvisHeader;
  let fixture: ComponentFixture<AvisHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvisHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(AvisHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
