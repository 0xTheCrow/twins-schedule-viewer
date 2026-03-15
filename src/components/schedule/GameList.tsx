import ScheduleCard from "@/components/schedule/ScheduleCard";
import { GameData } from "@/types/schedule";

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

  let lastMonth: number | undefined = undefined;

  return (
    <>
      {gameIds.flatMap((gameId, index) => {
        const gameData = gameMap.get(gameId)!;
        const elements = [];
        if (gameData.month !== lastMonth) {
          lastMonth = gameData.month;
          elements.push(
            <div
              key={`month-${gameData.month}`}
              id={`month-${gameData.month}`}
              data-month={gameData.month}
              className="flex items-center gap-3 scroll-mt-4"
            >
              <div className="flex-1 border-t border-white/20" />
              <span className="text-lg font-bold tracking-wide uppercase select-none">
                {monthNames[gameData.month]}
              </span>
              <div className="flex-1 border-t border-white/20" />
            </div>
          );
        }
        elements.push(
          <ScheduleCard gameData={gameData} gameId={gameId} key={gameId} index={index} />
        );
        return elements;
      })}
    </>
  );
}
