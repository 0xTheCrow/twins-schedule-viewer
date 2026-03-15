interface ScheduleTableRowProps {
  cells: React.ReactNode[];
}

export default function ScheduleTableRow({ cells }: ScheduleTableRowProps) {
  return (
    <div className="flex border-b transition-colors hover:bg-gray-50">
      {cells.map((cell, index) => (
        <div key={index} className="flex-1 px-2 py-2">
          {cell}
        </div>
      ))}
    </div>
  );
}
