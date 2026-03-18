import { revalidatePath } from "next/cache";
import { ScheduleDataContextProvider } from "./ScheduleDataContext";

const REVALIDATE_SECONDS = 300;

async function getScheduleData() {
  const teamId = process.env.NEXT_PUBLIC_TWINS_TEAM_ID;
  const apiBase = process.env.NEXT_PUBLIC_MLB_STATS_API_BASE;
  const url = `${apiBase}/v1/schedule?teamId=${teamId}&sportId=1&gameType=REGULAR_SEASON&season=2026`;

  try {
    const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
    if (!res.ok) {
      return null;
    } else {
      return res.json();
    }
  } catch {
    return null;
  }
}

async function refreshScheduleAction() {
  "use server";
  revalidatePath("/");
}

export default async function ScheduleDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getScheduleData();
  return (
    <ScheduleDataContextProvider data={data} refreshAction={refreshScheduleAction}>
      {children}
    </ScheduleDataContextProvider>
  );
}
