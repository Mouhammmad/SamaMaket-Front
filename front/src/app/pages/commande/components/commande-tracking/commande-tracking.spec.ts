import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeTracking } from './commande-tracking';

describe('CommandeTracking', () => {
  let component: CommandeTracking;
  let fixture: ComponentFixture<CommandeTracking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandeTracking],
    }).compileComponents();

    fixture = TestBed.createComponent(CommandeTracking);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
