import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiquesCards } from './statistiques-cards';

describe('StatistiquesCards', () => {
  let component: StatistiquesCards;
  let fixture: ComponentFixture<StatistiquesCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatistiquesCards],
    }).compileComponents();

    fixture = TestBed.createComponent(StatistiquesCards);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
