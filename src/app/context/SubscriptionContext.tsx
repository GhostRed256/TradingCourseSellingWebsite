"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  username: string;
  email: string;
  hasSubscription: boolean;
}

interface SubscriptionContextType {
  user: User | null;
  login: (username: string, email: string) => void;
  logout: () => void;
  subscribe: () => Promise<void>;
  cancelSubscription: () => void;
  loading: boolean;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage on mount
    const storedUser = localStorage.getItem("emergingtrader80_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user", e);
      }
    }
    setLoading(false);
  }, []);

  const login = (username: string, email: string) => {
    const newUser: User = {
      username,
      email,
      hasSubscription: false, // Default to unsubscribed
    };
    setUser(newUser);
    localStorage.setItem("emergingtrader80_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("emergingtrader80_user");
  };

  const subscribe = async () => {
    setLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    if (user) {
      const updatedUser = { ...user, hasSubscription: true };
      setUser(updatedUser);
      localStorage.setItem("emergingtrader80_user", JSON.stringify(updatedUser));
    }
    setLoading(false);
  };

  const cancelSubscription = () => {
    if (user) {
      const updatedUser = { ...user, hasSubscription: false };
      setUser(updatedUser);
      localStorage.setItem("emergingtrader80_user", JSON.stringify(updatedUser));
    }
  };

  return (
    <SubscriptionContext.Provider
      value={{
        user,
        login,
        logout,
        subscribe,
        cancelSubscription,
        loading,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error("useSubscription must be used within a SubscriptionProvider");
  }
  return context;
}
