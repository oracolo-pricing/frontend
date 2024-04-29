import { Button } from "@/components/ui/button";
import { Box, Cog, LayoutList } from "lucide-react";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";
import { Header } from "./Header";

const Sidebar: React.FC = () => {
   const navigate = useNavigate();
   const isMobile = useMediaQuery("(max-width: 768px)");
   const location = useLocation();

   useEffect(() => {
      window.scrollTo(0, 0);
   }, [location.pathname]);

   return (
      <nav className={`${isMobile ? "sticky top-[57px] bg-background z-10 border-b" : "border-r"}`}>
         <div
            className={`flex h-auto grow-0 gap-2 ${
               isMobile ? "py-2 px-4" : "flex-col sticky top-[57px] p-2"
            } overflow-auto scrollbar-hide`}
         >
            <Button
               onClick={() => navigate("/positioning")}
               className="justify-start"
               variant={window.location.pathname.includes("/positioning") ? "default" : "ghost"}
            >
               <LayoutList className="w-4 mr-2" />
               Positioning
            </Button>
            <Button
               onClick={() =>
                  navigate("/products", {
                     preventScrollReset: false,
                  })
               }
               variant={window.location.pathname.includes("/products") ? "default" : "ghost"}
               className="justify-start"
            >
               <Box className="w-4 mr-2" />
               Products
            </Button>
            <Button
               onClick={() => navigate("/tasks")}
               variant={window.location.pathname.includes("/tasks") ? "default" : "ghost"}
               className="justify-start"
            >
               <Cog className="w-4 mr-2" />
               Tasks
            </Button>
         </div>
      </nav>
   );
};

const Footer: React.FC = () => {
   return (
      <footer className="text-xs p-2 py-4 opacity-50 bg-secondary">
         Beta version: {process.env.REACT_APP_VERSION}
         <br />
         Copyright © 2024 AutoMind S.r.l. All rights reserved.
      </footer>
   );
};

export const Layout: React.FC = () => {
   const isMobile = useMediaQuery("(max-width: 768px)");
   const isLandscape = useMediaQuery("(orientation: landscape)");

   return (
      <div className={`min-h-screen flex flex-col ${isMobile && isLandscape ? "border-x" : ""}`}>
         <Header />
         <main className={`flex ${isMobile ? "flex-col" : ""} border-b flex-1`}>
            <Sidebar />
            <div className="overflow-auto w-full">
               <Outlet />
            </div>
         </main>
         <div className="text-center">
            <Footer />
         </div>
      </div>
   );
};
