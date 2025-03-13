export interface Challenge {
    id: number;
    roomId: number;
    name: string;
    targetValue: number;
    currentValue: number;
    status: 'in-progress' | 'completed' | 'failed';
  }
  