import { ChangeDetectionStrategy, Component } from '@angular/core';

const OCASIONES = [
  'Cumpleaños',
  'Baby shower',
  'Aniversarios',
  'Tortas temáticas',
  'Tortas de frutas',
  'Cupcakes',
  'Licenciaturas',
  'Matrimonios',
];

@Component({
  selector: 'app-occasions-strip',
  template: `
    <div class="strip" aria-hidden="true">
      <div class="strip-track">
        <!-- La lista va dos veces para que el marquee sea continuo -->
        @for (ocasion of pista; track $index) {
          <span>{{ ocasion }}</span>
        }
      </div>
    </div>
  `,
  styleUrl: './occasions-strip.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OccasionsStrip {
  protected readonly pista = [...OCASIONES, ...OCASIONES];
}
