import { useState } from "react";
import { ChevronDown } from "lucide-react";
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
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        className="inline-flex w-36 cursor-pointer items-center justify-between
          gap-1.5 rounded-md border border-white/20 px-3 py-1.5 text-sm
          font-medium text-white/90 transition-colors hover:bg-white/15"
      >
        {value === "all" ? "Home / Away" : labels[value]}
        <ChevronDown className="size-3.5 text-white/50" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(v) => {
            onChange(v as HomeAwayValue);
            setOpen(false);
          }}
        >
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
