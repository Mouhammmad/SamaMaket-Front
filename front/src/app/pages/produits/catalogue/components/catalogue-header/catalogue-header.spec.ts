import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueHeader } from './catalogue-header';

describe('CatalogueHeader', () => {
  let component: CatalogueHeader;
  let fixture: ComponentFixture<CatalogueHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogueHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogueHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
