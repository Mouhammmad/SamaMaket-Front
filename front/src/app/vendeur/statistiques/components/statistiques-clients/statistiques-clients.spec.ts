import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiquesClients } from './statistiques-clients';

describe('StatistiquesClients', () => {
  let component: StatistiquesClients;
  let fixture: ComponentFixture<StatistiquesClients>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatistiquesClients],
    }).compileComponents();

    fixture = TestBed.createComponent(StatistiquesClients);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
