import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { Rapport } from './rapports';
import { AdminStatistiquesService } from '../../core/services/admin-statistiques';

describe('Rapport', () => {
  let component: Rapport;
  let fixture: ComponentFixture<Rapport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rapport],
      providers: [
        {
          provide: AdminStatistiquesService,
          useValue: {
            getStatistiques: () => of({}),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Rapport);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
