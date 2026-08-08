import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiquesHeader } from './statistiques-header';

describe('StatistiquesHeader', () => {
  let component: StatistiquesHeader;
  let fixture: ComponentFixture<StatistiquesHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatistiquesHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(StatistiquesHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
