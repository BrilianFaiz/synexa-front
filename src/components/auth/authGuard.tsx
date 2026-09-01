import { ReactNode } from "react";
import { Redirect } from "expo-router";

import { useAuth } from "@/src/context/authContext";

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({
  children,
}: AuthGuardProps) {
  const {
    isAuthenticated,
    isLoading,
  } = useAuth();

  // AuthProvider masih mengecek token
  if (isLoading) {
    return null;
  }

  // Belum login
  if (!isAuthenticated) {
    return <Redirect href="/pages/login" />;
  }

  // Sudah login
  return <>{children}</>;
}