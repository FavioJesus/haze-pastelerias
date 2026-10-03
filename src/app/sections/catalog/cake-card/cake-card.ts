import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

import { Pastel } from '../../../core/models/pastel.model';

@Component({
  selector: 'app-cake-card',
  imports: [NgOptimizedImage],
  templateUrl: './cake-card.html',
  styleUrl: './cake-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CakeCard {
  readonly pastel = input.required<Pastel>();
  /** Emite el nombre del pastel elegido con "Lo quiero". */
  readonly elegir = output<string>();
}
