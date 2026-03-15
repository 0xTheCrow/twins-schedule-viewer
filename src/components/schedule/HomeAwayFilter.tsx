import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type HomeAwayValue = "all" | "home" | "away";

const labels: Record<HomeAwayValue, string> = {
  all: "All Games",
  home: "Home",
  away: "Away",
};

export default function HomeAwayFilter({
  value,
  onChange,
}: {
  value: HomeAwayValue;
  onChange: (v: HomeAwayValue) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-28 rounded-md px-2 py-1.5 text-sm font-medium cursor-pointer hover:bg-white/20 transition-colors">
        {value === "all" ? "Home / Away" : labels[value]}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={value} onValueChange={(v) => onChange(v as HomeAwayValue)}>
          {(Object.keys(labels) as HomeAwayValue[]).map((key) => (
            <DropdownMenuRadioItem key={key} value={key}>
              {labels[key]}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
