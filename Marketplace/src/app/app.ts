import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
import { PanierService } from './services/panier.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit, OnDestroy {
  cartCount = 0;
  toastMessage = '';
  private subscriptions = new Subscription();

  constructor(
    private panierService: PanierService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.panierService.cartCount$.subscribe((count) => {
        this.cartCount = count;
      })
    );

    this.subscriptions.add(
      this.panierService.toastMessage$.subscribe((message) => {
        this.toastMessage = message;
        if (message) {
          setTimeout(() => {
            this.toastMessage = '';
          }, 2500);
        }
      })
    );

    if (this.authService.isAuthenticated()) {
      this.panierService.refreshCartCount().subscribe();
    }

    this.subscriptions.add(
      this.authService.token$.subscribe((token) => {
        if (token) {
          this.panierService.refreshCartCount().subscribe();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}