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

export default function OpponentFilter({
  opponentMap,
  selectedOpponents,
  onChange,
}: {
  opponentMap: Map<number, { team: { id: number; name: string }; games: string[] }>;
  selectedOpponents: string[];
  onChange: (values: string[]) => void;
}) {
  const anchor = useComboboxAnchor();

  const opponents = Array.from(opponentMap.entries())
    .sort(([, a], [, b]) => a.team.name.localeCompare(b.team.name))
    .map(([id, opponent]) => ({
      value: String(id),
      label: opponent.team.name,
    }));

  return (
    <Combobox
      items={opponents}
      multiple
      value={selectedOpponents}
      onValueChange={onChange}
      getItemLabel={(item) => item.label}
      getItemValue={(item) => item.value}
    >
      <ComboboxChips ref={anchor} className="w-full border-white/20 bg-white/5 text-white/90 placeholder:text-white/40">
        {selectedOpponents.map((id) => {
          const opponent = opponentMap.get(Number(id));
          return (
            <ComboboxChip key={id} value={id} className="bg-white/15 text-white/90">
              {opponent?.team.name}
            </ComboboxChip>
          );
        })}
        <ComboboxChipsInput placeholder="Filter opponents..." className="text-white/90 placeholder:text-white/40" />
      </ComboboxChips>
      <ComboboxContent anchor={anchor} className="!w-auto !min-w-0">
        <div className="p-1 border-b border-border">
          <button
            type="button"
            onMouseDown={(e) => { e.preventDefault(); onChange([]); }}
            className="w-full text-left rounded-md px-1.5 py-1 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
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
