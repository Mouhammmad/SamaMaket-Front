import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeFilter } from './commande-filter';

describe('CommandeFilter', () => {
  let component: CommandeFilter;
  let fixture: ComponentFixture<CommandeFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandeFilter],
    }).compileComponents();

    fixture = TestBed.createComponent(CommandeFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
