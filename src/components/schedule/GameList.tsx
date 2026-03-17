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

  const groups: { games: string[]; borderColor: string }[] = [];
  let seriesCount = 0;
  let prevOpponentId: number | null = null;
  let prevMonth: number | null = null;
  let expectedNextGameNumber: number | null = null;

  for (const gameId of gameIds) {
    const game = gameMap.get(gameId)!;
    const opponentId = game.opponent.team.id;
    const continuesSeries =
      opponentId === prevOpponentId &&
      game.month === prevMonth &&
      game.seriesGameNumber === expectedNextGameNumber;

    if (!continuesSeries) {
      if (game.seriesGameNumber === 1 || game.seriesGameNumber == null)
        seriesCount++;
      groups.push({
        games: [],
        borderColor:
          seriesCount % 2 === 0 ? "border-[#B9975B]" : "border-white",
      });
      prevOpponentId = opponentId;
      prevMonth = game.month;
    }
    groups[groups.length - 1].games.push(gameId);
    expectedNextGameNumber = (game.seriesGameNumber ?? 0) + 1;
  }

  let lastMonth: number | null = null;
  let runningIndex = 0;

  return (
    <>
      {groups.flatMap((group) => {
        const elements: ReactElement[] = [];
        const firstGame = gameMap.get(group.games[0])!;

        if (firstGame.month !== lastMonth) {
          lastMonth = firstGame.month;
          elements.push(monthDivider(firstGame.month));
        }

        if (group.games.length === 1) {
          elements.push(
            <ScheduleCard
              key={group.games[0]}
              gameData={firstGame}
              index={runningIndex++}
              seriesPosition="solo"
              borderColor={group.borderColor}
            />,
          );
        } else {
          elements.push(
            <div
              key={`series-${group.games[0]}`}
              className={`overflow-hidden rounded-md border-2 shadow-md
              ${group.borderColor}`}
            >
              {group.games.map((gameId, i) => {
                const gameData = gameMap.get(gameId)!;
                const position: SeriesPosition =
                  i === 0
                    ? "first"
                    : i === group.games.length - 1
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
