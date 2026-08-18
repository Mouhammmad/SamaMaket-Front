import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { FavoritesPageComponent } from './favorites-page.component';
import { FavoriteService } from './favorite.service';
import { Item } from './favorite.model';

describe('FavoritesPageComponent', () => {
  let fixture: ComponentFixture<FavoritesPageComponent>;
  let component: FavoritesPageComponent;
  let favoriteServiceSpy: jasmine.SpyObj<FavoriteService>;
  let httpMock: HttpTestingController;

  const mockItems: Item[] = [
    {
      id: 1,
      name: 'Écharpe Bazin Riche',
      slug: 'echarpe-bazin',
      price: 12500,
      category: 'Mode & Tissu',
      inStock: true,
    },
  ];

  beforeEach(async () => {
    favoriteServiceSpy = jasmine.createSpyObj('FavoriteService', [
      'getFavorites',
      'addFavorite',
      'removeFavorite',
    ]);

    await TestBed.configureTestingModule({
      imports: [FavoritesPageComponent, HttpClientTestingModule],
      providers: [{ provide: FavoriteService, useValue: favoriteServiceSpy }],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('affiche le message "Aucun favori pour le moment" si la liste est vide', () => {
    favoriteServiceSpy.getFavorites.and.returnValue(of([]));

    fixture = TestBed.createComponent(FavoritesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpMock.expectOne('/api/v1/products/?page_size=8').flush([]);

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Aucun favori pour le moment');
  });

  it('affiche la grille quand des favoris existent', () => {
    favoriteServiceSpy.getFavorites.and.returnValue(of(mockItems));

    fixture = TestBed.createComponent(FavoritesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpMock.expectOne('/api/v1/products/?page_size=8').flush([]);

    expect(component.items.length).toBe(1);
  });

  it('retire immédiatement l\'élément de la liste quand le bouton signale un retrait confirmé', () => {
    favoriteServiceSpy.getFavorites.and.returnValue(of(mockItems));

    fixture = TestBed.createComponent(FavoritesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpMock.expectOne('/api/v1/products/?page_size=8').flush([]);

    component.onToggle({ itemId: 1, isFavorite: false });

    expect(component.items.length).toBe(0);
  });
});
