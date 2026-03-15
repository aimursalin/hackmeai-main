import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import ServiceGallery from "./pages/ServiceGallery.tsx";
import PortalLogin from "./pages/PortalLogin.tsx";
import PortalDashboard from "./pages/PortalDashboard.tsx";
import AdminLogin from "./pages/AdminLogin.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import LeaderLogin from "./pages/LeaderLogin.tsx";
import LeaderDashboard from "./pages/LeaderDashboard.tsx";
import NotFound from "./pages/NotFound.tsx";

import { InteractiveNebulaShader } from "@/components/ui/liquid-shader";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <InteractiveNebulaShader className="opacity-40" />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services/:slug" element={<ServiceGallery />} />
          
          {/* Client Portal */}
          <Route path="/portal" element={<PortalLogin />} />
          <Route path="/portal/dashboard" element={<PortalDashboard />} />
          
          {/* Admin Portal */}
          <Route path="/portal/admin" element={<AdminLogin />} />
          <Route path="/portal/admin/dashboard" element={<AdminDashboard />} />
          
          {/* Leader Portal */}
          <Route path="/portal/leader" element={<LeaderLogin />} />
          <Route path="/portal/leader/dashboard" element={<LeaderDashboard />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
