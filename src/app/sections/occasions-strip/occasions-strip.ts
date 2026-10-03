import { ChangeDetectionStrategy, Component } from '@angular/core';

const OCASIONES = [
  'Cumpleaños',
  'Baby shower',
  'Aniversarios',
  'Pasteles temáticos',
  'Tortas de frutas',
  'Cupcakes',
  'Graduaciones',
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
