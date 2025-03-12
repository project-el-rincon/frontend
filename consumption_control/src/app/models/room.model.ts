export interface Room {
    id: number;
    name: string;
    floorId: number;
    currentPower?: number;
    currentTemperature?: number;
    currentHumidity?: number;
    currentLightLevel?: number;
    currentOccupancy?: boolean;
}