import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffresCard } from './offres-card';

describe('OffresCard', () => {
  let component: OffresCard;
  let fixture: ComponentFixture<OffresCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffresCard],
    }).compileComponents();

    fixture = TestBed.createComponent(OffresCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
