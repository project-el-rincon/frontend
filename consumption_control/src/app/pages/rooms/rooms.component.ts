import { Component, OnInit, OnDestroy } from '@angular/core';
 import { CommonModule } from '@angular/common';
 import { RouterModule, ActivatedRoute } from '@angular/router';
 import { NgxGaugeModule } from 'ngx-gauge';
 import { SensorDataService } from '../../services/sensor-data.service';
import { Subscription } from 'rxjs';
 
 interface SensorData {
   id: number;
   room: string;
   energy: number;
   temperature: number;
   sound: number;
   motion: boolean;
   co2: number;
   timestamp: string;
   humidity: number; // Ajout de l'humidité
   light: number;    // Ajout de la luminosité
   tvoc: number;     // Ajout des TVOC
 }
 
 @Component({
   selector: 'app-rooms',
   standalone: true,
   templateUrl: './rooms.component.html',
   styleUrls: ['./rooms.component.css'],
   imports: [CommonModule, RouterModule, NgxGaugeModule] 
 })
 export class RoomsComponent implements OnInit, OnDestroy  {
   sensorData: SensorData[] = [];
   isLoading = true;
   error: string | null = null;
   private dataSubscription: Subscription | null = null;
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

   ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
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

   // Méthode pour la couleur de la lumière
getLightColor(lightLevel: number): string {
  // Du jaune pâle au jaune vif
  const saturation = 80 + (lightLevel / 1000) * 20;
  const lightness = 70 - (lightLevel / 1000) * 20;
  return `hsl(60, ${saturation}%, ${lightness}%)`;
}
 
// Méthode pour la couleur de l'icône de lumière
getLightIconColor(lightLevel: number): string {
  // Valeurs seuils pour la luminosité
  const minLight = 0;   // Faible luminosité
  const midLight = 500; // Luminosité moyenne
  const maxLight = 1000; // Luminosité élevée
  
  if (lightLevel <= minLight) {
    return '#888888'; // Gris pour une ampoule éteinte/faible
  } else if (lightLevel <= midLight) {
    // Interpolation entre gris et jaune pâle
    const ratio = (lightLevel - minLight) / (midLight - minLight);
    const r = Math.floor(136 + (255 - 136) * ratio);
    const g = Math.floor(136 + (223 - 136) * ratio);
    const b = Math.floor(136 + (0 - 136) * ratio);
    return `rgb(${r}, ${g}, ${b})`;
  } else {
    // Interpolation entre jaune pâle et jaune vif
    const ratio = Math.min((lightLevel - midLight) / (maxLight - midLight), 1);
    const r = 255;
    const g = Math.floor(223 - (223 - 180) * ratio);
    const b = Math.floor(0 + 50 * ratio);
    return `rgb(${r}, ${g}, ${b})`;
  }
}

// Méthode pour l'opacité du "glow" de l'ampoule
getLightGlowOpacity(lightLevel: number): number {
  // Normaliser l'opacité entre 0 et 1 basée sur le niveau de lumière
  return Math.min(lightLevel / 1000, 0.9);
}

// Méthode améliorée pour le pourcentage de la barre de lumière
getLightPercentage(lightLevel: number): number {
  // Normaliser entre 0 et 100%
  return Math.min((lightLevel / 1000) * 100, 100);
}

getHumidityColor(humidity: number): string {
  // Définition des seuils pour les différents niveaux d'humidité
  const lowHumidity = 30;    // Humidité très basse
  const midHumidity = 50;    // Humidité moyenne
  const highHumidity = 70;   // Humidité élevée
  
  if (humidity < lowHumidity) {
    // Humidité très basse - bleu très clair
    return 'rgb(210, 240, 255)';
  } else if (humidity < midHumidity) {
    // Humidité basse à moyenne - interpolation vers bleu clair
    const ratio = (humidity - lowHumidity) / (midHumidity - lowHumidity);
    
    // Interpolation de couleur: bleu très clair (210,240,255) à bleu clair (150,210,255)
    const r = Math.floor(210 - ratio * 60);
    const g = Math.floor(240 - ratio * 30);
    const b = 255;
    
    return `rgb(${r}, ${g}, ${b})`;
  } else if (humidity <= highHumidity) {
    // Humidité moyenne à élevée - interpolation vers bleu moyen
    const ratio = (humidity - midHumidity) / (highHumidity - midHumidity);
    
    // Interpolation de couleur: bleu clair (150,210,255) à bleu moyen (100,170,240)
    const r = Math.floor(150 - ratio * 50);
    const g = Math.floor(210 - ratio * 40);
    const b = Math.floor(255 - ratio * 15);
    
    return `rgb(${r}, ${g}, ${b})`;
  } else {
    // Humidité très élevée - bleu foncé
    return 'rgb(70, 130, 220)';
    /* return `hsl(210, 90%, 40%)`; */
  }
}

// Méthode pour déterminer si l'humidité est élevée pour appliquer l'animation
isHighHumidity(humidity: number): boolean {
  return humidity > 70;
}

  // Méthode pour la couleur du TVOC - du vert au violet
getTvocColor(tvocLevel: number): string {
  // Valeurs seuil pour les différents niveaux de TVOC
  const lowTvoc = 100;    // Niveau bas/bon (100 ppb)
  const mediumTvoc = 300;  // Niveau moyen (300 ppb)
  const highTvoc = 500;   // Niveau élevé (500 ppb)
  const veryHighTvoc = 1000; // Niveau très élevé (1000 ppb)
  
  if (tvocLevel <= lowTvoc) {
    // Niveau bas - vert
    return 'rgb(45, 200, 65)';
  } else if (tvocLevel <= mediumTvoc) {
    // Niveau bas à moyen - vert à jaune-vert
    const ratio = (tvocLevel - lowTvoc) / (mediumTvoc - lowTvoc);
    
    // Vert (45,200,65) → Jaune-vert (180,220,50)
    const r = Math.floor(45 + (180 - 45) * ratio);
    const g = Math.floor(200 + (220 - 200) * ratio);
    const b = Math.floor(65 + (50 - 65) * ratio);
    
    return `rgb(${r}, ${g}, ${b})`;
  } else if (tvocLevel <= highTvoc) {
    // Niveau moyen à élevé - jaune-vert à orange
    const ratio = (tvocLevel - mediumTvoc) / (highTvoc - mediumTvoc);
    
    // Jaune-vert (180,220,50) → Orange (240,140,30)
    const r = Math.floor(180 + (240 - 180) * ratio);
    const g = Math.floor(220 - (220 - 140) * ratio);
    const b = Math.floor(50 - (50 - 30) * ratio);
    
    return `rgb(${r}, ${g}, ${b})`;
  } else if (tvocLevel <= veryHighTvoc) {
    // Niveau élevé à très élevé - orange à violet
    const ratio = (tvocLevel - highTvoc) / (veryHighTvoc - highTvoc);
    
    // Orange (240,140,30) → Violet (170,50,180)
    const r = Math.floor(240 - (240 - 170) * ratio);
    const g = Math.floor(140 - (140 - 50) * ratio);
    const b = Math.floor(30 + (180 - 30) * ratio);
    
    return `rgb(${r}, ${g}, ${b})`;
  } else {
    // Niveau extrêmement élevé - violet foncé
    return 'rgb(130, 20, 160)';
  }
}

// Méthode pour calculer le pourcentage pour la barre de TVOC
getTvocPercentage(tvocLevel: number): number {
  // Normaliser à 1000 ppb comme maximum (100%)
  return Math.min((tvocLevel / 1000) * 100, 100);
}

// Méthode pour déterminer si le niveau TVOC est élevé pour l'animation
isHighTvoc(tvocLevel: number): boolean {
  return tvocLevel > 500;
}
 }