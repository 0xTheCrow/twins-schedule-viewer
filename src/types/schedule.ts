export interface TeamData {
  team: { id: number; name: string };
  score?: number;
  leagueRecord?: { wins: number; losses: number };
  games?: string[];
  [key: string]: unknown;
}

export interface GameData {
  gameGuid: string;
  gameDate: string;
  dayNight: string;
  venue: { name: string };
  teams: {
    home: TeamData;
    away: TeamData;
  };
  status?: { detailedState: string };
  seriesDescription?: string;
  seriesGameNumber?: number;
  opponent: TeamData;
  isAway: boolean;
  isDayGame: boolean;
  month: number;
  venueName: string;
  [key: string]: unknown;
}

export interface ScheduleMaps {
  gameMap: Map<string, GameData>;
  opponentMap: Map<number, TeamData>;
  pastGames: string[];
  upcomingGames: string[];
}
