import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivraisonList } from './livraison-list';

describe('LivraisonList', () => {
  let component: LivraisonList;
  let fixture: ComponentFixture<LivraisonList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivraisonList],
    }).compileComponents();

    fixture = TestBed.createComponent(LivraisonList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
