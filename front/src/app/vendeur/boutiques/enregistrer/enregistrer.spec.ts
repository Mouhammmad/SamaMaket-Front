import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Enregistrer } from './enregistrer';

describe('Enregistrer', () => {
  let component: Enregistrer;
  let fixture: ComponentFixture<Enregistrer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Enregistrer],
    }).compileComponents();

    fixture = TestBed.createComponent(Enregistrer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
