import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisEmpty } from './avis-empty';

describe('AvisEmpty', () => {
  let component: AvisEmpty;
  let fixture: ComponentFixture<AvisEmpty>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvisEmpty],
    }).compileComponents();

    fixture = TestBed.createComponent(AvisEmpty);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
