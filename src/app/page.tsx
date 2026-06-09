"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSubscription } from "./context/SubscriptionContext";
import {
  TrendingUp,
  BookOpen,
  Zap,
  CheckCircle,
  Play,
  ArrowRight,
  ShieldAlert,
  BarChart2,
} from "lucide-react";

export default function Home() {
  const { user, subscribe } = useSubscription();

  return (
    <div className="flex flex-col gap-16 py-8">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-between gap-12 lg:flex-row">
        {/* Left column: Text */}
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-400">
            <Zap className="h-3.5 w-3.5 fill-current" />
            <span>Next-Generation Trading Academy</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
            master the markets with{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
              emergingtrader<span className="text-[0.7em] text-amber-500 ml-0.5">80</span>
            </span>
          </h1>

          <p className="max-w-xl text-base text-gray-300 md:text-lg">
            Empower your trading using professional analytics, interactive charts, and premium video courses. Access private YouTube strategies and live analysis.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            {user ? (
              user.hasSubscription ? (
                <Link
                  href="/dashboard"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl neon-btn-blue text-sm font-bold text-white flex items-center justify-center gap-2"
                >
                  <span>Go to Trading Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <button
                  onClick={subscribe}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg shadow-orange-500/20 text-sm font-bold text-gray-950 flex items-center justify-center gap-2 hover:scale-102 transition-transform cursor-pointer"
                >
                  <Zap className="h-4 w-4 fill-current" />
                  <span>Unlock Premium Access</span>
                </button>
              )
            ) : (
              <>
                <Link
                  href="/register"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl neon-btn-blue text-sm font-bold text-white flex items-center justify-center gap-2"
                >
                  <span>Join Academy For Free</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/login"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-white/10 hover:bg-white/5 text-sm font-bold text-white flex items-center justify-center"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Right column: Glass Terminal with Dashboard Image */}
        <div className="flex-1 w-full max-w-xl lg:max-w-none relative group">
          {/* Card Ambient Glow */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 opacity-20 blur-lg transition duration-1000 group-hover:opacity-30"></div>

          <div className="relative overflow-hidden glass-card border border-white/10">
            {/* Window controls header */}
            <div className="flex items-center justify-between border-b border-white/5 bg-slate-950/40 px-4 py-3">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-rose-500/80"></span>
                <span className="h-3 w-3 rounded-full bg-amber-500/80"></span>
                <span className="h-3 w-3 rounded-full bg-emerald-500/80"></span>
              </div>
              <div className="text-[10px] text-gray-500">emergingtrader80_terminal.exe</div>
              <div className="w-12"></div>
            </div>

            {/* Main Terminal Visual */}
            <div className="relative aspect-video w-full">
              <Image
                src="/trading_hero.png"
                alt="Cyberpunk Trading Dashboard"
                fill
                className="object-cover opacity-80"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-transparent"></div>

              {/* Overlay Glass Badge */}
              <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/10 bg-slate-950/80 p-3.5 backdrop-blur-md flex items-center justify-between">
                <div>
                  <span className="block text-xs font-bold text-white">Advanced Module #4</span>
                  <span className="text-[10px] text-gray-400">Order Flow & Liquidity Grabs</span>
                </div>
                <Link
                  href="/courses"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500 hover:bg-blue-600 text-white shadow-lg transition-transform hover:scale-105"
                >
                  <Play className="h-4.5 w-4.5 fill-current ml-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Tiles (Apple Glass Style) */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
            Why Choose emergingtrader<span className="text-[0.8em] text-amber-500 ml-0.5">80</span>?
          </h2>
          <p className="mx-auto max-w-lg text-sm text-gray-400">
            Experience institutional-grade analytics packaged in a beautiful, responsive, glassmorphic layout.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <div className="group relative rounded-2xl p-6 glass-card hover:bg-white/5 transition-all duration-300 border border-white/5 hover:border-white/15">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <TrendingUp className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Interactive TradingView Charts</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Analyze price action with full-fledged TradingView widgets, indicators, and real-time live tickers directly inside your dashboard.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group relative rounded-2xl p-6 glass-card hover:bg-white/5 transition-all duration-300 border border-white/5 hover:border-white/15">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <BookOpen className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Unlisted Video Courses</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Unlock private, unlisted YouTube strategies hosted by top-tier traders. High quality structured lessons covering SMC, indicators, and risk management.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group relative rounded-2xl p-6 glass-card hover:bg-white/5 transition-all duration-300 border border-white/5 hover:border-white/15 sm:col-span-2 lg:col-span-1">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Premium Trade Signals</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Receive live setups with entry targets, stop loss boundaries, and take profit margins. Instant alerts to ensure you never miss a market move.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="space-y-8 rounded-3xl border border-white/5 bg-slate-950/20 p-8 md:p-12 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -left-40 top-40 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl"></div>

        <div className="text-center space-y-2 relative z-10">
          <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
            Choose Your Level
          </h2>
          <p className="mx-auto max-w-lg text-sm text-gray-400">
            Start learning today or unlock full institutional access to maximize your results.
          </p>
        </div>

        <div className="grid gap-8 max-w-3xl mx-auto sm:grid-cols-2 mt-8 relative z-10">
          {/* Free Tier */}
          <div className="flex flex-col justify-between rounded-2xl border border-white/5 bg-[#090d16]/30 p-6">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-1">Standard</h4>
              <div className="flex items-baseline gap-1 text-white mb-4">
                <span className="text-3xl font-extrabold">$0</span>
                <span className="text-sm text-gray-500">Free Forever</span>
              </div>
              <p className="text-xs text-gray-400 mb-6">
                Perfect for beginners starting their technical analysis journey.
              </p>
              <ul className="text-xs text-gray-300 space-y-2.5 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-gray-500" />
                  <span>Access basic education modules</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-gray-500" />
                  <span>Interactive charts (limited options)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-gray-500" />
                  <span>Community Discord Access</span>
                </li>
              </ul>
            </div>
            <Link
              href={user ? "/dashboard" : "/register"}
              className="w-full py-2.5 rounded-lg border border-white/10 hover:bg-white/5 text-center text-xs font-bold text-white transition-all"
            >
              {user ? "View Dashboard" : "Create Account"}
            </Link>
          </div>

          {/* Premium Tier */}
          <div className="flex flex-col justify-between rounded-2xl border border-blue-500/30 bg-blue-950/10 p-6 shadow-[0_0_20px_rgba(59,130,246,0.15)] relative">
            {/* Recommended banner */}
            <div className="absolute -top-3.5 right-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-3.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
              Popular
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-blue-400 mb-1">Premium</h4>
              <div className="flex items-baseline gap-1 text-white mb-4">
                <span className="text-3xl font-extrabold">$29</span>
                <span className="text-sm text-gray-400">/ month</span>
              </div>
              <p className="text-xs text-gray-300 mb-6">
                For active traders aiming to utilize high-level tools and unlisted strategies.
              </p>
              <ul className="text-xs text-gray-200 space-y-2.5 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-400" />
                  <span className="font-semibold text-white">Unlock Unlisted YouTube Strategies</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-400" />
                  <span>Premium signals and live chart setups</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-400" />
                  <span>Full TradingView layout & indicators</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-400" />
                  <span>Priority 1-on-1 mentorship Q&A</span>
                </li>
              </ul>
            </div>

            {user ? (
              user.hasSubscription ? (
                <Link
                  href="/dashboard"
                  className="w-full py-2.5 rounded-lg neon-btn-blue text-center text-xs font-bold text-white"
                >
                  Premium Dashboard
                </Link>
              ) : (
                <button
                  onClick={subscribe}
                  className="w-full py-2.5 rounded-lg neon-btn-blue text-xs font-bold text-white cursor-pointer"
                >
                  Subscribe & Unlock
                </button>
              )
            ) : (
              <Link
                href="/register?plan=premium"
                className="w-full py-2.5 rounded-lg neon-btn-blue text-center text-xs font-bold text-white"
              >
                Sign Up & Subscribe
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
