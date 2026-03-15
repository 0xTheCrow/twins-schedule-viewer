"use client";

import getSchedule from "@/src/api/getSchedule";
import PageContent from "@/src/components/layout/PageContent";
import ScheduleCard from "@/src/components/schedule/ScheduleCard";
import { useEffect, useState } from "react";


const buildScheduleMaps = (data) => {
  /*
  const copyright = data.copyright;
  const totalGames = data.totalGames;
  const totalGamesInProgress = data.totalGamesInProgress;
  */

  const twinsId = process.env.NEXT_PUBLIC_TWINS_TEAM_ID;
  const dates = data.dates;
  const pastGames:string[] = [];
  const upcomingGames:string[] = [];
  const gameMap = new Map();
  const opponentMap = new Map();

  dates.forEach((dateObj, index) => {
    const games = dateObj.games;
    games.forEach((gameObj) => {
      const guid = gameObj.gameGuid;
      const homeTeam = gameObj.teams.home;
      const awayTeam = gameObj.teams.away;
      const isAway = awayTeam.team.id === Number(twinsId);
      const opponent = isAway ? homeTeam : awayTeam;

      // mapping of game IDs to game info
      gameMap.set(guid, {
        ...gameObj,
        opponent,
        isAway,
      });

      // mapping of opponent team IDs to game IDs, including team info
      if (!opponentMap.has(opponent.team.id)) {
        opponentMap.set(opponent.team.id, {
          ...opponent, 
          games: [guid]
        });
      } else {
        opponentMap.get(opponent.team.id)!.games.push(guid);
      }

      const gameDate = new Date(gameObj.gameDate);
      const nowDate = new Date();
      // separate ID arrays for upcoming and past games
      if (nowDate < gameDate) {
        upcomingGames.push(guid);
      } else {
        pastGames.push(guid);
      }

    });
  });

  const dataMaps = {
    gameMap,
    opponentMap,
    pastGames,
    upcomingGames,
  }

  console.log(dataMaps);

  return dataMaps;
}

export default function Dashboard() {

  const [dataMaps, setDataMaps] = useState<any>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadSuccess, setIsLoadSuccess] = useState(false);

  const [isUpcomingToggleEnabled, setIsUpcomingToggleEnabled] = useState<Boolean>(true);

  useEffect(() => {
    getSchedule().then(res => {
      const isSuccess = res.success;
      if (isSuccess) {
        const builtMaps = buildScheduleMaps(res.data);
        setDataMaps(builtMaps);
      }
      setIsLoading(false);
      setIsLoadSuccess(isSuccess)
    });
  }, []);

  return (
    <PageContent>
      <div className={'flex flex-col'}>
        <div>[filter controls here]</div>
        <div className={'flex flex-col'}>
          {
            dataMaps !== undefined && dataMaps.upcomingGames !== undefined && isUpcomingToggleEnabled ?
              dataMaps.upcomingGames.map((upcomingGameId) => {
                const gameData = dataMaps.gameMap.get(upcomingGameId);
                return(
                 <ScheduleCard gameData={gameData} gameId={upcomingGameId}/>
                );
              })

            : <></> 
          }
        </div>

      </div>
    </PageContent>
  );
}
