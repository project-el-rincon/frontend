import { Component, Input, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-gauge-chart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gauge-chart.component.html',
  styleUrls: ['./gauge-chart.component.css']
})
export class GaugeChartComponent implements OnInit {
  @Input() value = 0;
  @Input() maxValue = 10;

  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  get chartData() {
    return {
      labels: ['Consommé', 'Restant'],
      datasets: [
        {
          data: [this.value, this.maxValue - this.value],
          backgroundColor: ['#ff6384', '#e0e0e0']
        }
      ]
    };
  }

  ngOnInit(): void {
    if (!this.isBrowser) {
      console.log("Chart.js ne fonctionne que côté client");
    }

    setTimeout(() => {
      this.isBrowser = true;
    }, 100); // ✅ Ajout d'un léger délai pour forcer la détection côté client
  }
  
}
