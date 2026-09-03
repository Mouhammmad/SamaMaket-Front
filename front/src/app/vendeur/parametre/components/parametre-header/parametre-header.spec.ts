import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametreHeader } from './parametre-header';

describe('ParametreHeader', () => {
  let component: ParametreHeader;
  let fixture: ComponentFixture<ParametreHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParametreHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(ParametreHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
