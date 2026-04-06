import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import DashboardSidebar, { type DashboardSection } from "@/components/dashboard/DashboardSidebar";
import GeneralSettings from "@/components/dashboard/GeneralSettings";
import HeroSlidesManager from "@/components/dashboard/HeroSlidesManager";
import ArticlesManager from "@/components/dashboard/ArticlesManager";
import AboutEditor from "@/components/dashboard/AboutEditor";
import ContactEditor from "@/components/dashboard/ContactEditor";
import FooterEditor from "@/components/dashboard/FooterEditor";
import { LogOut } from "lucide-react";

const Dashboard = () => {
  const { session, loading, signOut } = useAuth();
  const [section, setSection] = useState<DashboardSection>("general");

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="font-body text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin" replace />;
  }

  const renderSection = () => {
    switch (section) {
      case "general": return <GeneralSettings />;
      case "hero": return <HeroSlidesManager />;
      case "articles": return <ArticlesManager />;
      case "about": return <AboutEditor />;
      case "contact": return <ContactEditor />;
      case "footer": return <FooterEditor />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar active={section} onSelect={setSection} />
      <main className="flex-1 p-8 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <div />
          <button
            onClick={signOut}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-body text-muted-foreground hover:text-destructive transition-colors"
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
        {renderSection()}
      </main>
    </div>
  );
};

export default Dashboard;
