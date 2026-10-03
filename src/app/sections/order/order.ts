import { ChangeDetectionStrategy, Component, computed, effect, inject, untracked } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { map } from 'rxjs';

import { ANTICIPACION, HORARIO } from '../../core/config';
import { OrderStateService } from '../../core/services/order-state.service';
import { PastelesService } from '../../core/services/pasteles.service';
import { WhatsappService } from '../../core/services/whatsapp.service';
import { WaIcon } from '../../shared/wa-icon/wa-icon';

@Component({
  selector: 'app-order',
  imports: [ReactiveFormsModule, WaIcon],
  templateUrl: './order.html',
  styleUrl: './order.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Order {
  private readonly whatsapp = inject(WhatsappService);
  private readonly orderState = inject(OrderStateService);

  protected readonly pasteles = inject(PastelesService).pasteles;
  protected readonly numeroVisible = this.whatsapp.numeroVisible;
  protected readonly horario = HORARIO;
  protected readonly anticipacion = ANTICIPACION;

  protected readonly ocasiones = ['Cumpleaños', 'Baby shower', 'Aniversario', 'Boda', 'Graduación', 'Otra'];
  protected readonly personas = ['10 a 15', '15 a 25', '25 a 40', '40 a 60', 'Más de 60'];

  protected readonly form = inject(NonNullableFormBuilder).group({
    nombre: '',
    fecha: '',
    ocasion: 'Cumpleaños',
    personas: '15 a 25',
    modelo: '',
    idea: '',
  });

  private readonly datos = toSignal(this.form.valueChanges.pipe(map(() => this.form.getRawValue())), {
    initialValue: this.form.getRawValue(),
  });

  /** URL de WhatsApp que se recalcula con cada cambio del formulario. */
  protected readonly urlWhatsapp = computed(() => this.whatsapp.urlPedido(this.datos()));

  constructor() {
    // Modelo elegido desde una tarjeta del catálogo: se preselecciona y se libera el estado.
    effect(() => {
      const modelo = this.orderState.modeloSeleccionado();
      if (modelo === null) return;
      untracked(() => {
        this.form.controls.modelo.setValue(modelo);
        this.orderState.modeloSeleccionado.set(null);
      });
    });
  }
}
