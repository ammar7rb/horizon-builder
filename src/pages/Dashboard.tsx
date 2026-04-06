import { useState } from "react";
import DashboardSidebar, { type DashboardSection } from "@/components/dashboard/DashboardSidebar";
import GeneralSettings from "@/components/dashboard/GeneralSettings";
import HeroSlidesManager from "@/components/dashboard/HeroSlidesManager";
import ArticlesManager from "@/components/dashboard/ArticlesManager";
import AboutEditor from "@/components/dashboard/AboutEditor";
import ContactEditor from "@/components/dashboard/ContactEditor";

const Dashboard = () => {
  const [section, setSection] = useState<DashboardSection>("general");

  const renderSection = () => {
    switch (section) {
      case "general": return <GeneralSettings />;
      case "hero": return <HeroSlidesManager />;
      case "articles": return <ArticlesManager />;
      case "about": return <AboutEditor />;
      case "contact": return <ContactEditor />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar active={section} onSelect={setSection} />
      <main className="flex-1 p-8 max-w-4xl">
        {renderSection()}
      </main>
    </div>
  );
};

export default Dashboard;
