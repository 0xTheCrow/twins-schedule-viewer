const monthAbbrevs = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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
    <div className="sticky top-2 md:top-60 self-start flex flex-col gap-1">
      {months.map((month, i) => (
        <button
          key={month}
          onClick={() => onMonthClick(month, i)}
          className={`flex items-center justify-between gap-2 shrink-0 text-sm px-3 py-2 rounded-md cursor-pointer transition-colors md:w-20 ${
            activeMonth === month
              ? "bg-white text-[#002B5C] font-semibold"
              : "text-white/60 hover:bg-white/10"
          }`}
        >
          {monthAbbrevs[month]}
          <span
            className={`inline-flex items-center justify-center size-5 rounded-full text-[10px] font-medium ${
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
