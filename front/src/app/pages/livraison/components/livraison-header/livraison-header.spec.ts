import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivraisonHeader } from './livraison-header';

describe('LivraisonHeader', () => {
  let component: LivraisonHeader;
  let fixture: ComponentFixture<LivraisonHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivraisonHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(LivraisonHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
