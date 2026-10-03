import { Injectable, signal } from '@angular/core';

/** Estado compartido entre el catálogo y el formulario de pedido. */
@Injectable({ providedIn: 'root' })
export class OrderStateService {
  /** Nombre del pastel elegido en una tarjeta; el formulario lo consume y lo vuelve a null. */
  readonly modeloSeleccionado = signal<string | null>(null);
}
