import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeCard } from './commande-card';

describe('CommandeCard', () => {
  let component: CommandeCard;
  let fixture: ComponentFixture<CommandeCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandeCard],
    }).compileComponents();

    fixture = TestBed.createComponent(CommandeCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
