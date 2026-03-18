import {
  Combobox,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import { TeamDataWithGames } from "@/types/schedule";

export default function OpponentFilter({
  opponentMap,
  selectedOpponents,
  onChange,
}: {
  opponentMap: Map<number, TeamDataWithGames>;
  selectedOpponents: string[];
  onChange: (values: string[]) => void;
}) {
  const anchor = useComboboxAnchor();

  const opponentItems = Array.from(opponentMap.entries())
    .sort(([, a], [, b]) => a.team.name.localeCompare(b.team.name))
    .map(([id, opponent]) => ({
      value: String(id),
      label: opponent.team.name,
    }));

  return (
    <Combobox
      items={opponentItems}
      multiple
      value={selectedOpponents}
      onValueChange={onChange}
    >
      <ComboboxChips
        ref={anchor}
        className="w-full rounded-md border-white/20 bg-white/5 text-white/90
          placeholder:text-white/40"
      >
        {selectedOpponents.map((id) => {
          const opponent = opponentMap.get(Number(id));
          return (
            <ComboboxChip
              key={id}
              value={id}
              className="bg-white/15 text-white/90
                [&_[data-slot=combobox-chip-remove]]:text-white/90
                [&_[data-slot=combobox-chip-remove]]:hover:bg-white/20"
            >
              {opponent?.team.name}
            </ComboboxChip>
          );
        })}
        <ComboboxChipsInput
          placeholder={selectedOpponents.length === 0 ? "Select opponents" : ""}
          className="text-white/90 placeholder:text-white/40"
        />
      </ComboboxChips>
      <ComboboxContent anchor={anchor} className="!w-auto !min-w-0">
        <div className="border-border border-b p-1">
          <button
            type="button"
            onMouseDown={(e) => {
              onChange([]);
            }}
            className="text-muted-foreground hover:bg-accent
              hover:text-accent-foreground w-full cursor-pointer rounded-md
              px-1.5 py-1 text-left text-sm transition-colors"
          >
            Clear
          </button>
        </div>
        <ComboboxEmpty>No opponents found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.value} value={item.value}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
