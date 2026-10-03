import { Injectable } from '@angular/core';

import { WHATSAPP_NUMBER } from '../config';

export interface DatosPedido {
  nombre: string;
  ocasion: string;
  /** Fecha en formato del input date: aaaa-mm-dd. */
  fecha: string;
  personas: string;
  modelo: string;
  idea: string;
}

const SALUDO = '¡Hola Hazel Pasteles! Quiero cotizar un pastel.';

@Injectable({ providedIn: 'root' })
export class WhatsappService {
  /** Número para mostrar, p. ej. "+51 999 999 999". */
  readonly numeroVisible =
    '+' + WHATSAPP_NUMBER.replace(/^(\d{2})(\d{3})(\d{3})(\d{3})$/, '$1 $2 $3 $4');

  urlGenerica(): string {
    return this.url(SALUDO);
  }

  /** Arma el mensaje del pedido y omite las líneas vacías. */
  urlPedido(d: DatosPedido): string {
    const v = (s: string) => s.trim();
    const lineas = [SALUDO];
    if (v(d.nombre)) lineas.push('Nombre: ' + v(d.nombre));
    if (v(d.ocasion)) lineas.push('Ocasión: ' + v(d.ocasion));
    if (v(d.fecha)) lineas.push('Fecha: ' + v(d.fecha).split('-').reverse().join('/'));
    if (v(d.personas)) lineas.push('Personas: ' + v(d.personas));
    if (v(d.modelo)) lineas.push('Modelo de referencia: ' + v(d.modelo));
    if (v(d.idea)) lineas.push('Idea: ' + v(d.idea));
    return this.url(lineas.join('\n'));
  }

  private url(texto: string): string {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
  }
}
