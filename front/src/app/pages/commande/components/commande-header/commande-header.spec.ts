import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeHeader } from './commande-header';

describe('CommandeHeader', () => {
  let component: CommandeHeader;
  let fixture: ComponentFixture<CommandeHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandeHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(CommandeHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
