import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ville } from './ville';

describe('Ville', () => {
  let component: Ville;
  let fixture: ComponentFixture<Ville>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ville],
    }).compileComponents();

    fixture = TestBed.createComponent(Ville);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
