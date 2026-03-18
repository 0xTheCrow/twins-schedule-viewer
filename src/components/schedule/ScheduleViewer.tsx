"use client";

import GameList from "@/components/schedule/GameList";
import ScheduleCard from "@/components/schedule/ScheduleCard";
import HomeAwayFilter, {
  HomeAwayValue,
} from "@/components/schedule/HomeAwayFilter";
import MonthNav from "@/components/schedule/MonthNav";
import OpponentFilter from "@/components/schedule/OpponentFilter";
import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import buildScheduleMaps from "@/lib/buildScheduleMaps";
import { useScheduleData } from "@/providers/ScheduleDataContext";

export default function ScheduleViewer() {
  const { rawScheduleData, refreshScheduleAction } = useScheduleData();
  
  const [isUpcomingToggleEnabled, setIsUpcomingToggleEnabled] =
    useState<boolean>(true);
  const [selectedOpponents, setSelectedOpponents] = useState<string[]>([]);
  const [homeAwaySetting, setHomeAwaySetting] = useState<HomeAwayValue>("all");
  const [activeMonth, setActiveMonth] = useState<number | null>(null);

  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const scrollToMonth = useCallback((month: number) => {
    const monthDividerElement = document.getElementById(`month-${month}`);
    if (monthDividerElement) {
      isScrollingRef.current = true;
      setActiveMonth(month);
      monthDividerElement.scrollIntoView({ behavior: "smooth", block: "start" });

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 800);
    }
  }, []);

  const dataMaps = useMemo(
    () => (rawScheduleData ? buildScheduleMaps(rawScheduleData) : null),
    [rawScheduleData],
  );

  const { 
    filteredGameIds, 
    pastCount, 
    upcomingCount, 
    monthsWithGames, 
    monthGameCounts 
  } = useMemo(() => {
    if (!dataMaps) {
      return {
        filteredGameIds: [],
        pastCount: 0,
        upcomingCount: 0,
        monthsWithGames: [],
        monthGameCounts: new Map(),
      };
    }

    const passesFilter = (gameId: string) => {
      const gameData = dataMaps.gameMap.get(gameId);
      if (!gameData) return false;
      if (
        selectedOpponents.length > 0 &&
        !selectedOpponents.includes(String(gameData.opponent.team.id))
      )
        return false;
      if (homeAwaySetting === "home" && gameData.isAway) return false;
      if (homeAwaySetting === "away" && !gameData.isAway) return false;
      return true;
    }

    const filteredPast = dataMaps.pastGames.filter(passesFilter);
    const filteredUpcoming = dataMaps.upcomingGames.filter(passesFilter);
    const filteredGameIds = isUpcomingToggleEnabled
      ? filteredUpcoming
      : filteredPast;

    const monthGameCounts = new Map<number, number>();
    for (const gameId of filteredGameIds) {
      const gameData = dataMaps.gameMap.get(gameId)!;
      monthGameCounts.set(gameData.month, (monthGameCounts.get(gameData.month) ?? 0) + 1);
    }
    const monthsWithGames = [...monthGameCounts.keys()];

    return {
      filteredGameIds,
      pastCount: filteredPast.length,
      upcomingCount: filteredUpcoming.length,
      monthsWithGames,
      monthGameCounts,
    };
  }, [dataMaps, isUpcomingToggleEnabled, selectedOpponents, homeAwaySetting]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const updateActiveMonth = () => {
      if (isScrollingRef.current) return;
      const dividers = document.querySelectorAll("[data-month]");
      let closestElement: Element | null = null;
      let closestDistance = Infinity;
      dividers.forEach((dividerElement) => {
        const dividerDistance = Math.abs(dividerElement.getBoundingClientRect().top);
        if (dividerDistance < closestDistance) {
          closestDistance = dividerDistance;
          closestElement = dividerElement;
        }
      });
      if (closestElement) {
        setActiveMonth(Number((closestElement as Element).getAttribute("data-month")));
      }
    };

    const onScroll = () => {
      if (timeoutId !== null) return;
      timeoutId = setTimeout(() => {
        updateActiveMonth();
        timeoutId = null;
      }, 50);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateActiveMonth();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timeoutId !== null) clearTimeout(timeoutId);
    };
  }, [filteredGameIds]);

  if (!dataMaps) {
    return (
      <div
        className="flex min-h-[60vh] w-full flex-col items-center justify-center
          gap-4 text-center"
      >
        <p className="text-lg font-semibold text-white">
          Failed to load schedule data
        </p>
        <form action={refreshScheduleAction}>
          <button
            type="submit"
            className="cursor-pointer rounded-md bg-white px-4 py-2 text-sm
              font-medium text-[#002B5C] transition-colors hover:bg-white/90"
          >
            Retry
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className={"flex w-full flex-col gap-4"}>
      {dataMaps.liveGame && (
        <ScheduleCard gameData={dataMaps.liveGame} index={0} isLive />
      )}
      <div
        className="flex flex-col gap-3 rounded-lg border border-white/15
          bg-white/10 px-4 py-3 backdrop-blur-sm sm:flex-row sm:flex-wrap
          sm:items-center"
      >
        <div className="min-w-0 sm:flex-1">
          <OpponentFilter
            opponentMap={dataMaps.opponentMap}
            selectedOpponents={selectedOpponents}
            onChange={setSelectedOpponents}
          />
        </div>
        <div className="hidden h-6 w-px bg-white/20 sm:block" />
        <div className="flex items-center gap-3">
          <HomeAwayFilter value={homeAwaySetting} onChange={setHomeAwaySetting} />
          <div className="h-6 w-px bg-white/20" />
          <div
            className="flex rounded-md bg-white/10 p-0.5 text-sm font-medium
              select-none"
          >
            <button
              type="button"
              onClick={() => setIsUpcomingToggleEnabled(false)}
              className={`flex cursor-pointer items-center justify-center
                gap-1.5 rounded-md px-3 py-1 transition-all duration-200 ${
                  !isUpcomingToggleEnabled
                    ? "bg-white text-[#002B5C] shadow-sm"
                    : "text-white/60 hover:text-white/80"
                }`}
            >
              Past
              <span
                className={`inline-flex h-5 min-w-5 items-center justify-center
                  rounded-full px-1 text-[10px] font-medium ${
                    !isUpcomingToggleEnabled
                      ? "bg-[#002B5C]/20 text-[#002B5C]"
                      : "bg-white/20 text-white/60"
                  }`}
              >
                {pastCount}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setIsUpcomingToggleEnabled(true)}
              className={`flex cursor-pointer items-center justify-center
                gap-1.5 rounded-md px-3 py-1 transition-all duration-200 ${
                  isUpcomingToggleEnabled
                    ? "bg-white text-[#002B5C] shadow-sm"
                    : "text-white/60 hover:text-white/80"
                }`}
            >
              Upcoming
              <span
                className={`inline-flex h-5 min-w-5 items-center justify-center
                  rounded-full px-1 text-[10px] font-medium ${
                    isUpcomingToggleEnabled
                      ? "bg-[#002B5C]/20 text-[#002B5C]"
                      : "bg-white/20 text-white/60"
                  }`}
              >
                {upcomingCount}
              </span>
            </button>
          </div>
        </div>
      </div>
      {filteredGameIds.length === 0 ? (
        <p className="pt-8 text-center text-white/60">
          {`No ${isUpcomingToggleEnabled ? "upcoming" : "past"} games found`}
        </p>
      ) : (
        <div className="relative flex gap-4">
          <div className="flex flex-1 flex-col gap-2">
            <GameList gameIds={filteredGameIds} gameMap={dataMaps.gameMap} />
          </div>
          <MonthNav
            months={monthsWithGames}
            monthGameCounts={monthGameCounts}
            activeMonth={activeMonth}
            onMonthClick={(month, i) =>
              i === 0
                ? window.scrollTo({ top: 0, behavior: "smooth" })
                : scrollToMonth(month)
            }
          />
        </div>
      )}
    </div>
  );
}
