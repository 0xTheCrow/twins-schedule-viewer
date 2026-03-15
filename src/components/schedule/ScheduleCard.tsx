"use client";

import { Sun, Moon, ChevronDown } from "lucide-react";
import { useState } from "react";
import { GameData } from "@/types/schedule";

export default function ScheduleCard({gameData, gameId, index}:{gameData: GameData, gameId: string, index: number}) {

  const [isExpanded, setIsExpanded] = useState(false);

  const date = new Date(gameData.gameDate);
  const gameMonth = date.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  const gameDay = date.getDate();
  const gameDow = date.toLocaleDateString("en-US", { weekday: "long" });
  const gameTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
  const isAway = gameData.isAway;
  const opponentName = gameData.opponent.team.name;

  const homeTeam = gameData.teams.home;
  const awayTeam = gameData.teams.away;
  const status = gameData.status?.detailedState;
  const hasScore = status === "Final" || status === "In Progress";

  return (
    <div 
      className="flex flex-col rounded-md bg-white text-sm text-gray-900 shadow-md overflow-hidden cursor-pointer border border-gray-200" 
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex flex-row items-center">
        <div className={`flex items-center justify-center w-12 md:w-16 shrink-0 self-stretch text-xs font-medium text-white ${isAway ? "bg-[#002B5C]" : "bg-[#B9975B]"}`}>
          {isAway ? "Away" : "Home"}
        </div>
        <div className={`flex-1 ${index % 2 === 1 ? "bg-gray-200" : ""}`}>
          <div className="flex items-center gap-2 px-3 py-2 md:hidden">
            <div className="flex-1 min-w-0">
              <span className="text-sm font-bold text-gray-900 truncate block">{isAway ? "@" : "vs"} {opponentName}</span>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <span>{gameDow}, {gameMonth} {gameDay}</span>
                <span>·</span>
                <span>{gameTime}</span>
                {gameData.isDayGame ? <Sun className="size-3 text-yellow-300" /> : <Moon className="size-3 text-blue-300" />}
              </div>
            </div>
            <ChevronDown className={`size-4 shrink-0 text-gray-500 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
          </div>
          <div className="hidden md:grid grid-cols-[1fr_9rem_5rem_1rem_1rem] items-center gap-4 px-4 py-3">
            <div className="flex flex-col">
              <span className="text-base font-bold text-gray-900">{isAway ? "@" : "vs"} {opponentName}</span>
              <span className="text-xs text-gray-400">{gameData.venueName}</span>
            </div>
            <span className="text-sm text-gray-700"><span className="text-gray-400">{gameDow},</span> <span className="font-semibold">{gameMonth} {gameDay}</span></span>
            <span className="text-xs text-gray-500">{gameTime}</span>
            {gameData.isDayGame ? <Sun className="size-3.5 text-yellow-300" /> : <Moon className="size-3.5 text-blue-300" />}
            <ChevronDown className={`size-4 text-gray-500 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
          </div>
        </div>
      </div>
      {isExpanded && (
        <div className="border-t border-gray-200 px-4 md:px-8 py-4 text-sm">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-6">
            <div>
              <p className="text-xs text-gray-500 mb-1">Status</p>
              <p className="font-medium">{status || "Scheduled"}</p>
            </div>
            {hasScore ? (
              <>
                <div>
                  <p className="text-xs text-gray-500 mb-1">{awayTeam.team.name}</p>
                  <p className="font-medium">{awayTeam.score}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">{homeTeam.team.name}</p>
                  <p className="font-medium">{homeTeam.score}</p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <p className="text-xs text-gray-500 mb-1">{awayTeam.team.name} Record</p>
                  <p className="font-medium">{awayTeam.leagueRecord?.wins}-{awayTeam.leagueRecord?.losses}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">{homeTeam.team.name} Record</p>
                  <p className="font-medium">{homeTeam.leagueRecord?.wins}-{homeTeam.leagueRecord?.losses}</p>
                </div>
              </>
            )}
          </div>
          {gameData.seriesDescription && (
            <div className="mt-3">
              <p className="text-xs text-gray-500 mb-1">Series</p>
              <p className="font-medium">{gameData.seriesDescription} - Game {gameData.seriesGameNumber}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
