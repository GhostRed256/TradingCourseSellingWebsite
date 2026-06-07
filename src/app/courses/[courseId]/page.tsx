"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSubscription } from "../../context/SubscriptionContext";
import { courseModules } from "../page";
import {
  ArrowLeft,
  Play,
  Lock,
  Zap,
  CheckCircle,
  FileText,
  Clock,
  Sparkles,
} from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  youtubeId: string; // The unlisted or private youtube video id
}

// Mock lessons for each course
const courseLessons: Record<string, Lesson[]> = {
  "market-structure-basics": [
    { id: "ms-1", title: "Introduction to Price Trends", duration: "12:40", youtubeId: "j71X3jPz9-I" },
    { id: "ms-2", title: "Support, Resistance & Supply Zones", duration: "15:20", youtubeId: "K71wB2X2sM0" },
    { id: "ms-3", title: "Breakout vs Fakeout Patterns", duration: "17:15", youtubeId: "K-T_b-5_Hj4" },
  ],
  "chart-indicators-guide": [
    { id: "ci-1", title: "Mastering Moving Averages", duration: "18:10", youtubeId: "j71X3jPz9-I" },
    { id: "ci-2", title: "RSI Diversions & MACD Crosses", duration: "22:45", youtubeId: "K71wB2X2sM0" },
    { id: "ci-3", title: "Combining Indicators for Confluence", duration: "25:30", youtubeId: "K-T_b-5_Hj4" },
  ],
  "smart-money-concepts": [
    { id: "sm-1", title: "What are Order Blocks?", duration: "24:10", youtubeId: "j71X3jPz9-I" }, // Gated Youtube unlisted mock
    { id: "sm-2", title: "Fair Value Gaps (FVG) Demystified", duration: "28:30", youtubeId: "K71wB2X2sM0" },
    { id: "sm-3", title: "Mitigation & Breaker Blocks", duration: "32:15", youtubeId: "K-T_b-5_Hj4" },
    { id: "sm-4", title: "Market Structure Shifts (MSS)", duration: "29:50", youtubeId: "j71X3jPz9-I" },
  ],
  "order-flow-liquidity": [
    { id: "of-1", title: "Liquidity Sweeps & Stop Hunts", duration: "28:15", youtubeId: "K71wB2X2sM0" }, // Gated Youtube unlisted mock
    { id: "of-2", title: "Understanding Institutional Order Flow", duration: "34:20", youtubeId: "K-T_b-5_Hj4" },
    { id: "of-3", title: "Session Liquidity (Asia, London, NY)", duration: "31:40", youtubeId: "j71X3jPz9-I" },
  ],
  "risk-psychology-secrets": [
    { id: "rp-1", title: "R:R Ratios & Win Rate Math", duration: "21:30", youtubeId: "K-T_b-5_Hj4" }, // Gated Youtube unlisted mock
    { id: "rp-2", title: "Drawdown Control & Risk Management", duration: "26:40", youtubeId: "j71X3jPz9-I" },
    { id: "rp-3", title: "Emotional Discipline in Live Trading", duration: "23:10", youtubeId: "K71wB2X2sM0" },
  ],
};

