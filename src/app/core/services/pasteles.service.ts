import { Injectable, signal } from '@angular/core';

import data from '../../data/pasteles.json';
import { Pastel } from '../models/pastel.model';

@Injectable({ providedIn: 'root' })
export class PastelesService {
  readonly pasteles = signal<readonly Pastel[]>(data as Pastel[]).asReadonly();
}
