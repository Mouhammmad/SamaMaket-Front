import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AdminCommandes } from './commandes';
import { AdminCommandesService } from '../../core/services/admin-commande';

describe('AdminCommandes', () => {
  let component: AdminCommandes;
  let fixture: ComponentFixture<AdminCommandes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCommandes],
      providers: [
        {
          provide: AdminCommandesService,
          useValue: {
            getCommandes: () => of([]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminCommandes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
