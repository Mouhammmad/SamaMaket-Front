import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandePreview } from './commande-preview';

describe('CommandePreview', () => {
  let component: CommandePreview;
  let fixture: ComponentFixture<CommandePreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandePreview],
    }).compileComponents();

    fixture = TestBed.createComponent(CommandePreview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
