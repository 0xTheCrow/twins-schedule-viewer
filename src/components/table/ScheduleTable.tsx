interface ScheduleTableProps {
  headers: string[];
  children: React.ReactNode;
}

export default function ScheduleTable({ headers, children }: ScheduleTableProps) {
  return (
    <div className="w-full">
      <div className="flex border-b">
        {headers.map((header) => (
          <div key={header} className="flex-1 px-2 py-2 font-medium">
            {header}
          </div>
        ))}
      </div>
      <div>{children}</div>
    </div>
  );
}
