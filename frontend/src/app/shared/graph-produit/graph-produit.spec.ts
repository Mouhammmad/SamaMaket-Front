import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphProduit } from './graph-produit';

describe('GraphProduit', () => {
  let component: GraphProduit;
  let fixture: ComponentFixture<GraphProduit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphProduit],
    }).compileComponents();

    fixture = TestBed.createComponent(GraphProduit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
