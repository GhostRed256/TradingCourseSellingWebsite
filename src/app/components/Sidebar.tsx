"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSubscription } from "../context/SubscriptionContext";
import {
  Home,
  TrendingUp,
  BookOpen,
  Lock,
  Unlock,
  LogIn,
  LogOut,
  User,
  Zap,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useSubscription();

  const menuItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Dashboard", href: "/dashboard", icon: TrendingUp },
    { name: "Courses", href: "/courses", icon: BookOpen },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Desktop Sidebar (TradingView & Apple Glass UI style) */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-20 flex-col items-center justify-between py-6 glass-panel md:flex">
        {/* Logo/Brand */}
        <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20">
          <TrendingUp className="h-6 w-6 text-white" />
          <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 opacity-30 blur-sm"></div>
        </div>

        {/* Navigation Icons */}
        <nav className="flex flex-col gap-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className="group relative flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 hover:bg-white/5"
              >
                <Icon
                  className={`h-5.5 w-5.5 transition-all duration-300 ${
                    active
                      ? "text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                      : "text-gray-400 group-hover:text-white"
                  }`}
                />
                
                {/* Active Indicator Dot */}
                {active && (
                  <span className="absolute right-2 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
                )}

                {/* Tooltip */}
                <div className="absolute left-16 z-50 scale-0 rounded-lg bg-gray-950 px-3 py-1.5 text-xs text-white opacity-0 shadow-xl border border-white/10 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 whitespace-nowrap">
                  {item.name}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions (User / Subscription / Logout) */}
        <div className="flex flex-col items-center gap-6">
          {user ? (
            <>
              {/* Subscription Status Badge */}
              <div className="group relative flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 hover:bg-white/5">
                {user.hasSubscription ? (
                  <Zap className="h-5.5 w-5.5 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                ) : (
                  <Lock className="h-5.5 w-5.5 text-gray-500" />
                )}
                
                <div className="absolute left-16 z-50 scale-0 rounded-lg bg-gray-950 px-3 py-1.5 text-xs text-white opacity-0 shadow-xl border border-white/10 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 whitespace-nowrap">
                  {user.hasSubscription ? "Premium Subscribed" : "Free Account"}
                </div>
              </div>

              {/* User profile / Logout */}
              <button
                onClick={logout}
                className="group relative flex h-12 w-12 items-center justify-center rounded-xl text-gray-400 hover:bg-rose-500/10 hover:text-rose-400 transition-all duration-300"
              >
                <LogOut className="h-5.5 w-5.5" />
                <div className="absolute left-16 z-50 scale-0 rounded-lg bg-gray-950 px-3 py-1.5 text-xs text-white opacity-0 shadow-xl border border-white/10 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 whitespace-nowrap">
                  Log Out
                </div>
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="group relative flex h-12 w-12 items-center justify-center rounded-xl text-gray-400 hover:bg-blue-500/10 hover:text-blue-400 transition-all duration-300"
            >
              <LogIn className="h-5.5 w-5.5" />
              <div className="absolute left-16 z-50 scale-0 rounded-lg bg-gray-950 px-3 py-1.5 text-xs text-white opacity-0 shadow-xl border border-white/10 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 whitespace-nowrap">
                Log In
              </div>
            </Link>
          )}
        </div>
      </aside>

      {/* Mobile Bottom Navigation (Glassmorphic Bar) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around border-t border-white/5 bg-slate-950/80 px-4 backdrop-blur-lg md:hidden">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center gap-1 text-xs transition-colors duration-200 ${
                active ? "text-blue-400" : "text-gray-400"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
        {user ? (
          <button
            onClick={logout}
            className="flex flex-col items-center gap-1 text-xs text-gray-400"
          >
            <LogOut className="h-5 w-5 text-rose-400" />
            <span>Log Out</span>
          </button>
        ) : (
          <Link
            href="/login"
            className="flex flex-col items-center gap-1 text-xs text-gray-400"
          >
            <LogIn className="h-5 w-5 text-blue-400" />
            <span>Log In</span>
          </Link>
        )}
      </div>
    </>
  );
}
