import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueEmpty } from './catalogue-empty';

describe('CatalogueEmpty', () => {
  let component: CatalogueEmpty;
  let fixture: ComponentFixture<CatalogueEmpty>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogueEmpty],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogueEmpty);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
