const monthAbbrevs = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function MonthNav({
  months,
  monthGameCounts,
  activeMonth,
  onMonthClick,
}: {
  months: number[];
  monthGameCounts: Record<number, number>;
  activeMonth: number | null;
  onMonthClick: (month: number, index: number) => void;
}) {
  return (
    <div className="sticky top-2 flex flex-col gap-1 self-start md:top-60">
      {months.map((month, i) => (
        <button
          key={month}
          onClick={() => onMonthClick(month, i)}
          className={`flex shrink-0 cursor-pointer items-center justify-between
          gap-2 rounded-md px-3 py-2 text-sm transition-colors md:w-20 ${
            activeMonth === month
              ? "bg-white font-semibold text-[#002B5C]"
              : "text-white/60 hover:bg-white/10"
          }`}
        >
          {monthAbbrevs[month]}
          <span
            className={`inline-flex size-5 items-center justify-center
            rounded-full text-[10px] font-medium ${
              activeMonth === month
                ? "bg-[#002B5C]/20 text-[#002B5C]"
                : "bg-white/20 text-white/60"
            }`}
          >
            {monthGameCounts[month]}
          </span>
        </button>
      ))}
    </div>
  );
}
