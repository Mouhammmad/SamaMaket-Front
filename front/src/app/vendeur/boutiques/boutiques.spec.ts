import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Boutiques } from './boutiques';

describe('Boutiques', () => {
  let component: Boutiques;
  let fixture: ComponentFixture<Boutiques>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Boutiques],
    }).compileComponents();

    fixture = TestBed.createComponent(Boutiques);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
