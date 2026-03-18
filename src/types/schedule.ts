export interface TeamData {
  team: { id: number; name: string };
  score?: number;
  leagueRecord?: { wins: number; losses: number };
}

export interface TeamDataWithGames extends TeamData {
  games: string[];
}

export interface GameData {
  gamePk: number;
  gameGuid: string;
  gameDate: string;
  dayNight: string;
  venue: { name: string };
  teams: {
    home: TeamData;
    away: TeamData;
  };
  status?: {
    detailedState: string;
    abstractGameCode: string;
  };
  description?: string;
  seriesDescription?: string;
  seriesGameNumber?: number;
  gamesInSeries?: number;
  doubleHeader?: string;
  opponent: TeamDataWithGames;
  isAway: boolean;
  isDayGame: boolean;
  month: number;
  venueName: string;
}

export interface ScheduleMaps {
  gameMap: Map<string, GameData>;
  opponentMap: Map<number, TeamDataWithGames>;
  pastGames: string[];
  upcomingGames: string[];
  liveGame: GameData | null;
}
