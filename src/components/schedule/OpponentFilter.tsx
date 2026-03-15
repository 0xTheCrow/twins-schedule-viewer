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
      <ComboboxChips ref={anchor} className="w-full md:w-64">
        {selectedOpponents.map((id) => {
          const opponent = opponentMap.get(Number(id));
          return (
            <ComboboxChip key={id} value={id}>
              {opponent?.team.name}
            </ComboboxChip>
          );
        })}
        <ComboboxChipsInput placeholder="Filter opponents..." />
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
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
