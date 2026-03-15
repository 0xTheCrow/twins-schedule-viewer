"use client";

import getSchedule from "@/api/getSchedule";
import PageContent from "@/components/layout/PageContent";
import GameList from "@/components/schedule/GameList";
import ScheduleCardSkeleton from "@/components/schedule/ScheduleCardSkeleton";
import HomeAwayFilter, { HomeAwayValue } from "@/components/schedule/HomeAwayFilter";
import MonthNav from "@/components/schedule/MonthNav";
import OpponentFilter from "@/components/schedule/OpponentFilter";
import { Switch } from "@/components/ui/switch";
import { useCallback, useEffect, useRef, useState } from "react";
import buildScheduleMaps from "@/lib/buildScheduleMaps";
import { ScheduleMaps } from "@/types/schedule";

export default function Dashboard() {

  const [dataMaps, setDataMaps] = useState<ScheduleMaps | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const [isUpcomingToggleEnabled, setIsUpcomingToggleEnabled] = useState<boolean>(true);
  const [selectedOpponents, setSelectedOpponents] = useState<string[]>([]);
  const [homeAway, setHomeAway] = useState<HomeAwayValue>("all");
  const [activeMonth, setActiveMonth] = useState<number | null>(null);

  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const scrollToMonth = useCallback((month: number) => {
    const el = document.getElementById(`month-${month}`);
    if (el) {
      isScrollingRef.current = true;
      setActiveMonth(month);
      el.scrollIntoView({ behavior: "smooth", block: "start" });

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 800);
    }
  }, []);

  useEffect(() => {
    const updateActiveMonth = () => {
      if (isScrollingRef.current) return;

      const dividers = document.querySelectorAll("[data-month]");
      let closest: Element | null = null;
      let closestDist = Infinity;
      dividers.forEach((el) => {
        const dist = Math.abs(el.getBoundingClientRect().top);
        if (dist < closestDist) {
          closestDist = dist;
          closest = el;
        }
      });
      if (closest) {
        setActiveMonth(Number((closest as Element).getAttribute("data-month")));
      }
    };

    window.addEventListener("scroll", updateActiveMonth, { passive: true });
    updateActiveMonth();

    return () => window.removeEventListener("scroll", updateActiveMonth);
  }, [dataMaps, isUpcomingToggleEnabled, selectedOpponents, homeAway]);

  const getFilteredGameIds = () => {
    const games = isUpcomingToggleEnabled ? dataMaps?.upcomingGames : dataMaps?.pastGames;
    if (!games || !dataMaps) return [];

    return games.filter((gameId) => {
      const gameData = dataMaps.gameMap.get(gameId);
      if (!gameData) return false;
      if (selectedOpponents.length > 0 && !selectedOpponents.includes(String(gameData.opponent.team.id))) return false;
      if (homeAway === "home" && gameData.isAway) return false;
      if (homeAway === "away" && !gameData.isAway) return false;
      return true;
    });
  };

  const getMonthData = (gameIds: string[]) => {
    const months: number[] = [];
    const monthGameCounts: Record<number, number> = {};
    const seen = new Set<number>();

    gameIds.forEach((gameId) => {
      const gameData = dataMaps!.gameMap.get(gameId)!;
      monthGameCounts[gameData.month] = (monthGameCounts[gameData.month] || 0) + 1;
      if (!seen.has(gameData.month)) {
        seen.add(gameData.month);
        months.push(gameData.month);
      }
    });

    return { months, monthGameCounts };
  };

  useEffect(() => {
    getSchedule().then(res => {
      const isSuccess = res.success;
      if (isSuccess) {
        const builtMaps = buildScheduleMaps(res.data);
        setDataMaps(builtMaps);
      }
      setIsLoading(false);
    });
  }, []);

  return (
    <PageContent>
      <div className={'flex flex-col gap-4 w-full'}>
        <div className="flex flex-wrap items-center gap-3 rounded-md bg-white/10 border border-white/20 px-4 py-2.5">
          <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
            <Switch
              checked={isUpcomingToggleEnabled}
              onCheckedChange={(checked) => setIsUpcomingToggleEnabled(checked)}
            />
            <span>Upcoming</span>
          </label>
          <div className="h-6 w-px bg-white/20" />
          <HomeAwayFilter value={homeAway} onChange={setHomeAway} />
          <div className="h-6 w-px bg-white/20" />
          {dataMaps && (
            <OpponentFilter
              opponentMap={dataMaps.opponentMap}
              selectedOpponents={selectedOpponents}
              onChange={setSelectedOpponents}
            />
          )}
        </div>
        {(() => {
          if (isLoading) {
            return (
              <div className="flex flex-col gap-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <ScheduleCardSkeleton key={i} index={i} />
                ))}
              </div>
            );
          }
          const filtered = getFilteredGameIds();
          if (filtered.length === 0) {
            return <span>No Games Found</span>;
          }
          const { months, monthGameCounts } = getMonthData(filtered);
          return (
            <div className="relative flex gap-4">
              <div className="flex-1 flex flex-col gap-2">
                <GameList gameIds={filtered} gameMap={dataMaps!.gameMap} />
              </div>
              <MonthNav
                months={months}
                monthGameCounts={monthGameCounts}
                activeMonth={activeMonth}
                onMonthClick={(month, i) => i === 0 ? window.scrollTo({ top: 0, behavior: "smooth" }) : scrollToMonth(month)}
              />
            </div>
          );
        })()}

      </div>
    </PageContent>
  );
}
