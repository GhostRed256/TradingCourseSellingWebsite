"use client";

import React, { useState, useEffect } from "react";
import { useSubscription } from "../context/SubscriptionContext";
import { Zap, Bell, Shield, ArrowUpRight, ArrowDownRight, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const { user, subscribe, cancelSubscription, loading } = useSubscription();
  const [showPayModal, setShowPayModal] = useState(false);

  // Mock Market Tickers
  const [tickers, setTickers] = useState([
    { symbol: "XAU/USD", price: "2,342.10", change: "-0.50%", isUp: false },
    { symbol: "XAG/USD", price: "28.45", change: "+1.20%", isUp: true },
    { symbol: "ETHUSD", price: "3,820.20", change: "-0.85%", isUp: false },
    { symbol: "AAPL", price: "189.43", change: "+1.12%", isUp: true },
    { symbol: "SPY", price: "528.30", change: "+0.42%", isUp: true },
  ]);

  // Simulate updating market prices slightly
  useEffect(() => {
    const interval = setInterval(() => {
      setTickers((prevTickers) =>
        prevTickers.map((ticker) => {
          const currentPrice = parseFloat(ticker.price.replace(/,/g, ""));
          const changePercent = (Math.random() * 0.2 - 0.1); // -0.1% to +0.1%
          const nextPrice = currentPrice * (1 + changePercent / 100);

          return {
            ...ticker,
            price: nextPrice.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }),
            change: (changePercent >= 0 ? "+" : "") + changePercent.toFixed(2) + "%",
            isUp: changePercent >= 0,
          };
        })
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = async () => {
    setShowPayModal(true);
  };

  const confirmSubscription = async () => {
    await subscribe();
    setShowPayModal(false);
  };

  return (
    <>
      <header className="sticky top-0 z-30 w-full border-b border-white/5 bg-[#090d16]/50 backdrop-blur-md">
        <div className="flex h-16 w-full items-center justify-between px-6">
          {/* Left Side: Market Tickers (TradingView visual) - Desktop */}
          <div className="hidden items-center gap-6 overflow-x-auto py-1 md:flex">
            {tickers.map((ticker) => (
              <div key={ticker.symbol} className="flex items-center gap-2 text-xs">
                <span className="font-semibold text-gray-300">{ticker.symbol}</span>
                <span className="font-mono text-white">{ticker.price}</span>
                <span
                  className={`flex items-center font-mono font-medium ${ticker.isUp ? "text-emerald-400" : "text-rose-400"
                    }`}
                >
                  {ticker.isUp ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {ticker.change}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center md:hidden">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.jpeg" alt="Xaubugg Logo" width={32} height={32} className="rounded-full shadow-md" />
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-cyan-300 via-cyan-400 to-teal-400 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
                Xaubugg.com
              </span>
            </Link>
          </div>

          {/* Right Side: Alerts & Subscription Actions */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                {/* Notification icon */}
                <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/5 bg-white/3 text-gray-300 hover:bg-white/8 transition-colors duration-200">
                  <Bell className="h-4.5 w-4.5" />
                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
                </button>

                {/* Subscription Status Action */}
                {user.hasSubscription ? (
                  <div className="flex items-center gap-2">
                    <div className="hidden items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.1)] md:flex">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Premium Member</span>
                    </div>
                    <button
                      onClick={cancelSubscription}
                      className="text-xs text-gray-500 hover:text-rose-400 transition-colors"
                    >
                      Cancel Sub
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleSubscribe}
                    className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-1.5 text-xs font-semibold text-gray-950 shadow-[0_4px_15px_rgba(245,158,11,0.3)] transition-all hover:scale-105 hover:shadow-[0_4px_25px_rgba(245,158,11,0.5)] cursor-pointer"
                  >
                    <Zap className="h-3.5 w-3.5 fill-current" />
                    <span>Go Premium</span>
                  </button>
                )}

                {/* User Identity info */}
                <div className="flex items-center gap-2.5 pl-2 border-l border-white/10">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 border border-white/10 text-sm font-semibold text-blue-400">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden flex-col text-left md:flex">
                    <span className="text-xs font-semibold text-white">{user.username}</span>
                    <div className="text-[10px] font-mono text-gray-500">
                      xaubugg_terminal.exe
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-xs font-semibold text-white transition-all hover:bg-white/10"
              >
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>

        {/* Market Tickers - Mobile (Shows below the main header row) */}
        <div className="flex items-center gap-6 overflow-x-auto py-2 px-6 border-t border-white/5 md:hidden no-scrollbar">
          {tickers.map((ticker) => (
            <div key={`${ticker.symbol}-mobile`} className="flex items-center gap-2 text-xs shrink-0">
              <span className="font-semibold text-gray-300">{ticker.symbol}</span>
              <span className="font-mono text-white">{ticker.price}</span>
              <span
                className={`flex items-center font-mono font-medium ${
                  ticker.isUp ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {ticker.isUp ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                {ticker.change}
              </span>
            </div>
          ))}
        </div>
      </header>

      {/* Pay Modal (Glassmorphism Subscription portal mockup) */}
      {showPayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md overflow-hidden glass-card p-6 border border-white/10 relative">
            {/* Ambient background glow inside modal */}
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl"></div>

            <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl flex items-center gap-3 justify-center">
              Why Choose <Image src="/logo.jpeg" alt="Xaubugg Logo" width={40} height={40} className="rounded-full" /> <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">Xaubugg.com</span>?
            </h2>
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2 justify-center mt-2">
              <Sparkles className="text-amber-400 h-6 w-6" /> Unlock <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">Xaubugg.com</span> Premium
            </h3>
            <p className="text-sm text-gray-300 mb-6">
              Get instant access to real-time premium alerts, advanced dashboard features, and our exclusive library of unlisted YouTube trading video courses.
            </p>

            {/* Pricing Card Details */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-blue-400 uppercase tracking-widest font-bold">Premium Pass</span>
                <span className="text-xs rounded-full bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 font-semibold">Best Value</span>
              </div>
              <div className="flex items-baseline gap-1 text-white mb-2">
                <span className="text-3xl font-extrabold">$29</span>
                <span className="text-sm text-gray-400">/month</span>
              </div>
              <ul className="text-xs text-gray-400 space-y-2">
                <li className="flex items-center gap-2">
                  <Shield className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Access Unlisted Premium Video Course Modules</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Real-time Alerts & Signals (Telegram / Email)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Interactive TradingView Chart Modules</span>
                </li>
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <button
                onClick={confirmSubscription}
                disabled={loading}
                className="w-full py-2.5 rounded-lg neon-btn-blue text-sm font-semibold text-white flex items-center justify-center gap-2"
              >
                {loading ? "Processing..." : "Subscribe Now & Unlock"}
              </button>
              <button
                onClick={() => setShowPayModal(false)}
                className="w-full py-2.5 rounded-lg border border-white/5 hover:bg-white/5 text-sm font-semibold text-gray-400 hover:text-white transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
