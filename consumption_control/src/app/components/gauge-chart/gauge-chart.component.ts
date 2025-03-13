// import { Component, Input, OnInit, PLATFORM_ID, Inject } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-gauge-chart',
//   standalone: true,
//   imports: [CommonModule, RouterModule],
//   templateUrl: './gauge-chart.component.html',
//   styleUrls: ['./gauge-chart.component.css']
// })
// export class GaugeChartComponent implements OnInit {

//   @Input() value = 0;
//   @Input() maxValue = 10;

//   isBrowser: boolean;

//   constructor(@Inject(PLATFORM_ID) private platformId: object) {
//     this.isBrowser = isPlatformBrowser(this.platformId);
//   }

//   ngOnInit(): void {
//     if (this.isBrowser) {
//       this.loadChart();
//     } else {
//       console.log("Chart.js ne fonctionne que côté client");
//     }
//   }

//   async loadChart() {
//     // Import dynamique de Chart.js uniquement côté client
//     const { Chart, registerables } = await import('chart.js');
//     Chart.register(...registerables);

//     const canvas = document.getElementById('myChart') as HTMLCanvasElement;
//     if (canvas) {
//       const ctx = canvas.getContext('2d');
//       if (ctx) {
//         new Chart(ctx, {
//           type: 'doughnut',
//           data: {
//             labels: ['Consommé', 'Restant'],
//             datasets: [
//               {
//                 data: [this.value, this.maxValue - this.value],
//                 backgroundColor: ['#ff6384', '#e0e0e0']
//               }
//             ]
//           },
//           options: {
//             responsive: true,
//             cutout: '80%',
//             plugins: {
//               legend: { display: false }
//             }
//           }
//         });
//       }
//     }
//   }
// }
