"use client";

import React from "react";
import Link from "next/link";
import { useSubscription } from "../context/SubscriptionContext";
import { BookOpen, Play, Lock, Unlock, Zap, Clock, Star } from "lucide-react";

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  rating: string;
  isPremium: boolean;
  lessonsCount: number;
}

export const courseModules: CourseModule[] = [
  {
    id: "market-structure-basics",
    title: "1. Basics of Market Structure",
    description: "Learn how to read trends, identify support and resistance, and spot basic breakout patterns.",
    duration: "45 mins",
    rating: "4.8",
    isPremium: false,
    lessonsCount: 3,
  },
  {
    id: "chart-indicators-guide",
    title: "2. Key Indicators & Chart Patterns",
    description: "Master Moving Averages, RSI, MACD, and classic price action patterns like Double Bottoms.",
    duration: "1 hr 15 mins",
    rating: "4.7",
    isPremium: false,
    lessonsCount: 4,
  },
  {
    id: "smart-money-concepts",
    title: "3. Advanced Smart Money Concepts",
    description: "Dive deep into order blocks, fair value gaps, mitigation blocks, and institutional trading setups.",
    duration: "2 hrs 30 mins",
    rating: "4.9",
    isPremium: true,
    lessonsCount: 6,
  },
  {
    id: "order-flow-liquidity",
    title: "4. Order Flow & Liquidity Grabs",
    description: "Understand where major banks place stop-losses and how to ride the momentum of liquidity sweeps.",
    duration: "2 hrs 10 mins",
    rating: "5.0",
    isPremium: true,
    lessonsCount: 5,
  },
  {
    id: "risk-psychology-secrets",
    title: "5. Risk Management & Psychology",
    description: "How to manage drawdown, set appropriate position sizing, and keep emotions out of trading decisions.",
    duration: "1 hr 40 mins",
    rating: "4.9",
    isPremium: true,
    lessonsCount: 4,
  },
];

export default function Courses() {
  const { user, subscribe } = useSubscription();

  return (
    <div className="flex flex-col gap-8 py-4">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Academy Modules</h1>
          <p className="text-xs text-gray-400">
            Structure your path from beginner technical setups to advanced institutional strategies.
          </p>
        </div>

        {!user?.hasSubscription && (
          <button
            onClick={subscribe}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-xs font-bold text-gray-950 shadow-md hover:scale-102 transition-transform cursor-pointer"
          >
            <Zap className="h-4 w-4 fill-current" />
            <span>Unlock Premium Courses</span>
          </button>
        )}
      </div>

      {/* Grid of Courses */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courseModules.map((module) => {
          const isLocked = module.isPremium && (!user || !user.hasSubscription);
          
          return (
            <div
              key={module.id}
              className={`group flex flex-col justify-between rounded-2xl border p-6 transition-all duration-300 glass-card relative overflow-hidden ${
                isLocked 
                  ? "border-white/5 bg-slate-950/20" 
                  : "border-white/5 hover:border-blue-500/20 hover:bg-white/5"
              }`}
            >
              {/* Locked overlay effect for UI aesthetics */}
              {isLocked && (
                <div className="absolute right-4 top-4 rounded-full bg-amber-500/10 border border-amber-500/20 p-2 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.1)]">
                  <Lock className="h-4 w-4" />
                </div>
              )}
              {!isLocked && module.isPremium && (
                <div className="absolute right-4 top-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 p-2 text-emerald-400">
                  <Unlock className="h-4 w-4" />
                </div>
              )}

              <div>
                {/* Meta details */}
                <div className="flex items-center gap-3 text-[10px] text-gray-400 mb-3 font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {module.duration}
                  </span>
                  <span className="flex items-center gap-1 text-amber-400">
                    <Star className="h-3 w-3 fill-current" /> {module.rating}
                  </span>
                  <span>{module.lessonsCount} lessons</span>
                </div>

                <h3 className="text-base font-bold text-white mb-2 leading-tight group-hover:text-blue-400 transition-colors">
                  {module.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-6">
                  {module.description}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                <span className="text-[10px] font-bold tracking-wider uppercase">
                  {module.isPremium ? (
                    <span className="text-amber-400 flex items-center gap-1">
                      <Zap className="h-3 w-3 fill-current" /> Premium
                    </span>
                  ) : (
                    <span className="text-blue-400">Free Module</span>
                  )}
                </span>
                
                {isLocked ? (
                  <button
                    onClick={subscribe}
                    className="flex items-center gap-1 rounded-lg border border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-400 cursor-pointer"
                  >
                    <span>Unlock</span>
                  </button>
                ) : (
                  <Link
                    href={`/courses/${module.id}`}
                    className="flex items-center gap-1 rounded-lg bg-blue-500 hover:bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition-transform hover:scale-105"
                  >
                    <span>Start Module</span>
                    <Play className="h-3 w-3 fill-current ml-0.5" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
