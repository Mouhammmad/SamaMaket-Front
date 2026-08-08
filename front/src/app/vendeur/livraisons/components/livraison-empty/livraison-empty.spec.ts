import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivraisonEmpty } from './livraison-empty';

describe('LivraisonEmpty', () => {
  let component: LivraisonEmpty;
  let fixture: ComponentFixture<LivraisonEmpty>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivraisonEmpty],
    }).compileComponents();

    fixture = TestBed.createComponent(LivraisonEmpty);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
