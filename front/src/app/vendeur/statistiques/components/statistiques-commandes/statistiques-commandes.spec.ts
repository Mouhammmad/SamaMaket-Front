import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiquesCommandes } from './statistiques-commandes';

describe('StatistiquesCommandes', () => {
  let component: StatistiquesCommandes;
  let fixture: ComponentFixture<StatistiquesCommandes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatistiquesCommandes],
    }).compileComponents();

    fixture = TestBed.createComponent(StatistiquesCommandes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
