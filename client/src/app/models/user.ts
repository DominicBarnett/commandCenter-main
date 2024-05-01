export interface User {
    _id?: string;  // Optional for when creating a new user
    name: string;
    callsign: string;
    role: string;  // 'admin' or 'player'
    deleted?: boolean;
  }
  