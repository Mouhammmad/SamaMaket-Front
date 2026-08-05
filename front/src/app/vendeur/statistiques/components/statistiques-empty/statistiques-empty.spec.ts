import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiquesEmpty } from './statistiques-empty';

describe('StatistiquesEmpty', () => {
  let component: StatistiquesEmpty;
  let fixture: ComponentFixture<StatistiquesEmpty>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatistiquesEmpty],
    }).compileComponents();

    fixture = TestBed.createComponent(StatistiquesEmpty);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
