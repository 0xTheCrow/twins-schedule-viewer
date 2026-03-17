import ScheduleCard from "@/components/schedule/ScheduleCard";
import { GameData } from "@/types/schedule";
import { ReactElement } from "react";

export type SeriesPosition = "first" | "middle" | "last" | "solo";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const monthDivider = (month: number) => (
  <div
    key={`month-${month}`}
    id={`month-${month}`}
    data-month={month}
    className="flex scroll-mt-4 items-center gap-3"
  >
    <div className="flex-1 border-t border-white/20" />
    <span className="text-lg font-bold tracking-wide uppercase select-none">
      {monthNames[month]}
    </span>
    <div className="flex-1 border-t border-white/20" />
  </div>
);

export default function GameList({
  gameIds,
  gameMap,
}: {
  gameIds: string[];
  gameMap: Map<string, GameData>;
}) {
  if (gameIds.length === 0) {
    return <></>;
  }

  const seriesGroups: string[][] = [];
  let currentSeriesGroup: string[] = [];
  let currentOpponentId: number | null = null;
  let currentMonth: number | null = null;

  for (const gameId of gameIds) {
    const game = gameMap.get(gameId)!;
    const opponentId = game.opponent.team.id;

    if (opponentId === currentOpponentId && game.month === currentMonth) {
      currentSeriesGroup.push(gameId);
    } else {
      if (currentSeriesGroup.length > 0) seriesGroups.push(currentSeriesGroup);
      currentSeriesGroup = [gameId];
      currentOpponentId = opponentId;
      currentMonth = game.month;
    }
  }
  if (currentSeriesGroup.length > 0) seriesGroups.push(currentSeriesGroup);

  const seriesIndices: number[] = [];
  let seriesCounter = 0;
  let prevOpponentId: number | null = null;
  for (const group of seriesGroups) {
    const opponentId = gameMap.get(group[0])!.opponent.team.id;
    if (opponentId !== prevOpponentId) {
      seriesCounter++;
      prevOpponentId = opponentId;
    }
    seriesIndices.push(seriesCounter);
  }

  let lastMonth: number | null = null;
  let runningIndex = 0;

  return (
    <>
      {seriesGroups.flatMap((group, groupIndex) => {
        const elements: ReactElement[] = [];
        const firstGame = gameMap.get(group[0])!;
        const borderColor =
          seriesIndices[groupIndex] % 2 === 0
            ? "border-[#B9975B]"
            : "border-white";

        if (firstGame.month !== lastMonth) {
          lastMonth = firstGame.month;
          elements.push(monthDivider(firstGame.month));
        }

        if (group.length === 1) {
          elements.push(
            <ScheduleCard
              key={group[0]}
              gameData={firstGame}
              index={runningIndex++}
              seriesPosition="solo"
              borderColor={borderColor}
            />,
          );
        } else {
          elements.push(
            <div
              key={`series-${group[0]}`}
              className={`overflow-hidden rounded-md border-2 shadow-md
              ${borderColor}`}
            >
              {group.map((gameId, i) => {
                const gameData = gameMap.get(gameId)!;
                const position: SeriesPosition =
                  i === 0
                    ? "first"
                    : i === group.length - 1
                      ? "last"
                      : "middle";
                return (
                  <ScheduleCard
                    key={gameId}
                    gameData={gameData}
                    index={runningIndex++}
                    seriesPosition={position}
                  />
                );
              })}
            </div>,
          );
        }

        return elements;
      })}
    </>
  );
}
