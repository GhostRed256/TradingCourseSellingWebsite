import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SubscriptionProvider } from "./context/SubscriptionContext";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EmergingTrader80 - Premium Apple Glass Trading Portal",
  description: "An advanced trading education and analysis platform featuring unlisted video subscriptions and TradingView tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex bg-[#090d16] text-[#f3f4f6] font-sans antialiased overflow-x-hidden">
        <SubscriptionProvider>
          {/* Animated Ambient Blobs */}
          <div className="bg-blobs">
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <div className="blob blob-3"></div>
          </div>

          {/* Navigation Sidebar */}
          <Sidebar />

          {/* Core Content Area */}
          <div className="flex flex-1 flex-col md:pl-20 min-h-screen">
            {/* Top Navbar */}
            <Navbar />
            
            {/* Page Viewport */}
            <main className="flex-1 p-6 pb-24 md:pb-6 overflow-y-auto">
              {children}
            </main>
          </div>
        </SubscriptionProvider>
      </body>
    </html>
  );
}

