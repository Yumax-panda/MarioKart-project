import { cn } from "@/lib/css";
import { Footer } from "./_components/Footer";
import { Header } from "./_components/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "racing-gradient racing-grid-bg relative grid min-h-screen grid-cols-[100%] grid-rows-[auto_1fr_auto] overflow-x-hidden text-gray-100",
      )}
    >
      {/* Decorative elements */}
      <div className="pointer-events-none fixed inset-0 opacity-30">
        <div className="absolute top-20 right-0 h-[500px] w-[500px] rounded-full bg-[var(--color-racing-cyan)] opacity-10 blur-[120px]" />
        <div className="absolute bottom-20 left-0 h-[500px] w-[500px] rounded-full bg-[var(--color-racing-magenta)] opacity-10 blur-[120px]" />
      </div>

      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
