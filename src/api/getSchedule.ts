const getSchedule = async () => {
  const scheduleRoute = process.env.NEXT_PUBLIC_TWINS_2026_SCHEDULE_API_ROUTE;
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
