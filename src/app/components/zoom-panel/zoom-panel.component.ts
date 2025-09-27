import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ScaleService } from 'src/app/services/scale.service';

@Component({
  selector: 'app-zoom-panel',
  templateUrl: './zoom-panel.component.html',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  styleUrl: './zoom-panel.component.scss'
})
export class ZoomPanelComponent {
  constructor(private scaleSrvice: ScaleService) {}

  onZoomInButtonClicked() {
    this.scaleSrvice.zoomIn();
  }

  onZoomOutButtonClicked() {
    this.scaleSrvice.zoomOut();
  }
}
