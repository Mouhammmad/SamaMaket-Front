import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarClient } from './sidebar-client';

describe('SidebarClient', () => {
  let component: SidebarClient;
  let fixture: ComponentFixture<SidebarClient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarClient],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarClient);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
