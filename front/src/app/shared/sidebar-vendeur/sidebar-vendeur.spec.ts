import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

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

  it('should expose router links for the seller navigation', () => {
    const links = fixture.debugElement.queryAll(By.directive(RouterLink));
    expect(links.length).toBeGreaterThan(0);
  });
});
