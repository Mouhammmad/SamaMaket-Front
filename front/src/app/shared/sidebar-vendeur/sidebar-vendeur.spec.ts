import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarVendeur } from './sidebar-vendeur';

describe('SidebarVendeur', () => {
  let component: SidebarVendeur;
  let fixture: ComponentFixture<SidebarVendeur>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarVendeur],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarVendeur);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
