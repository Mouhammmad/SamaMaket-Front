import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiquesAvis } from './statistiques-avis';

describe('StatistiquesAvis', () => {
  let component: StatistiquesAvis;
  let fixture: ComponentFixture<StatistiquesAvis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatistiquesAvis],
    }).compileComponents();

    fixture = TestBed.createComponent(StatistiquesAvis);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
