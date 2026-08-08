import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeFacture } from './commande-facture';

describe('CommandeFacture', () => {
  let component: CommandeFacture;
  let fixture: ComponentFixture<CommandeFacture>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandeFacture],
    }).compileComponents();

    fixture = TestBed.createComponent(CommandeFacture);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
