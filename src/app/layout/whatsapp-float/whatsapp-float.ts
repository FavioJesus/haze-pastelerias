import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { WhatsappService } from '../../core/services/whatsapp.service';
import { WaIcon } from '../../shared/wa-icon/wa-icon';

@Component({
  selector: 'app-whatsapp-float',
  imports: [WaIcon],
  template: `
    <a class="wa-float" [href]="url" aria-label="Escríbenos por WhatsApp" target="_blank" rel="noopener">
      <app-wa-icon />
    </a>
  `,
  styleUrl: './whatsapp-float.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhatsappFloat {
  protected readonly url = inject(WhatsappService).urlGenerica();
}
