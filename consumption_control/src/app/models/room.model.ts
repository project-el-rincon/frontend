export interface Room {
    id: number;
    name: string;
    row: number;
    col: number;
    currentPower?: number;
    currentTemperature?: number;
    currentHumidity?: number;
    currentLightLevel?: number;
    currentOccupancy?: boolean;
}