"use client";

import { createContext, useContext } from "react";
import { GameData } from "@/types/schedule";

interface ScheduleData {
  dates: { games: GameData[] }[];
}

interface ScheduleDataContextValue {
  rawScheduleData: ScheduleData | null;
  refreshScheduleAction: () => Promise<void>;
}

export const ScheduleDataContext = createContext<ScheduleDataContextValue | null>(null);

export function useScheduleData() {
  const ctx = useContext(ScheduleDataContext);
  if (!ctx) throw new Error("useScheduleData must be used within ScheduleDataProvider");
  return ctx;
}

export function ScheduleDataContextProvider({
  data,
  refreshAction,
  children,
}: {
  data: ScheduleData | null;
  refreshAction: () => Promise<void>;
  children: React.ReactNode;
}) {
  return (
    <ScheduleDataContext.Provider value={{ rawScheduleData: data, refreshScheduleAction: refreshAction }}>
      {children}
    </ScheduleDataContext.Provider>
  );
}
