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

// Formato de WhatsApp: *negrita*, _cursiva_ y "> " cita; los emojis hacen de viñetas.
// Se usa api.whatsapp.com/send y no wa.me: la redirección de wa.me corrompe los emojis (salen como "�").
const SALUDO = '¡Hola *Hazel Pasteles*! 🎂';
const FIRMA = '_Mensaje enviado desde la web de Hazel Pasteles_ 💕';

@Injectable({ providedIn: 'root' })
export class WhatsappService {
  /** Número para mostrar, p. ej. "+56 9 7802 1920". */
  readonly numeroVisible =
    '+' + WHATSAPP_NUMBER.replace(/^(\d{2})(\d)(\d{4})(\d{4})$/, '$1 $2 $3 $4');

  urlGenerica(): string {
    return this.url(
      [SALUDO, 'Quiero información para cotizar una *torta personalizada*. ✨', '', FIRMA].join('\n'),
    );
  }

  /** Arma el mensaje del pedido con formato de WhatsApp y omite los datos vacíos. */
  urlPedido(d: DatosPedido): string {
    const v = (s: string) => s.trim();
    const datos: [string, string][] = [
      ['👤 Nombre', v(d.nombre)],
      ['🎉 Ocasión', v(d.ocasion)],
      ['📅 Fecha del evento', v(d.fecha) && v(d.fecha).split('-').reverse().join('/')],
      ['👥 Personas', v(d.personas)],
      ['🍰 Modelo de referencia', v(d.modelo)],
    ];

    const lineas = [
      SALUDO,
      'Quiero cotizar una *torta personalizada*. ✨',
      '',
      '*📋 DATOS DEL PEDIDO*',
      ...datos.filter(([, valor]) => valor).map(([campo, valor]) => `${campo}: *${valor}*`),
    ];

    const idea = v(d.idea);
    if (idea) {
      lineas.push(
        '',
        '*💡 MI IDEA*',
        ...idea
          .split('\n')
          .map((l) => l.trim())
          .filter(Boolean)
          .map((l) => `> ${l}`),
      );
    }

    lineas.push('', '¿Me pueden enviar la cotización? ¡Gracias! 🙌', '', FIRMA);
    return this.url(lineas.join('\n'));
  }

  private url(texto: string): string {
    return `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(texto)}`;
  }
}
