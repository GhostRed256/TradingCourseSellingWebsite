"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSubscription } from "../context/SubscriptionContext";
import TradingViewWidget from "../components/TradingViewWidget";
import {
  TrendingUp,
  Lock,
  Unlock,
  AlertTriangle,
  ChevronRight,
  TrendingDown,
  Activity,
  Award,
  BookOpen,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const router = useRouter();
  const { user, loading, subscribe } = useSubscription();

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Mock Trading Account stats
  const stats = {
    balance: "$24,592.15",
    dailyPnl: "+$340.50",
    winRate: "68.2%",
    activeTrades: 2,
  };

  // Mock signals
  const signals = [
    {
      pair: "BTCUSDT",
      type: "LONG",
      entry: "72,100",
      target: "74,500",
      stop: "71,200",
      status: "Active",
      isPremium: false,
    },
    {
      pair: "ETHUSDT",
      type: "SHORT",
      entry: "3,845",
      target: "3,650",
      stop: "3,920",
      status: "Active",
      isPremium: true,
    },
    {
      pair: "SOLUSDT",
      type: "LONG",
      entry: "168.40",
      target: "185.00",
      stop: "162.00",
      status: "Pending",
      isPremium: true,
    },
  ];

  if (loading || !user) {
    return (
      <div className="flex h-[70vh] items-center justify-center text-sm font-mono text-gray-400">
        Authenticating session...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome & Stats Row */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Console Dashboard</h1>
          <p className="text-xs text-gray-400">
            Welcome back, <span className="font-semibold text-blue-400">{user.username}</span>. Monitor active charts and trade setups.
          </p>
        </div>
        
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-4 sm:flex sm:items-center">
          <div className="rounded-xl border border-white/5 bg-[#090d16]/30 px-4 py-2.5 backdrop-blur-md">
            <span className="block text-[10px] text-gray-500 uppercase tracking-wider">Equity</span>
            <span className="font-mono text-sm font-bold text-white">{stats.balance}</span>
          </div>
          <div className="rounded-xl border border-white/5 bg-[#090d16]/30 px-4 py-2.5 backdrop-blur-md">
            <span className="block text-[10px] text-gray-500 uppercase tracking-wider">Today P&L</span>
            <span className="font-mono text-sm font-bold text-emerald-400">{stats.dailyPnl}</span>
          </div>
          <div className="rounded-xl border border-white/5 bg-[#090d16]/30 px-4 py-2.5 backdrop-blur-md">
            <span className="block text-[10px] text-gray-500 uppercase tracking-wider">Win Rate</span>
            <span className="font-mono text-sm font-bold text-blue-400">{stats.winRate}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Chart + Signals Panel */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Chart (Left 2 columns) */}
        <div className="lg:col-span-2 h-[550px]">
          <TradingViewWidget />
        </div>

        {/* Signals Panel (Right 1 column) */}
        <div className="flex flex-col gap-6">
          {/* Active Setups */}
          <div className="flex-1 rounded-2xl border border-white/5 bg-[#090d16]/30 p-5 backdrop-blur-md flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-1.5">
                <Activity className="h-4.5 w-4.5 text-blue-400" />
                Live Market Setups
              </h3>
              
              <div className="space-y-4">
                {signals.map((sig, idx) => {
                  const isLocked = sig.isPremium && !user.hasSubscription;
                  
                  return (
                    <div
                      key={idx}
                      className={`relative rounded-xl border p-4 transition-all duration-300 ${
                        isLocked
                          ? "border-white/5 bg-slate-950/20 opacity-90 blur-[1px]"
                          : sig.type === "LONG"
                          ? "border-emerald-500/10 bg-emerald-500/3 hover:bg-emerald-500/5"
                          : "border-rose-500/10 bg-rose-500/3 hover:bg-rose-500/5"
                      }`}
                    >
                      {/* Gated Signal Blur overlay */}
                      {isLocked && (
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-xl bg-[#090d16]/60 backdrop-blur-md p-3 text-center">
                          <Lock className="h-5 w-5 text-amber-500 mb-1" />
                          <span className="text-[10px] font-bold text-white uppercase tracking-wider">Premium Signal</span>
                          <button
                            onClick={subscribe}
                            className="mt-1.5 rounded-md bg-amber-500 px-3 py-1 text-[9px] font-bold text-gray-950 hover:bg-amber-400 transition-colors cursor-pointer"
                          >
                            Unlock Now
                          </button>
                        </div>
                      )}

                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-sm text-white">{sig.pair}</span>
                        <span
                          className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${
                            sig.type === "LONG"
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-rose-500/20 text-rose-400"
                          }`}
                        >
                          {sig.type}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-gray-400">
                        <div>
                          <span>Entry:</span>
                          <span className="block font-semibold text-white">{sig.entry}</span>
                        </div>
                        <div>
                          <span>Target:</span>
                          <span className="block font-semibold text-emerald-400">{sig.target}</span>
                        </div>
                        <div>
                          <span>Stop:</span>
                          <span className="block font-semibold text-rose-400">{sig.stop}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {!user.hasSubscription && (
              <div className="mt-6 border-t border-white/5 pt-4 text-center">
                <p className="text-[10px] text-gray-400 mb-2">
                  Upgrade to unlock premium institutional setups.
                </p>
                <button
                  onClick={subscribe}
                  className="w-full py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-xs font-bold text-gray-950 flex items-center justify-center gap-1 hover:scale-101 transition-transform cursor-pointer"
                >
                  <Zap className="h-3.5 w-3.5 fill-current" />
                  Unlock 2 Premium Signals
                </button>
              </div>
            )}
          </div>

          {/* Featured Course card */}
          <div className="rounded-2xl border border-white/5 bg-[#090d16]/30 p-5 backdrop-blur-md relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl"></div>
            
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5">
              <BookOpen className="h-4.5 w-4.5 text-blue-400" />
              Latest Academy Module
            </h3>
            <p className="text-xs text-gray-400 mb-4 leading-relaxed">
              Learn how to trade using institutional orderblocks and liquidity grab concepts.
            </p>
            <Link
              href="/courses"
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span>View Course Modules</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
