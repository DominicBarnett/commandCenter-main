export interface Participation {
    _id?: string;  // Optional for when adding a new participation
    gameId: string;
    userId: string;
    teamName: string;
    score: number;
    status: string;  // 'active', 'completed', etc.
  }
  