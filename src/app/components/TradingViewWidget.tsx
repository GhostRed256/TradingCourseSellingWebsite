"use client";

import React, { useEffect, useRef } from "react";

export default function TradingViewWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear container to avoid multiple widgets on rerender
    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: "BINANCE:BTCUSDT",
      interval: "240",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      enable_publishing: false,
      backgroundColor: "rgba(9, 13, 22, 0.5)",
      gridColor: "rgba(255, 255, 255, 0.03)",
      allow_symbol_change: true,
      calendar: false,
      hide_volume: false,
      support_host: "https://www.tradingview.com",
    });

    containerRef.current.appendChild(script);
  }, []);

  return (
    <div className="w-full h-full relative rounded-2xl overflow-hidden border border-white/5 bg-[#090d16]/30 backdrop-blur-md">
      {/* Loading state indicator */}
      <div className="absolute inset-0 z-0 flex items-center justify-center text-xs text-gray-500 font-mono">
        Loading TradingView Terminal...
      </div>
      <div
        ref={containerRef}
        className="tradingview-widget-container w-full h-full relative z-10"
        style={{ height: "100%", minHeight: "500px" }}
      >
        <div className="tradingview-widget-container__widget h-full w-full"></div>
      </div>
    </div>
  );
}
