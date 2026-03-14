const getSchedule = async () => {
  const scheduleRoute = process.env.NEXT_PUBLIC_TWINS_2026_SCHEDULE_API_ROUTE || '';
  const twinsId = process.env.NEXT_PUBLIC_TWINS_TEAM_ID;
      console.log("raw api response", scheduleRoute);
  if (scheduleRoute.length == 0) {
    return {
      success: false,
      data: undefined,
    };
  }
  return await fetch(scheduleRoute)
    .then((res) => res.json())
    .then((res) => {
      const copyright = res.copyright;
      const totalGames = res.totalGames;
      const totalGamesInProgress = res.totalGamesInProgress;
      const dates = res.dates;

      const opponentMap = new Map();
      const gameMap = new Map();

      dates.forEach((dateObj, index) => {
        const games = dateObj.games;
        games.forEach((gameObj) => {
          const guid = gameObj.gameGuid;
          const homeTeam = gameObj.teams.home;
          const awayTeam = gameObj.teams.away;
          const isAway = awayTeam.team.id === twinsId;
          const opponent = isAway ? homeTeam : awayTeam;

          gameMap.set(guid, {
            ...gameObj,
            opponent,
            isAway,
          });

          if (!opponentMap.has(opponent.team.id)) {
            opponentMap.set(opponent.team.id, opponent);
          }

        });
      });

      console.log(gameMap);

      return {
        success: true,
        data: gameMap,
      };
    })
    .catch((err) => {
      return {
        success: false,
        data: undefined,
      };
    });
}

export default getSchedule;