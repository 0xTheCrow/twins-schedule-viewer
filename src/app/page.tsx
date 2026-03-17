import ScheduleViewer from "@/components/schedule/ScheduleViewer";
import { revalidatePath } from "next/cache";

const REVALIDATE_SECONDS = 300;

async function getScheduleData() {
  const teamId = process.env.NEXT_PUBLIC_TWINS_TEAM_ID;
  const apiBase = process.env.NEXT_PUBLIC_MLB_STATS_API_BASE;
  const url = `${apiBase}/v1/schedule?teamId=${teamId}&sportId=1&gameType=REGULAR_SEASON&season=2026`;

  const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
  if (!res.ok) return null;
  return res.json();
}

async function refreshScheduleAction() {
  "use server";
  revalidatePath("/");
}

export default async function Home() {
  const data = await getScheduleData();
  return (
    <ScheduleViewer
      rawData={data}
      refreshScheduleAction={refreshScheduleAction}
    />
  );
}
