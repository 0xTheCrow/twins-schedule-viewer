export default function PageContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 w-full px-3 py-4 md:px-8 md:py-6">
      {children}
    </div>
  );
}
