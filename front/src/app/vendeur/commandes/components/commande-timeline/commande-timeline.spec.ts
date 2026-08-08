import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeTimeline } from './commande-timeline';

describe('CommandeTimeline', () => {
  let component: CommandeTimeline;
  let fixture: ComponentFixture<CommandeTimeline>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandeTimeline],
    }).compileComponents();

    fixture = TestBed.createComponent(CommandeTimeline);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
