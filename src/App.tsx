import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
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
import { AuthProvider } from "@/contexts/AuthContext";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
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
          <Route path="/client" element={<Navigate to="/portal" replace />} />
          <Route 
            path="/portal/dashboard" 
            element={
              <ProtectedRoute requiredRole="client">
                <PortalDashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="/dashboard" element={<Navigate to="/portal/dashboard" replace />} />
          
          {/* Admin Portal */}
          <Route path="/portal/admin" element={<AdminLogin />} />
          <Route path="/admin" element={<Navigate to="/portal/admin" replace />} />
          <Route 
            path="/portal/admin/dashboard" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Leader Portal */}
          <Route path="/portal/leader" element={<LeaderLogin />} />
          <Route 
            path="/portal/leader/dashboard" 
            element={
              <ProtectedRoute requiredRole="leader">
                <LeaderDashboard />
              </ProtectedRoute>
            } 
          />

          {/* 404 Route */}
          <Route path="/404" element={<NotFound />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
