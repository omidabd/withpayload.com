import { Footer } from "@/app/(app)/Footer";
import { Header } from "@/app/(app)/Header";

interface LayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<LayoutProps> = async ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="">{children}</div>
      </main>
      <Footer />
    </div>
  );
};
