const getSchedule = async () => {
  const twinsId = process.env.NEXT_PUBLIC_TWINS_TEAM_ID;
  const apiBase = process.env.NEXT_PUBLIC_MLB_STATS_API_BASE;
  const scheduleRoute = `${apiBase}/v1/schedule?teamId=${twinsId}&sportId=1&gameType=REGULAR_SEASON&season=2026`;
  if (!scheduleRoute) {
    return {
      success: false,
      data: undefined,
    };
  }
  return await fetch(scheduleRoute)
    .then((res) => res.json())
    .then((res) => {
      return {
        success: true,
        data: res,
      };
    })
    .catch((err) => {
      return {
        success: false,
        data: undefined,
      };
    });
};

export default getSchedule;
