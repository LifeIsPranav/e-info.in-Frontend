import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Eye, MousePointer, UserCog, CreditCard, Home } from "lucide-react";
import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/Footer";
import BaseLayout from "@/components/layout/BaseLayout";
import Card, { CardContent } from "@/components/common/Card";
import ActionButton from "@/components/common/ActionButton";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { formatNumber } from "@/utils";
import { ROUTES } from "@/constants";
import type { DashboardStats } from "@/types";

const Dashboard: React.FC = () => {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    cardViews: 0,
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
        setStats({
          cardViews: 1247,
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
            <ActionButton
              onClick={() => navigate(ROUTES.HOME)}
              variant="outline"
              size="sm"
              icon={<Home className="w-4 h-4" />}
              className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 font-medium"
              aria-label="Go to homepage"
            >
              <span className="hidden sm:inline">Home</span>
            </ActionButton>

            <ActionButton
              onClick={() => navigate(ROUTES.ACCOUNT)}
              variant="outline"
              size="sm"
              icon={<UserCog className="w-4 h-4" />}
              className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 font-medium"
              aria-label="Manage account settings"
            >
              <span className="hidden sm:inline">Account</span>
            </ActionButton>

            <ActionButton
              onClick={() => navigate(ROUTES.DEMO)}
              size="sm"
              icon={<CreditCard className="w-4 h-4" />}
              className="bg-gray-900 hover:bg-gray-800 text-white font-medium"
              aria-label="View your profile card"
            >
              <span className="hidden sm:inline">My Card</span>
            </ActionButton>
          </div>
        }
      />

      {/* Main Content */}
      <main className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-6 py-8">
        <div className="w-full max-w-4xl mx-auto">
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
            className="grid md:grid-cols-2 gap-8 mb-16"
            aria-labelledby="stats-heading"
          >
            <h2 id="stats-heading" className="sr-only">
              Profile Statistics
            </h2>

            {/* Card Views */}
            <Card
              padding="lg"
              shadow="sm"
              hover
              className="text-center transition-all duration-200"
              rounded="2xl"
            >
              <CardContent padding="none">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                    <Eye className="w-6 h-6 text-blue-600" aria-hidden="true" />
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
              </CardContent>
            </Card>

            {/* Total Clicks */}
            <Card
              padding="lg"
              shadow="sm"
              hover
              className="text-center transition-all duration-200"
              rounded="2xl"
            >
              <CardContent padding="none">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                    <MousePointer
                      className="w-6 h-6 text-green-600"
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
              </CardContent>
            </Card>
          </section>

          {/* Quick Actions */}
          <section
            className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
            aria-labelledby="actions-heading"
          >
            <h2 id="actions-heading" className="sr-only">
              Quick Actions
            </h2>

            <ActionButton
              onClick={() => navigate(ROUTES.EDIT_PROFILE)}
              variant="outline"
              size="lg"
              fullWidth={false}
              className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 font-medium px-8 py-3"
              aria-describedby="edit-card-description"
            >
              Edit My Card
            </ActionButton>
            <div id="edit-card-description" className="sr-only">
              Modify your profile information and customize your card
            </div>

            <ActionButton
              onClick={() => navigate(ROUTES.DEMO)}
              size="lg"
              fullWidth={false}
              className="bg-gray-900 hover:bg-gray-800 text-white font-medium px-8 py-3"
              aria-describedby="view-card-description"
            >
              View My Card
            </ActionButton>
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
