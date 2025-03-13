import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { NgxGaugeModule } from 'ngx-gauge';
import { SensorDataService } from '../../services/sensor-data.service';

interface SensorData {
  id: number;
  room: string;
  energy: number;
  temperature: number;
  sound: number;
  motion: boolean;
  co2: number;
  timestamp: string;
}

@Component({
  selector: 'app-rooms',
  standalone: true,
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
  imports: [CommonModule, RouterModule, NgxGaugeModule] 
})
export class RoomsComponent implements OnInit {
  sensorData: SensorData[] = [];
  isLoading = true;
  currentTime: string = "";

  constructor(
    private sensorDataService: SensorDataService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.fetchSensorData();

    // ✅ Mettre à jour l'heure toutes les secondes
    setInterval(() => {
      this.currentTime = new Date().toLocaleTimeString();
    }, 1000);
  }

  fetchSensorData(): void {
    this.sensorDataService.getMockSensorData().subscribe((data: SensorData[]) => {
      this.sensorData = data;
      this.isLoading = false;
    });
  }
}
