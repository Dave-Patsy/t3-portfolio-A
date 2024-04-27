

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex h-full items-center justify-center">
      {children}
    </section>
  );
}