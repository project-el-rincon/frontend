export interface HistoryData {
    roomId: number;            // ID de la room
    timestamp: string;         // Date et heure de l'enregistrement
    energy: number;            // Consommation d'énergie en kW
    temperature: number;       // Température en °C
    sound: number;             // Niveau sonore en dB
    motion: boolean;           // Détection de mouvement (true/false)
    co2: number;               // Niveau de CO2 en ppm
  }
  