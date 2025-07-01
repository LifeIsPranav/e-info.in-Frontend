import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import AuthButton from "@/components/AuthButton";
import Footer from "@/components/Footer";
import BaseLayout from "@/components/layout/BaseLayout";
import { APP_CONFIG, ROUTES } from "@/constants";
import { useAuth } from "@/contexts/AuthContext";

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate(ROUTES.DASHBOARD);
    } else {
      navigate(ROUTES.AUTH);
    }
  };

  return (
    <BaseLayout background="white" noPadding>
      {/* Navigation Bar */}
      <nav
        className="w-full px-6 py-4 flex justify-between items-center"
        role="navigation"
        aria-label="Main navigation"
      >
        <Logo />
        <AuthButton />
      </nav>

      {/* Main Content - Centered */}
      <main className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Headline */}
          <header className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {APP_CONFIG.description}
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-600 leading-relaxed max-w-xl mx-auto">
              {APP_CONFIG.subtitle}
            </p>
          </header>

          {/* Call to Action */}
          <section className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              size="lg"
              className="w-full sm:w-auto"
              onClick={handleGetStarted}
              aria-describedby="get-started-description"
            >
              {isAuthenticated ? "Go to Dashboard" : "Get Started"}
            </Button>
            <div id="get-started-description" className="sr-only">
              {isAuthenticated
                ? "Navigate to your dashboard to manage your profile"
                : "Sign up to create your professional profile"}
            </div>

            <Link to={ROUTES.DEMO} className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                aria-describedby="demo-description"
              >
                View Demo
              </Button>
            </Link>
            <div id="demo-description" className="sr-only">
              See an example of what your profile could look like
            </div>
          </section>

          {/* Features Preview */}
          <section
            className="pt-12 space-y-8"
            aria-labelledby="features-heading"
          >
            <h2 id="features-heading" className="sr-only">
              Key Features
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">
                  Professional Profile
                </h3>
                <p className="text-sm text-gray-600">
                  Create a stunning digital business card
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">One Link</h3>
                <p className="text-sm text-gray-600">
                  Share everything through a single URL
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mx-auto">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Analytics</h3>
                <p className="text-sm text-gray-600">
                  Track views and engagement
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </BaseLayout>
  );
};

export default Index;
