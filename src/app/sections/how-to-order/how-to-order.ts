import { ChangeDetectionStrategy, Component } from '@angular/core';

const PASOS = [
  {
    titulo: 'Cuéntanos tu idea',
    texto: 'Escríbenos por WhatsApp con la fecha, el número de personas y una foto o tema que te guste.',
  },
  {
    titulo: 'Te enviamos la cotización',
    texto: 'Te proponemos sabor, relleno y diseño con su precio. Separas tu fecha con un adelanto.',
  },
  {
    titulo: 'Retira o recibe tu torta',
    texto: 'La preparamos fresca para tu día. Coordinamos el retiro o el delivery a tu dirección en Santiago.',
  },
];

@Component({
  selector: 'app-how-to-order',
  template: `
    <section class="steps" id="como-pedir">
      <div class="wrap">
        <p class="eyebrow">Cómo pedir</p>
        <h2>De tu idea a la mesa en <span class="script">tres pasos</span></h2>
        <ol class="steps-list">
          @for (paso of pasos; track paso.titulo) {
            <li>
              <h3>{{ paso.titulo }}</h3>
              <p>{{ paso.texto }}</p>
            </li>
          }
        </ol>
      </div>
    </section>
  `,
  styleUrl: './how-to-order.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HowToOrder {
  protected readonly pasos = PASOS;
}
