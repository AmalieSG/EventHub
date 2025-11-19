// src/app/pages/Logout.tsx
"use client";
import { useEffect, useState } from "react";
import { logout as logoutAction } from "@/app/api/auth/authServerActions";
import { useAuth } from "@/app/hooks/useAuth";


export function Logout() {
  const { logout } = useAuth(); 
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const result = await logoutAction();

        console.log(result);
        
        if (result.success) {
          setTimeout(() => logout(), 2000);
        } else {
          setError(result.error || "Logout failed");
        }
      } catch (err) {
        console.error("Logout error:", err);
        setError("An error occurred during logout");
      }
    };

    handleLogout();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {error ? (
        <div className="text-red-500">
          <p>{error}</p>
          <p className="text-sm mt-2">Redirecting to login...</p>
        </div>
      ) : (
        <p className="text-lg">Logging out...</p>
      )}
    </div>
  );
}