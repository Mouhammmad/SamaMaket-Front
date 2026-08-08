import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeAnalytics } from './commande-analytics';

describe('CommandeAnalytics', () => {
  let component: CommandeAnalytics;
  let fixture: ComponentFixture<CommandeAnalytics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandeAnalytics],
    }).compileComponents();

    fixture = TestBed.createComponent(CommandeAnalytics);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
