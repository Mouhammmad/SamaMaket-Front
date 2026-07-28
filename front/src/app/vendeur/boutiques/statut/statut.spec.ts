import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Statut } from './statut';

describe('Statut', () => {
  let component: Statut;
  let fixture: ComponentFixture<Statut>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Statut],
    }).compileComponents();

    fixture = TestBed.createComponent(Statut);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
