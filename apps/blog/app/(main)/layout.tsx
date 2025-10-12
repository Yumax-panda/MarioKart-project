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
        "grid min-h-screen grid-cols-[100%] grid-rows-[auto_1fr_auto]",
      )}
    >
      <Header />
      {children}
      <Footer />
    </div>
  );
}
