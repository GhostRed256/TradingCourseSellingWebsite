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

            {/* Footer */}
            <footer className="w-full py-6 text-center border-t border-white/5 bg-[#090d16]/50 backdrop-blur-md mt-auto">
              <p className="text-sm text-gray-400">
                made with ❤️ by{" "}
                <a
                  href="https://bio-portfolio-seven.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-400 hover:text-blue-300 transition-colors hover:underline"
                >
                  Ritesh Dey
                </a>
              </p>
            </footer>
          </div>
        </SubscriptionProvider>
      </body>
    </html>
  );
}

