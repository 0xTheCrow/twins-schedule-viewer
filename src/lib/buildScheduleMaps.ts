import { GameData, ScheduleMaps } from "@/types/schedule";

export default function buildScheduleMaps(data: { dates: { games: GameData[] }[] }): ScheduleMaps {
  const twinsId = process.env.NEXT_PUBLIC_TWINS_TEAM_ID;
  const dates = data.dates;
  const pastGames: string[] = [];
  const upcomingGames: string[] = [];
  const gameMap = new Map();
  const opponentMap = new Map();

  dates.forEach((dateObj) => {
    const games = dateObj.games;
    games.forEach((gameObj) => {
      const guid = gameObj.gameGuid;
      const homeTeam = gameObj.teams.home;
      const awayTeam = gameObj.teams.away;
      const isAway = awayTeam.team.id === Number(twinsId);
      const opponent = isAway ? homeTeam : awayTeam;
      const isDayGame = gameObj.dayNight === 'day';
      const venueName = gameObj.venue.name;

      const gameDate = new Date(gameObj.gameDate);
      const nowDate = new Date();
      if (nowDate < gameDate) {
        upcomingGames.push(guid);
      } else {
        pastGames.push(guid);
      }

      gameMap.set(guid, {
        ...gameObj,
        opponent,
        isAway,
        isDayGame,
        month: gameDate.getMonth(),
        venueName,
      });

      if (!opponentMap.has(opponent.team.id)) {
        opponentMap.set(opponent.team.id, {
          ...opponent,
          games: [guid]
        });
      } else {
        opponentMap.get(opponent.team.id)!.games.push(guid);
      }
    });
  });

  return { gameMap, opponentMap, pastGames, upcomingGames };
}
