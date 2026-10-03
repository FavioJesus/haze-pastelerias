import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injector,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';

import { Categoria } from '../../core/models/pastel.model';
import { OrderStateService } from '../../core/services/order-state.service';
import { PastelesService } from '../../core/services/pasteles.service';
import { CakeCard } from './cake-card/cake-card';

type Filtro = Categoria | 'todos';

const FILTROS: { valor: Filtro; texto: string }[] = [
  { valor: 'todos', texto: 'Todos' },
  { valor: 'flores', texto: 'Flores y crema' },
  { valor: 'frutas', texto: 'Frutas' },
  { valor: 'chocolate', texto: 'Chocolate' },
  { valor: 'infantiles', texto: 'Infantiles' },
  { valor: 'tematicos', texto: 'Temáticos' },
];

@Component({
  selector: 'app-catalog',
  imports: [CakeCard],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(window:resize)': 'construirPuntos()' },
})
export class Catalog {
  private readonly pastelesService = inject(PastelesService);
  private readonly orderState = inject(OrderStateService);
  private readonly injector = inject(Injector);

  private readonly grid = viewChild.required<ElementRef<HTMLElement>>('grid');

  protected readonly filtros = FILTROS;
  protected readonly filtroActivo = signal<Filtro>('todos');
  protected readonly pastelesVisibles = computed(() => {
    const f = this.filtroActivo();
    const todos = this.pastelesService.pasteles();
    return f === 'todos' ? todos : todos.filter((p) => p.categoria === f);
  });

  // Estado del carrusel (solo visible en celular)
  protected readonly totalPuntos = signal(0);
  protected readonly puntos = computed(() => Array.from({ length: this.totalPuntos() }, (_, i) => i));
  protected readonly actual = signal(0);
  protected readonly enInicio = signal(true);
  protected readonly enFinal = signal(true);
  private navTick = 0;

  constructor() {
    afterNextRender(() => this.construirPuntos());
  }

  protected filtrar(f: Filtro): void {
    this.filtroActivo.set(f);
    afterNextRender(
      () => {
        this.grid().nativeElement.scrollTo({ left: 0 });
        this.construirPuntos();
      },
      { injector: this.injector },
    );
  }

  protected elegir(nombre: string): void {
    this.orderState.modeloSeleccionado.set(nombre);
  }

  protected alHacerScroll(): void {
    cancelAnimationFrame(this.navTick);
    this.navTick = requestAnimationFrame(() => this.sincronizar());
  }

  protected anterior(): void {
    this.irA(Math.max(0, this.indiceActual() - 1));
  }

  protected siguiente(): void {
    this.irA(this.indiceActual() + 1);
  }

  protected irA(i: number): void {
    const c = this.tarjetasVisibles();
    if (c[i]) {
      this.grid().nativeElement.scrollTo({ left: c[i].offsetLeft - c[0].offsetLeft, behavior: 'smooth' });
    }
  }

  protected construirPuntos(): void {
    this.totalPuntos.set(this.tarjetasVisibles().length);
    this.sincronizar();
  }

  private sincronizar(): void {
    const g = this.grid().nativeElement;
    this.actual.set(Math.min(this.indiceActual(), this.totalPuntos() - 1));
    this.enInicio.set(g.scrollLeft < 4);
    this.enFinal.set(g.scrollLeft + g.clientWidth >= g.scrollWidth - 4);
  }

  /** Tarjetas que se ven en este ancho (en celular, "Todos" oculta las no destacadas). */
  private tarjetasVisibles(): HTMLElement[] {
    const tarjetas = this.grid().nativeElement.querySelectorAll<HTMLElement>('app-cake-card');
    return Array.from(tarjetas).filter((el) => el.offsetParent !== null);
  }

  private paso(): number {
    const c = this.tarjetasVisibles();
    return c.length > 1 ? c[1].offsetLeft - c[0].offsetLeft : this.grid().nativeElement.clientWidth;
  }

  private indiceActual(): number {
    return Math.round(this.grid().nativeElement.scrollLeft / this.paso());
  }
}
