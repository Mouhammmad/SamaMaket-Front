import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchatRapide } from './achat-rapide';

describe('AchatRapide', () => {
  let component: AchatRapide;
  let fixture: ComponentFixture<AchatRapide>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AchatRapide],
    }).compileComponents();

    fixture = TestBed.createComponent(AchatRapide);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
