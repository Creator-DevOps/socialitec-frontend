import React, { ReactNode, useState, useEffect } from "react";
import MinimumPageContainer from "@components/containers/minimum-page.container";
import Sidebar, { SidebarProps } from "./sidebar.layout";
import ContentArea from "./contentArea.layout";
import Header from "./header";
import Footer from "./footer";

type HomeLayoutProps = {
  children?: ReactNode;
};

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [ragDisabled, setRagDisabled] = useState(false);

  const childArray = React.Children.toArray(children) as React.ReactElement[];
  const passedSidebar = childArray.find(c => c.type === Sidebar);

  const sidebarElement = passedSidebar
    ? React.cloneElement<SidebarProps>(passedSidebar, {
        sidebarOpen,
        onClose: () => { setSidebarOpen(false); setRagDisabled(true); },
        ragDisabled,
      })
    : <Sidebar sidebarOpen={sidebarOpen} onClose={() => { setSidebarOpen(false); setRagDisabled(true); }} ragDisabled={ragDisabled} />;

  const mainContent = childArray.filter(c => c !== passedSidebar);

  useEffect(() => {
    const handleResize = () => {
      const open = window.innerWidth >= 1024;
      setSidebarOpen(open);
      setRagDisabled(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full h-screen flex overflow-hidden">
      {sidebarElement}

      <MinimumPageContainer>
        <Header sidebarOpen={sidebarOpen} onSidebarOpen={() => { setSidebarOpen(true); setRagDisabled(false); }} />
        <main className="flex-1 flex min-h-0">
          <ContentArea>{mainContent}</ContentArea>
        </main>
        <Footer />
      </MinimumPageContainer>
    </div>
  );
};

export default HomeLayout;
