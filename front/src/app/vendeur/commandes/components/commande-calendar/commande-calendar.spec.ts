import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeCalendar } from './commande-calendar';

describe('CommandeCalendar', () => {
  let component: CommandeCalendar;
  let fixture: ComponentFixture<CommandeCalendar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandeCalendar],
    }).compileComponents();

    fixture = TestBed.createComponent(CommandeCalendar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
