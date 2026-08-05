import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeEmpty } from './commande-empty';

describe('CommandeEmpty', () => {
  let component: CommandeEmpty;
  let fixture: ComponentFixture<CommandeEmpty>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandeEmpty],
    }).compileComponents();

    fixture = TestBed.createComponent(CommandeEmpty);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
