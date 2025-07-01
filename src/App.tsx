import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import { ROUTES } from "@/constants";

// Lazy load pages for better performance
const Index = React.lazy(() => import("./pages/Index"));
const Demo = React.lazy(() => import("./pages/Demo"));
const Auth = React.lazy(() => import("./pages/Auth"));
const EditProfile = React.lazy(() => import("./pages/EditProfile"));
const MyAccount = React.lazy(() => import("./pages/MyAccount"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

// Configure React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

const App: React.FC = () => (
  <ErrorBoundary
    onError={(error, errorInfo) => {
      // Log to error reporting service in production
      console.error("App Error:", error, errorInfo);
    }}
  >
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <React.Suspense
            fallback={
              <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-gray-600 font-medium">Loading...</p>
                </div>
              </div>
            }
          >
            <BrowserRouter>
              <Routes>
                <Route path={ROUTES.HOME} element={<Index />} />
                <Route path={ROUTES.DEMO} element={<Demo />} />
                <Route path={ROUTES.AUTH} element={<Auth />} />
                <Route path={ROUTES.EDIT_PROFILE} element={<EditProfile />} />
                <Route path={ROUTES.ACCOUNT} element={<MyAccount />} />
                <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </React.Suspense>

          {/* Global toast notifications */}
          <Toaster />
          <Sonner />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
