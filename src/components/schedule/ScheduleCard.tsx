"use client";

import { Sun, Moon, ChevronDown, ExternalLink, MapPin } from "lucide-react";
import { useState } from "react";
import { GameData } from "@/types/schedule";
import { SeriesPosition } from "@/components/schedule/GameList";

export default function ScheduleCard({
  gameData,
  index,
  seriesPosition = "solo",
  borderColor,
}: {
  gameData: GameData;
  index: number;
  seriesPosition?: SeriesPosition;
  borderColor?: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const date = new Date(gameData.gameDate);
  const gameMonth = date.toLocaleDateString("en-US", { month: "short" });
  const gameDay = date.getDate();
  const gameDow = date.toLocaleDateString("en-US", { weekday: "short" });
  const gameTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  const isAway = gameData.isAway;
  const opponentName = gameData.opponent.team.name;

  const homeTeam = gameData.teams.home;
  const awayTeam = gameData.teams.away;
  const status = gameData.status?.detailedState;
  const hasScore = status === "Final" || status === "In Progress";
  const isDoubleHeader = gameData.doubleHeader && gameData.doubleHeader !== "N";
  const gamedayUrl = `https://www.mlb.com/gameday/${gameData.gamePk}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(gameData.venueName)}`;

  const twinsTeam = isAway ? awayTeam : homeTeam;
  const opponentTeam = isAway ? homeTeam : awayTeam;
  const twinsScore = twinsTeam.score ?? 0;
  const opponentScore = opponentTeam.score ?? 0;
  const isWin = hasScore && twinsScore > opponentScore;

  return (
    <div
      className={`flex cursor-pointer flex-col overflow-hidden bg-white text-sm
        text-gray-900 ${
          seriesPosition === "solo"
            ? `rounded-md border-2 shadow-md
              ${borderColor || "border-gray-200"}`
            : seriesPosition !== "last"
              ? "border-b border-gray-200"
              : ""
        }`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex flex-row items-center">
        <div
          className={`flex w-12 shrink-0 items-center justify-center
            self-stretch text-xs font-medium text-white md:w-16
            ${isAway ? "bg-[#002B5C]" : "bg-[#D31145]"}`}
        >
          {isAway ? "Away" : "Home"}
        </div>
        <div className={`flex-1 ${index % 2 === 1 ? "bg-gray-200" : ""}`}>
          <div className="flex items-center gap-2 px-3 py-2 md:hidden">
            <div className="min-w-0 flex-1">
              <span className="block truncate text-sm font-bold text-gray-900">
                {isAway ? "@" : "vs"} {opponentName}
              </span>
              <div className="text-xs text-gray-500">
                <span>
                  {gameDow}, {gameMonth} {gameDay} · {gameTime}
                </span>
              </div>
            </div>
            {hasScore && (
              <div className="flex shrink-0 items-center gap-2">
                <span
                  className={`inline-flex size-8 items-center justify-center
                  rounded-full text-sm font-bold text-white
                  ${isWin ? "bg-green-600" : "bg-red-600"}`}
                >
                  {isWin ? "W" : "L"}
                </span>
                <span className="text-lg font-bold">
                  {twinsScore}-{opponentScore}
                </span>
              </div>
            )}
            <ChevronDown
              className={`size-4 shrink-0 text-gray-500 transition-transform
                ${isExpanded ? "rotate-180" : ""}`}
            />
          </div>
          <div
            className={`hidden items-center gap-4 px-4 py-3 md:grid
              ${hasScore ? "grid-cols-[1fr_8rem_auto_1rem]" : "grid-cols-[1fr_auto_1rem]"}`}
          >
            <div className="flex flex-col">
              <span className="text-base font-bold text-gray-900">
                {isAway ? "@" : "vs"} {opponentName}
              </span>
              <span className="text-xs text-gray-400">
                {gameData.venueName}
              </span>
            </div>
            {hasScore && (
              <div className="flex items-center gap-2.5">
                <span
                  className={`inline-flex size-9 items-center justify-center
                  rounded-full text-sm font-bold text-white
                  ${isWin ? "bg-green-600" : "bg-red-600"}`}
                >
                  {isWin ? "W" : "L"}
                </span>
                <span className="text-xl font-bold">
                  {twinsScore}-{opponentScore}
                </span>
              </div>
            )}
            <div className="flex flex-col items-end">
              <span className="text-sm font-semibold text-gray-900">
                {gameDow}, {gameMonth} {gameDay}
              </span>
              <span className="text-xs text-gray-400">{gameTime}</span>
            </div>
            <ChevronDown
              className={`size-4 text-gray-500 transition-transform
                ${isExpanded ? "rotate-180" : ""}`}
            />
          </div>
        </div>
      </div>
      {isExpanded && (
        <div
          className="cursor-default border-t border-gray-200 text-sm"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="flex flex-wrap items-center justify-between gap-2 px-4
              py-2.5 md:px-8"
          >
            <div>
              {gameData.seriesDescription && (
                <p className="text-sm font-semibold text-[#002B5C]">
                  {gameData.seriesDescription}
                  {gameData.seriesGameNumber && (
                    <span className="font-normal text-gray-500">
                      {" "}
                      — Game {gameData.seriesGameNumber}
                      {gameData.gamesInSeries
                        ? ` of ${gameData.gamesInSeries}`
                        : ""}
                    </span>
                  )}
                </p>
              )}
              {gameData.description && (
                <p className="mt-0.5 text-xs font-medium text-[#D31145]">
                  {gameData.description}
                </p>
              )}
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span>{status || "Scheduled"}</span>
              <span className="flex items-center gap-1">
                {gameData.isDayGame ? (
                  <Sun className="size-3 text-gray-900" />
                ) : (
                  <Moon className="size-3 text-gray-900" />
                )}
                {gameData.isDayGame ? "Day Game" : "Night Game"}
              </span>
              {isDoubleHeader && (
                <span>DH - Game {gameData.gameNumber || 1}</span>
              )}
            </div>
          </div>
          <div className="px-4 py-3 md:px-8">
            <div className="grid grid-cols-2 gap-4">
              {hasScore ? (
                <>
                  <div>
                    <p className="mb-1 text-xs text-gray-500">
                      {`${awayTeam.team.name}`}
                    </p>
                    <p className="text-xl font-bold">{awayTeam.score}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs text-gray-500">
                      {`${homeTeam.team.name}`}
                    </p>
                    <p className="text-xl font-bold">{homeTeam.score}</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <p className="mb-1 text-xs text-gray-500">
                      {`${awayTeam.team.name} Season Record`}
                    </p>
                    <p className="text-base font-semibold">
                      {awayTeam.leagueRecord?.wins}-
                      {awayTeam.leagueRecord?.losses}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs text-gray-500">
                      {`${homeTeam.team.name} Season Record`}
                    </p>
                    <p className="text-base font-semibold">
                      {homeTeam.leagueRecord?.wins}-
                      {homeTeam.leagueRecord?.losses}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 px-4 pb-4 md:px-8">
            <a
              href={gamedayUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 rounded bg-[#002B5C]
                px-3 py-1.5 text-xs font-medium text-white transition-colors
                hover:bg-[#003d80]"
            >
              MLB Gameday <ExternalLink className="size-3" />
            </a>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 rounded bg-[#002B5C]
                px-3 py-1.5 text-xs font-medium text-white transition-colors
                hover:bg-[#003d80]"
            >
              Get Directions <MapPin className="size-3" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
