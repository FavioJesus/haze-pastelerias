import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

import { WaIcon } from '../../shared/wa-icon/wa-icon';

@Component({
  selector: 'app-hero',
  imports: [NgOptimizedImage, WaIcon],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {}
