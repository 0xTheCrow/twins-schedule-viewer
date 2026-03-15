"use client";

import getSchedule from "@/src/api/getSchedule";
import PageContent from "@/src/components/layout/PageContent";
import { useEffect, useState } from "react";


const buildScheduleMaps = (data) => {
  const twinsId = process.env.NEXT_PUBLIC_TWINS_TEAM_ID;

  /*
  const copyright = data.copyright;
  const totalGames = data.totalGames;
  const totalGamesInProgress = data.totalGamesInProgress;
  */

  const dates = data.dates;

  const gameChronology:string[] = [];
  const gameMap = new Map();
  const opponentMap = new Map();

  dates.forEach((dateObj, index) => {
    const games = dateObj.games;
    games.forEach((gameObj) => {
      const guid = gameObj.gameGuid;
      const homeTeam = gameObj.teams.home;
      const awayTeam = gameObj.teams.away;
      const isAway = awayTeam.team.id === twinsId;
      const opponent = isAway ? homeTeam : awayTeam;

      // list of game IDs by chronological order
      gameChronology.push(guid);

      // mapping of game IDs to game info
      gameMap.set(guid, {
        ...gameObj,
        opponent,
        isAway,
      });

      // mapping of opponent team IDs to game IDs, including team info
      if (!opponentMap.has(opponent.team.id)) {
        opponentMap.set(opponent.team.id, {
          opponent, 
          games: [guid]
        });
      } else {
        opponentMap.get(opponent.team.id)!.games.push(guid);
      }
    });
  });

  const dataMaps = {
    gameChronology,
    gameMap,
    opponentMap,
  }

  console.log(dataMaps);

  return dataMaps;
}

export default function Dashboard() {

  const [dataMaps, setDataMaps] = useState<any>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadSuccess, setIsLoadSuccess] = useState(false);

  useEffect(() => {
    getSchedule().then(res => {
      const isSuccess = res.success;
      if (isSuccess) {
        setDataMaps(res.data);
        buildScheduleMaps(res.data);
      }
      console.log(res);
      setIsLoading(false);
      setIsLoadSuccess(isSuccess)
    });
  }, []);


  return (
    <PageContent>
      blah blah blah
    </PageContent>
  );
}
