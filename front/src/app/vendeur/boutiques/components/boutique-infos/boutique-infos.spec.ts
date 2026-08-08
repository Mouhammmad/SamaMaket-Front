import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueInfos } from './boutique-infos';

describe('BoutiqueInfos', () => {
  let component: BoutiqueInfos;
  let fixture: ComponentFixture<BoutiqueInfos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoutiqueInfos],
    }).compileComponents();

    fixture = TestBed.createComponent(BoutiqueInfos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
