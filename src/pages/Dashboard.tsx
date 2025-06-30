import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { Link, useNavigate } from "react-router-dom";
import { Eye, MousePointer, UserCog, CreditCard, Home } from "lucide-react";

interface DashboardStats {
  cardViews: number;
  totalClicks: number;
}

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    cardViews: 0,
    totalClicks: 0,
  });

  // Redirect to auth if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  // Simulate fetching stats
  useEffect(() => {
    // Simulate API call to fetch user stats
    const fetchStats = async () => {
      // Mock data - in real app, this would come from your backend
      await new Promise((resolve) => setTimeout(resolve, 500));
      setStats({
        cardViews: 247,
        totalClicks: 89,
      });
    };

    if (isAuthenticated) {
      fetchStats();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return null; // Redirect will handle navigation
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Logo - Top Left */}
      <div className="absolute top-4 left-4 z-50">
        <Logo />
      </div>

      {/* Navigation - Top Right */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-3">
        <Button
          onClick={() => navigate("/")}
          variant="ghost"
          size="sm"
          className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
        >
          <Home className="w-4 h-4 mr-2" />
          Home
        </Button>
        <Button
          onClick={() => navigate("/account")}
          variant="outline"
          size="sm"
          className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 font-medium"
        >
          <UserCog className="w-4 h-4 mr-2" />
          My Account
        </Button>
        <Button
          onClick={() => navigate("/demo")}
          className="bg-gray-900 hover:bg-gray-800 text-white font-medium"
          size="sm"
        >
          <CreditCard className="w-4 h-4 mr-2" />
          My Card
        </Button>
      </div>

      {/* Main Content - Centered */}
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-2xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome back, {user?.name?.split(" ")[0] || "User"}!
            </h1>
            <p className="text-gray-600 text-lg">
              Here's how your profile is performing
            </p>
          </div>

          {/* Stats Section - Centered and Prominent */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Card Views */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center transition-all duration-200 hover:shadow-md">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Card Views
                </h3>
                <p className="text-4xl font-bold text-gray-900">
                  {stats.cardViews.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  People who viewed your profile
                </p>
              </div>
            </div>

            {/* Total Clicks */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center transition-all duration-200 hover:shadow-md">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                  <MousePointer className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Total Clicks
                </h3>
                <p className="text-4xl font-bold text-gray-900">
                  {stats.totalClicks.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  Clicks on all your links
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Button
              onClick={() => navigate("/mycard")}
              variant="outline"
              size="lg"
              className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 font-medium px-8 py-3"
            >
              Edit My Card
            </Button>
            <Button
              onClick={() => navigate("/demo")}
              size="lg"
              className="bg-gray-900 hover:bg-gray-800 text-white font-medium px-8 py-3"
            >
              View My Card
            </Button>
          </div>
        </div>

        {/* Application Branding - Bottom Center */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              myone<span className="text-gray-600">Social</span>
            </h2>
            <p className="text-gray-500 text-sm">Connect & Share</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
