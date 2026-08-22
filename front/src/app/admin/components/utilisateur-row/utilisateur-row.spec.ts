import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisateurRow } from './utilisateur-row';

describe('UtilisateurRow', () => {
  let component: UtilisateurRow;
  let fixture: ComponentFixture<UtilisateurRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtilisateurRow],
    }).compileComponents();

    fixture = TestBed.createComponent(UtilisateurRow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
