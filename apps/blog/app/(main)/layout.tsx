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
        "grid min-h-screen grid-cols-[100%] grid-rows-[auto_1fr_auto] bg-gradient-to-br from-[#0f0f23] to-[#1a1a2e] text-gray-200",
      )}
    >
      <Header />
      {children}
      <Footer />
    </div>
  );
}
