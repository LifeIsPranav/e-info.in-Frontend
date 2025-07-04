import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  username?: string;
  instantMessage?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  signIn: (user: User) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
  clearError: () => void;
  setRedirectPath: (path: string) => void;
  getRedirectPath: () => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "auth_user";
const AUTH_EXPIRY_KEY = "auth_expiry";

// Auth session expires after 7 days
const AUTH_EXPIRY_DURATION = 7 * 24 * 60 * 60 * 1000;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [redirectPath, setRedirectPathState] = useState<string>("/dashboard");

  // Load user from localStorage on mount
  useEffect(() => {
    const loadStoredUser = () => {
      try {
        const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
        const storedExpiry = localStorage.getItem(AUTH_EXPIRY_KEY);

        if (storedUser && storedExpiry) {
          const expiryTime = parseInt(storedExpiry, 10);
          const currentTime = Date.now();

          if (currentTime < expiryTime) {
            const userData = JSON.parse(storedUser);
            setUser(userData);
          } else {
            // Session expired, clear storage
            localStorage.removeItem(AUTH_STORAGE_KEY);
            localStorage.removeItem(AUTH_EXPIRY_KEY);
          }
        }
      } catch (error) {
        console.error("Failed to load user from storage:", error);
        localStorage.removeItem(AUTH_STORAGE_KEY);
        localStorage.removeItem(AUTH_EXPIRY_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredUser();
  }, []);

  // Persist user to localStorage when user changes
  useEffect(() => {
    if (user) {
      try {
        const expiryTime = Date.now() + AUTH_EXPIRY_DURATION;
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
        localStorage.setItem(AUTH_EXPIRY_KEY, expiryTime.toString());
      } catch (error) {
        console.error("Failed to save user to storage:", error);
      }
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem(AUTH_EXPIRY_KEY);
    }
  }, [user]);

  const signIn = useCallback(async (userData: User) => {
    try {
      setIsLoading(true);
      setError(null);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Validate user data
      if (!userData.id || !userData.name || !userData.email) {
        throw new Error("Invalid user data");
      }

      setUser(userData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Sign in failed";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      setUser(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Sign out failed";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser((currentUser) => {
      if (!currentUser) return null;
      return { ...currentUser, ...updates };
    });
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const setRedirectPath = useCallback((path: string) => {
    setRedirectPathState(path);
  }, []);

  const getRedirectPath = useCallback(() => {
    return redirectPath;
  }, [redirectPath]);

  // Auto-refresh session before expiry
  useEffect(() => {
    if (!user) return;

    const checkAndRefreshSession = () => {
      const storedExpiry = localStorage.getItem(AUTH_EXPIRY_KEY);
      if (storedExpiry) {
        const expiryTime = parseInt(storedExpiry, 10);
        const currentTime = Date.now();
        const timeUntilExpiry = expiryTime - currentTime;

        // If session expires in less than 1 hour, refresh it
        if (timeUntilExpiry < 60 * 60 * 1000 && timeUntilExpiry > 0) {
          const newExpiryTime = Date.now() + AUTH_EXPIRY_DURATION;
          localStorage.setItem(AUTH_EXPIRY_KEY, newExpiryTime.toString());
        }
      }
    };

    // Check session every 10 minutes
    const interval = setInterval(checkAndRefreshSession, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, [user]);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    signIn,
    signOut,
    updateUser,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
