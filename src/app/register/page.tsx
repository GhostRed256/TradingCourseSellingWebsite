"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useSubscription } from "../context/SubscriptionContext";
import { User, Mail, Lock, Sparkles, ArrowRight } from "lucide-react";

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");
  const { user, login, subscribe } = useSubscription();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // If already logged in, redirect
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Register user
    login(username, email);

    // If they clicked "Sign Up & Subscribe"
    if (plan === "premium") {
      await subscribe();
    }

    setIsLoading(false);
    router.push("/dashboard");
  };

  return (
    <div className="w-full max-w-md space-y-8 glass-card p-8 border border-white/10 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl"></div>
      <div className="absolute -right-20 -bottom-20 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl"></div>

      <div className="text-center relative z-10">
        <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-white flex items-center justify-center gap-2">
          {plan === "premium" && <Sparkles className="text-amber-400 h-6 w-6" />}
          {plan === "premium" ? "Get Premium Access" : "Create Account"}
        </h2>
        <p className="mt-2 text-sm text-gray-400">
          {plan === "premium"
            ? "Create an account to complete your subscription"
            : "Join TradeCraft Academy today"}
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs text-rose-400 font-semibold flex items-center gap-2">
          <Lock className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}

      <form className="mt-8 space-y-5 relative z-10" onSubmit={handleSubmit}>
        <div className="space-y-4 rounded-md shadow-sm">
          {/* Username Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="e.g. TradingKing"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 glass-input text-sm"
                required
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 glass-input text-sm"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-gray-500" />
              <input
                type="password"
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 glass-input text-sm"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 rounded-lg neon-btn-blue text-sm font-semibold text-white flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <span>Creating account...</span>
            ) : (
              <>
                <span>
                  {plan === "premium" ? "Sign Up & Pay" : "Sign Up"}
                </span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </form>

      <div className="text-center text-xs text-gray-400 relative z-10">
        <span>Already have an account? </span>
        <Link href="/login" className="font-semibold text-blue-400 hover:text-blue-300">
          Sign In
        </Link>
      </div>
    </div>
  );
}

export default function Register() {
  return (
    <div className="flex min-h-[75vh] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<div className="text-white">Loading signup...</div>}>
        <RegisterContent />
      </Suspense>
    </div>
  );
}
