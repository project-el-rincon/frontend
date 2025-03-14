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
 
     // ✅ Mettre à jour l'heure toutes les secondes
     this.route.paramMap.subscribe(params => {
       const roomId = params.get('id');
       if (roomId) {
         // Si un ID de pièce est spécifié, chargez uniquement cette pièce
         this.fetchRoomData(parseInt(roomId, 10));
       } else {
         // Sinon, chargez toutes les pièces
         this.fetchSensorData();
       }
     });
     
     // Mettre à jour l'heure toutes les secondes
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
 
   // Ajoutez cette nouvelle méthode ici
   fetchRoomData(roomId: number): void {
     this.isLoading = true;
     console.log('Fetching data for room ID:', roomId);
     this.sensorDataService.getRoomData(roomId).subscribe(
       (data: SensorData) => {
         console.log('Received data:', data);
         this.sensorData = [data];
         this.isLoading = false;
       },
       (error) => {
         console.error('Error:', error);
         this.isLoading = false;
       }
     );
   }
   getCO2Color(co2Level: number): string {
     const minCO2 = 300;  // Seuil bas (bon air)
     const maxCO2 = 700; // Seuil haut (mauvais air)
 
     // Normalisation de la valeur entre 0 et 1
     let ratio = (co2Level - minCO2) / (maxCO2 - minCO2);
     ratio = Math.max(0, Math.min(1, ratio)); // Clamp entre 0 et 1
 
     // Interpolation des couleurs (HSL : 120° = Vert, 0° = Rouge)
     const hue = 120 - (120 * ratio); // Passe du vert (120°) au rouge (0°)
     return `hsl(${hue}, 100%, 50%)`; // Retourne une couleur en HSL
   }
 
   getEnergyGradientColor(energyLevel: number): string {
     const minEnergy = 0;   // Seuil minimum (basse consommation)
     const maxEnergy = 10;  // Seuil maximum (haute consommation)
 
     // Normalisation entre 0 et 1
     let ratio = (energyLevel - minEnergy) / (maxEnergy - minEnergy);
     ratio = Math.max(0, Math.min(1, ratio)); // Clamp pour rester entre 0 et 1
 
     // Interpolation HSL (120° = Vert → 0° = Rouge)
     const hue = 120 - (120 * ratio); // 120° (Vert) → 60° (Jaune) → 0° (Rouge)
     return `hsl(${hue}, 100%, 50%)`; // Retourne la couleur dynamique
   }
 
   getSoundColor(soundLevel: number): string {
     // Définir les couleurs en fonction de l'intensité du son
     const minColor = [173, 216, 230]; // Bleu clair (RGB: LightBlue)
     const maxColor = [0, 0, 139]; // Bleu foncé (RGB: DarkBlue)
 
     // Calcul de l'interpolation (valeur normalisée entre 0 et 1)
     const ratio = Math.min(soundLevel / 100, 1);
 
     // Générer la couleur interpolée
     const interpolatedColor = minColor.map((min, index) =>
       Math.round(min + ratio * (maxColor[index] - min))
     );
 
     return `rgb(${interpolatedColor.join(",")})`;
   }
 
 }