export default function CoursePlayer({ params }: { params: Promise<{ courseId: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const courseId = resolvedParams.courseId;
  const { user, subscribe, loading } = useSubscription();

  const module = courseModules.find((m) => m.id === courseId);
  const lessons = courseLessons[courseId] || [];

  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  useEffect(() => {
    if (lessons.length > 0) {
      setActiveLesson(lessons[0]);
    }
  }, [lessons]);

  if (!module) {
    return (
      <div className="text-center py-12 text-sm text-gray-400">
        Course module not found.
      </div>
    );
  }

  const isLocked = module.isPremium && (!user || !user.hasSubscription);

  const toggleLessonComplete = (lessonId: string) => {
    setCompletedLessons((prev) =>
      prev.includes(lessonId)
        ? prev.filter((id) => id !== lessonId)
        : [...prev, lessonId]
    );
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Back button */}
      <div>
        <Link
          href="/courses"
          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Modules</span>
        </Link>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Left Column: Video Viewer */}
        <div className="flex-[2] flex flex-col gap-4">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/5 bg-slate-950/40 backdrop-blur-md shadow-2xl">
            {isLocked ? (
              /* Locked Gated Overlay */
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/90 p-8 text-center backdrop-blur-lg">
                <div className="mb-4 rounded-full bg-amber-500/10 border border-amber-500/20 p-4 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                  <Lock className="h-8 w-8" />
                </div>
                <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2 justify-center">
                  <Sparkles className="text-amber-400 h-5 w-5" /> Premium Video Content Gated
                </h2>
                <p className="max-w-md text-xs text-gray-400 mb-6 leading-relaxed">
                  This module contains unlisted private YouTube lessons on {module.title.split(".")[1].trim()}. Activate your premium membership to gain instant access.
                </p>
                <button
                  onClick={subscribe}
                  className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-2.5 text-xs font-bold text-gray-950 shadow-lg shadow-orange-500/20 hover:scale-102 transition-transform cursor-pointer"
                >
                  Unlock All Premium Modules ($29/mo)
                </button>
              </div>
            ) : activeLesson ? (
              /* Youtube Embedded Iframe (safe unlisted content) */
              <iframe
                src={`https://www.youtube.com/embed/${activeLesson.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={activeLesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0 relative z-10"
              ></iframe>
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-gray-500">
                Loading lesson details...
              </div>
            )}
          </div>

          {/* Lesson Metadata details */}
          <div className="p-4 rounded-xl bg-white/3 border border-white/5 backdrop-blur-sm">
            <h2 className="text-lg font-bold text-white mb-1">
              {activeLesson ? activeLesson.title : module.title}
            </h2>
            <div className="flex items-center gap-4 text-[10px] text-gray-400">
              <span className="flex items-center gap-1 font-mono">
                <Clock className="h-3.5 w-3.5" />
                {activeLesson ? activeLesson.duration : module.duration}
              </span>
              <span>Gated Unlisted YouTube Stream</span>
            </div>
          </div>
        </div>

        {/* Right Column: Lessons List Panel */}
        <div className="flex-1 flex flex-col rounded-2xl border border-white/5 bg-[#090d16]/30 p-5 backdrop-blur-md h-fit">
          <h3 className="text-sm font-bold text-white mb-4">
            Curriculum Checklist
          </h3>
          
          <div className="space-y-2.5">
            {lessons.map((lesson) => {
              const isActive = activeLesson?.id === lesson.id;
              const isCompleted = completedLessons.includes(lesson.id);
              
              return (
                <div
                  key={lesson.id}
                  className={`flex items-center justify-between p-3.5 rounded-xl border transition-all duration-200 ${
                    isLocked
                      ? "border-white/5 opacity-50 select-none pointer-events-none"
                      : isActive
                      ? "border-blue-500/30 bg-blue-500/5"
                      : "border-white/5 bg-white/2 hover:bg-white/5"
                  }`}
                >
                  <button
                    disabled={isLocked}
                    onClick={() => setActiveLesson(lesson)}
                    className="flex flex-col text-left flex-1"
                  >
                    <span
                      className={`text-xs font-semibold ${
                        isActive ? "text-blue-400" : "text-gray-200"
                      }`}
                    >
                      {lesson.title}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono mt-0.5">
                      {lesson.duration}
                    </span>
                  </button>

                  {!isLocked && (
                    <button
                      onClick={() => toggleLessonComplete(lesson.id)}
                      className={`ml-2 p-1.5 rounded-lg border transition-all ${
                        isCompleted
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                          : "border-white/10 hover:border-white/20 text-gray-500"
                      }`}
                    >
                      <CheckCircle className="h-4 w-4" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Premium download / resources link */}
          {!isLocked && (
            <div className="mt-6 border-t border-white/5 pt-4">
              <a
                href="#"
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/3 hover:bg-white/5 py-2.5 text-xs font-semibold text-white transition-colors"
              >
                <FileText className="h-4 w-4 text-blue-400" />
                <span>Download Study Guide (PDF)</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
