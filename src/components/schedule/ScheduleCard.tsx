export default function ScheduleCard({gameData, gameId}:{gameData:any, gameId: string}) {
  
  const gameDate = gameData.gameDate;
  const isAway = gameData.isAway;
  const opponentName = gameData.opponent.team.name;

  return (
    <div className={'flex flex-row'} key={`row-${gameId}`}>
      {`${gameDate}, ${isAway ? `Away` : `Home`}, ${opponentName}`}
    </div>
  );
}
