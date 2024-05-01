export interface Game {
    _id: string;  // Optional for when creating a new game
    adminId: string;
    gameMode: string;
    duration: number;
    startTime: Date;
    autoEnd: boolean;
    status: string;
    gameEvents?: string[];  // Array of event IDs, optional initially
  }
  