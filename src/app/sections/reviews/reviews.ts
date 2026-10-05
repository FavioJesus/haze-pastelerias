import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Resena {
  texto: string;
  autor: string;
  ocasion: string;
  estrellas: number;
}

const RESENAS: Resena[] = [
  {
    texto: 'La torta de Hot Wheels quedó idéntica a lo que le pedimos. Mi hijo no quería que lo cortáramos.',
    autor: 'Cliente',
    ocasion: 'Cumpleaños infantil',
    estrellas: 5,
  },
  {
    texto: 'La torta de frutas estaba fresquísima y el bizcocho súper suave. Ya es la tercera vez que pedimos.',
    autor: 'Cliente',
    ocasion: 'Reunión familiar',
    estrellas: 5,
  },
  {
    texto: 'Nos hicieron la torta de aniversario con nuestro calendario y la fecha marcada. Un detalle precioso.',
    autor: 'Cliente',
    ocasion: 'Aniversario',
    estrellas: 5,
  },
];

@Component({
  selector: 'app-reviews',
  template: `
    <section class="reviews" id="resenas">
      <div class="wrap">
        <p class="eyebrow">Lo que dicen</p>
        <h2>Clientes que <span class="script">repiten</span></h2>
        <div class="reviews-grid">
          @for (r of resenas; track $index) {
            <figure class="review">
              <div class="stars" role="img" [attr.aria-label]="r.estrellas + ' de 5 estrellas'">
                {{ '★'.repeat(r.estrellas) }}
              </div>
              <blockquote>“{{ r.texto }}”</blockquote>
              <figcaption><b>{{ r.autor }}</b> · {{ r.ocasion }}</figcaption>
            </figure>
          }
        </div>
      </div>
    </section>
  `,
  styleUrl: './reviews.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Reviews {
  protected readonly resenas = RESENAS;
}
