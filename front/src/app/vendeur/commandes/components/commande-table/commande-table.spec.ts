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

  it('should emit delete event when delete button is clicked', () => {
    component.commandes = [{ id: 1, numero: 'CMD-001' }];
    let emittedCommande: any;

    component.supprimer.subscribe((commande: any) => {
      emittedCommande = commande;
    });

    fixture.detectChanges();

    const deleteButton = fixture.nativeElement.querySelector('button.delete');
    deleteButton.click();

    expect(emittedCommande).toEqual(component.commandes[0]);
  });
});
