import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PreviewService {

  private _current = new BehaviorSubject<any | null>(null);
  public current$ = this._current.asObservable();

  public modify$ = new Subject<any>();

  open(produit: any) {
    this._current.next(produit);
  }

  close() {
    this._current.next(null);
  }

  requestModify(produit: any) {
    this.modify$.next(produit);
    this.close();
  }

}
