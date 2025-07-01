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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Modern Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="font-semibold text-gray-900">Dashboard</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate(ROUTES.HOME)}
                className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
                aria-label="Go to homepage"
              >
                <Home className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate(ROUTES.ACCOUNT)}
                className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
                aria-label="Manage account"
              >
                <UserCog className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate(ROUTES.DEMO)}
                className="px-4 py-2 text-sm bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-sm"
                aria-label="View profile card"
              >
                View Card
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {firstName}
              </h1>
              <p className="text-gray-600 mt-1">
                Track your profile performance and engagement
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card Views */}
          <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-slate-200/60 hover:shadow-lg transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                  Views
                </span>
              </div>

              <div className="space-y-1">
                {statsLoading ? (
                  <div className="h-8 w-24 bg-gray-200 animate-pulse rounded" />
                ) : (
                  <div className="text-3xl font-bold text-gray-900">
                    {formatNumber(stats.cardViews)}
                  </div>
                )}
                <p className="text-sm text-gray-600">Profile views</p>
              </div>
            </div>
          </div>

          {/* Stars */}
          <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-slate-200/60 hover:shadow-lg transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 to-transparent" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <span className="text-xs font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">
                  Stars
                </span>
              </div>

              <div className="space-y-1">
                {statsLoading ? (
                  <div className="h-8 w-16 bg-gray-200 animate-pulse rounded" />
                ) : (
                  <div className="text-3xl font-bold text-gray-900">
                    {formatNumber(stats.stars)}
                  </div>
                )}
                <p className="text-sm text-gray-600">Profile stars</p>
              </div>
            </div>
          </div>

          {/* Total Clicks */}
          <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-slate-200/60 hover:shadow-lg transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <MousePointer className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  Clicks
                </span>
              </div>

              <div className="space-y-1">
                {statsLoading ? (
                  <div className="h-8 w-20 bg-gray-200 animate-pulse rounded" />
                ) : (
                  <div className="text-3xl font-bold text-gray-900">
                    {formatNumber(stats.totalClicks)}
                  </div>
                )}
                <p className="text-sm text-gray-600">Link clicks</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Edit Card Action */}
          <button
            onClick={() => navigate(ROUTES.EDIT_PROFILE)}
            className="group relative overflow-hidden rounded-2xl bg-white p-6 border border-slate-200/60 hover:shadow-lg transition-all duration-300 text-left"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Edit3 className="w-6 h-6 text-purple-600" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors duration-300" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  Edit Profile
                </h3>
                <p className="text-sm text-gray-600">
                  Update your information and customize your card
                </p>
              </div>
            </div>
          </button>

          {/* View Card Action */}
          <button
            onClick={() => navigate(ROUTES.DEMO)}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 p-6 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-300 text-left shadow-lg hover:shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <ExternalLink className="w-6 h-6 text-white" />
                </div>
                <ArrowRight className="w-5 h-5 text-white/70 group-hover:text-white transition-colors duration-300" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">View Your Card</h3>
                <p className="text-sm text-blue-100">
                  See how your profile appears to visitors
                </p>
              </div>
            </div>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
