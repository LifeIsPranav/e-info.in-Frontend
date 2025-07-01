import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  MousePointer,
  UserCog,
  CreditCard,
  Home,
  Star,
  ArrowRight,
  Edit3,
  ExternalLink,
  TrendingUp,
} from "lucide-react";
import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/Footer";
import BaseLayout from "@/components/layout/BaseLayout";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { formatNumber } from "@/utils";
import { ROUTES } from "@/constants";
import type { DashboardStats } from "@/types";

const Dashboard: React.FC = () => {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    cardViews: 0,
    stars: 0,
    totalClicks: 0,
  });
  const [statsLoading, setStatsLoading] = useState(true);

  // Redirect to auth if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate(ROUTES.AUTH);
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Simulate fetching stats
  useEffect(() => {
    const fetchStats = async () => {
      if (!isAuthenticated) return;

      try {
        setStatsLoading(true);
        // Mock data - in real app, this would come from your backend
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Get star count from localStorage
        const starData = JSON.parse(
          localStorage.getItem("profile_stars") || "{}",
        );
        const starCount = starData["demo-profile"] || 0;

        setStats({
          cardViews: 1247,
          stars: starCount,
          totalClicks: 389,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setStatsLoading(false);
      }
    };

    fetchStats();
  }, [isAuthenticated]);

  // Refresh stats when user returns to dashboard (to show updated star count)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && isAuthenticated) {
        // Refresh star count when page becomes visible
        const starData = JSON.parse(
          localStorage.getItem("profile_stars") || "{}",
        );
        const starCount = starData["demo-profile"] || 0;

        setStats((prevStats) => ({
          ...prevStats,
          stars: starCount,
        }));
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isAuthenticated]);

  // Show loading while checking auth
  if (authLoading) {
    return (
      <BaseLayout background="gray" centered>
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner size="lg" label="Loading dashboard..." />
        </div>
      </BaseLayout>
    );
  }

  // Redirect will handle navigation for unauthenticated users
  if (!isAuthenticated) {
    return null;
  }

  const firstName = user?.name?.split(" ")[0] || "User";

  return (
    <BaseLayout background="gray" noPadding>
      {/* Navigation */}
      <Navigation
        background="blur"
        rightContent={
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(ROUTES.HOME)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors bg-white border border-gray-200 font-medium"
              aria-label="Go to homepage"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </button>

            <button
              onClick={() => navigate(ROUTES.ACCOUNT)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors bg-white border border-gray-200 font-medium"
              aria-label="Manage account settings"
            >
              <UserCog className="w-4 h-4" />
              <span className="hidden sm:inline">Account</span>
            </button>

            <button
              onClick={() => navigate(ROUTES.DEMO)}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors font-medium"
              aria-label="View your profile card"
            >
              <CreditCard className="w-4 h-4" />
              <span className="hidden sm:inline">My Card</span>
            </button>
          </div>
        }
      />

      {/* Main Content */}
      <main className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-6 py-8">
        <div className="w-full max-w-5xl mx-auto">
          {/* Welcome Section */}
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome back, {firstName}!
            </h1>
            <p className="text-gray-600 text-lg">
              Here's how your profile is performing
            </p>
          </header>

          {/* Stats Section */}
          <section
            className="grid md:grid-cols-3 gap-6 mb-16"
            aria-labelledby="stats-heading"
          >
            <h2 id="stats-heading" className="sr-only">
              Profile Statistics
            </h2>

            {/* Card Views */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 text-center hover:shadow-md transition-shadow duration-200">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
                  <Eye className="w-6 h-6 text-gray-600" aria-hidden="true" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Card Views
                </h3>
                {statsLoading ? (
                  <div className="h-12 flex items-center justify-center">
                    <LoadingSpinner size="md" />
                  </div>
                ) : (
                  <p className="text-4xl font-bold text-gray-900">
                    {formatNumber(stats.cardViews)}
                  </p>
                )}
                <p className="text-sm text-gray-500">
                  People who viewed your profile
                </p>
              </div>
            </div>

            {/* Stars */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 text-center hover:shadow-md transition-shadow duration-200">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-gray-600" aria-hidden="true" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Stars
                </h3>
                {statsLoading ? (
                  <div className="h-12 flex items-center justify-center">
                    <LoadingSpinner size="md" />
                  </div>
                ) : (
                  <p className="text-4xl font-bold text-gray-900">
                    {formatNumber(stats.stars)}
                  </p>
                )}
                <p className="text-sm text-gray-500">
                  People who starred your profile
                </p>
              </div>
            </div>

            {/* Total Clicks */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 text-center hover:shadow-md transition-shadow duration-200">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
                  <MousePointer
                    className="w-6 h-6 text-gray-600"
                    aria-hidden="true"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Total Clicks
                </h3>
                {statsLoading ? (
                  <div className="h-12 flex items-center justify-center">
                    <LoadingSpinner size="md" />
                  </div>
                ) : (
                  <p className="text-4xl font-bold text-gray-900">
                    {formatNumber(stats.totalClicks)}
                  </p>
                )}
                <p className="text-sm text-gray-500">
                  Clicks on all your links
                </p>
              </div>
            </div>
          </section>

          {/* Quick Actions */}
          <section
            className="flex flex-col sm:flex-row gap-4 justify-center"
            aria-labelledby="actions-heading"
          >
            <h2 id="actions-heading" className="sr-only">
              Quick Actions
            </h2>

            <button
              onClick={() => navigate(ROUTES.EDIT_PROFILE)}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium rounded-lg transition-colors"
              aria-describedby="edit-card-description"
            >
              <Edit3 className="w-4 h-4" />
              Edit My Card
            </button>
            <div id="edit-card-description" className="sr-only">
              Modify your profile information and customize your card
            </div>

            <button
              onClick={() => navigate(ROUTES.DEMO)}
              className="flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-colors"
              aria-describedby="view-card-description"
            >
              <ExternalLink className="w-4 h-4" />
              View My Card
            </button>
            <div id="view-card-description" className="sr-only">
              See how your profile card appears to others
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </BaseLayout>
  );
};

export default Dashboard;
