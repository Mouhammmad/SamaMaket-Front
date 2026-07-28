import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeTable } from './commande-table';

describe('CommandeTable', () => {
  let component: CommandeTable;
  let fixture: ComponentFixture<CommandeTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandeTable],
    }).compileComponents();

    fixture = TestBed.createComponent(CommandeTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
