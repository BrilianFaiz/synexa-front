import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { getToken, removeToken } from "../storage/authStorage";
import { getUser, logout as logoutService } from "../services/authService";

interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

interface PatientProfile {
  id: number;
  user_id: number;
  date_of_birth: string | null;
  gender: string | null;
  phone: string | null;
  address: string | null;
  stroke_history: boolean;
  stroke_date: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  patientProfile: PatientProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [patientProfile, setPatientProfile] =
    useState<PatientProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const token = await getToken();

      if (!token) {
        setUser(null);
        setPatientProfile(null);
        return;
      }

      const response = await getUser();

      setUser(response.user);
      setPatientProfile(response.patient_profile);
    } catch (error: any) {
      console.error("AUTH CHECK ERROR:", error);

      if (error.status === 401) {
        await removeToken();
        setUser(null);
        setPatientProfile(null);
      }
    }
  };

  const logout = async () => {
  try {
    await logoutService();
  } catch (error) {
    console.error("LOGOUT ERROR:", error);
  } finally {
    await removeToken();
    setUser(null);
    setPatientProfile(null);
  }
};

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await refreshUser();
        const token = await getToken();
        console.log("TOKEN STORAGE:", token);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        patientProfile,
        isLoading,
        isAuthenticated: !!user,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}