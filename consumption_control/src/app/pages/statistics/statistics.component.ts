import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType, Chart, registerables, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { RouterModule } from '@angular/router';


Chart.register(...registerables);

@Component({
  standalone: true,
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  imports: [BaseChartDirective , RouterModule]
})
export class StatisticsComponent implements OnInit {

  public pieChartLabels: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  public pieChartData: ChartData<'pie'> = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [30, 50, 40, 60, 70, 45], // Example data
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']
      }
    ]
  };
  

  public pieChartType: ChartType = 'pie';

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      }
    }
  };
  

  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#1B5E20' // 🌱 Dark green
        }
      }
    }
  };

  public lineChartData: ChartData<'line'> = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Energy Consumption (kW)',
        data: [30, 50, 40, 60, 70, 45], // Example values for each month
        borderColor: '#1B5E20',
        backgroundColor: 'rgba(76,175,80,0.2)',
        tension: 0.4,
      }
    ]
  };
  

  constructor() {}

  ngOnInit(): void {}
}
