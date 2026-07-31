import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeDashboard } from './commande-dashboard';

describe('CommandeDashboard', () => {
  let component: CommandeDashboard;
  let fixture: ComponentFixture<CommandeDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandeDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(CommandeDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
