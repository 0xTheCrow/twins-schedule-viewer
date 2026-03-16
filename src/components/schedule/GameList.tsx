import ScheduleCard from "@/components/schedule/ScheduleCard";
import { GameData } from "@/types/schedule";

export type SeriesPosition = "first" | "middle" | "last" | "solo";

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

export default function GameList({
  gameIds,
  gameMap,
}: {
  gameIds: string[];
  gameMap: Map<string, GameData>;
}) {
  if (gameIds.length === 0) {
    return <span>No Games Found</span>;
  }

  // Group consecutive games by opponent within the same month
  const groups: string[][] = [];
  let currentGroup: string[] = [];
  let currentOpponentId: number | null = null;
  let currentMonth: number | null = null;

  for (const gameId of gameIds) {
    const game = gameMap.get(gameId)!;
    const opponentId = game.opponent.team.id;

    if (opponentId === currentOpponentId && game.month === currentMonth) {
      currentGroup.push(gameId);
    } else {
      if (currentGroup.length > 0) groups.push(currentGroup);
      currentGroup = [gameId];
      currentOpponentId = opponentId;
      currentMonth = game.month;
    }
  }
  if (currentGroup.length > 0) groups.push(currentGroup);

  // Assign a series index to each group — only increment when opponent changes
  const seriesIndices: number[] = [];
  let seriesCounter = 0;
  let prevOpponentId: number | null = null;
  for (const group of groups) {
    const opponentId = gameMap.get(group[0])!.opponent.team.id;
    if (opponentId !== prevOpponentId) {
      seriesCounter++;
      prevOpponentId = opponentId;
    }
    seriesIndices.push(seriesCounter);
  }

  let lastMonth: number | undefined = undefined;
  let runningIndex = 0;

  const monthDivider = (month: number) => (
    <div
      key={`month-${month}`}
      id={`month-${month}`}
      data-month={month}
      className="flex items-center gap-3 scroll-mt-4"
    >
      <div className="flex-1 border-t border-white/20" />
      <span className="text-lg font-bold tracking-wide uppercase select-none">
        {monthNames[month]}
      </span>
      <div className="flex-1 border-t border-white/20" />
    </div>
  );

  return (
    <>
      {groups.flatMap((group, groupIndex) => {
        const elements: JSX.Element[] = [];
        const firstGame = gameMap.get(group[0])!;
        const borderColor = seriesIndices[groupIndex] % 2 === 0 ? "border-[#B9975B]" : "border-white";

        if (group.length === 1) {
          if (firstGame.month !== lastMonth) {
            lastMonth = firstGame.month;
            elements.push(monthDivider(firstGame.month));
          }
          elements.push(
            <ScheduleCard
              key={group[0]}
              gameData={firstGame}
              gameId={group[0]}
              index={runningIndex++}
              seriesPosition="solo"
              borderColor={borderColor}
            />
          );
        } else {
          if (firstGame.month !== lastMonth) {
            lastMonth = firstGame.month;
            elements.push(monthDivider(firstGame.month));
          }

          elements.push(
            <div
              key={`series-${group[0]}`}
              className={`rounded-md overflow-hidden shadow-md border-2 ${borderColor}`}
            >
              {group.map((gameId, i) => {
                const gameData = gameMap.get(gameId)!;
                const position: SeriesPosition =
                  i === 0 ? "first" : i === group.length - 1 ? "last" : "middle";
                return (
                  <ScheduleCard
                    key={gameId}
                    gameData={gameData}
                    gameId={gameId}
                    index={runningIndex++}
                    seriesPosition={position}
                  />
                );
              })}
            </div>
          );
        }

        return elements;
      })}
    </>
  );
}
