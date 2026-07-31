import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Boutique, Boutiques } from './boutiques';

describe('Boutiques', () => {
  let component: Boutiques;
  let fixture: ComponentFixture<Boutiques>;
  let boutiqueService: Boutique;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Boutiques, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Boutiques);
    component = fixture.componentInstance;
    boutiqueService = TestBed.inject(Boutique);
    httpMock = TestBed.inject(HttpTestingController);
    await fixture.whenStable();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the proxy-friendly boutique endpoint', () => {
    boutiqueService.getMaBoutique().subscribe();

    const req = httpMock.expectOne('/api/boutiques/ma/');
    expect(req.request.method).toBe('GET');
    req.flush({ id: 1, nom: 'Ma boutique' });
  });
});
