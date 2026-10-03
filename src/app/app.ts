import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Footer } from './layout/footer/footer';
import { Header } from './layout/header/header';
import { WhatsappFloat } from './layout/whatsapp-float/whatsapp-float';
import { About } from './sections/about/about';
import { Catalog } from './sections/catalog/catalog';
import { Hero } from './sections/hero/hero';
import { HowToOrder } from './sections/how-to-order/how-to-order';
import { OccasionsStrip } from './sections/occasions-strip/occasions-strip';
import { Order } from './sections/order/order';
import { Reviews } from './sections/reviews/reviews';

@Component({
  selector: 'app-root',
  imports: [Header, Hero, OccasionsStrip, Catalog, HowToOrder, About, Reviews, Order, Footer, WhatsappFloat],
  templateUrl: './app.html',
  host: { style: 'display: block' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
