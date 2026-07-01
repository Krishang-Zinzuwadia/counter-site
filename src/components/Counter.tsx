"use client";

import React, { useEffect, useState } from "react";

interface CounterProps {
  initialValue: number;
  fontSize?: number;
  padding?: number;
  gap?: number;
  textColor?: string;
  fontWeight?: number;
}

export default function Counter({
  initialValue,
}: CounterProps) {
  const [totalSeconds, setTotalSeconds] = useState(initialValue);

  // Sync if initialValue changes externally
  useEffect(() => {
    setTotalSeconds(initialValue);
  }, [initialValue]);

  // Main countdown loop
  useEffect(() => {
    if (totalSeconds <= 0) return;

    const interval = setInterval(() => {
      setTotalSeconds((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [totalSeconds]);

  // Format conversions
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (num: number) => num.toString().padStart(2, "0");

  const isWarning = totalSeconds <= 10 && totalSeconds > 0;
  const isFinished = totalSeconds === 0;

  // Render sub-block for time segment digits
  const renderTimeBlock = (valueString: string, label: string) => {
    const digits = valueString.split("");
    return (
      <div className="flex flex-col items-center gap-1.5">
        <div className="flex gap-0.5 sm:gap-1">
          {digits.map((digit, i) => (
            <div
              key={i}
              className={`relative overflow-hidden flex items-center justify-center bg-white/10 backdrop-blur-md border rounded-2xl transition-all duration-300 w-10 h-15 sm:w-16 sm:h-24 md:w-20 md:h-28 shadow-lg ${
                isWarning
                  ? "border-red-500/50 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)] animate-pulse-warning"
                  : "border-[#EEDEC5]/20 text-[#EEDEC5]"
              }`}
            >
              <span className="text-2xl sm:text-4xl md:text-5xl font-black font-mono select-none">
                {digit}
              </span>
            </div>
          ))}
        </div>
        <span className="text-[8px] sm:text-xs font-bold tracking-wider sm:tracking-widest text-[#EEDEC5]/50 uppercase">
          {label}
        </span>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-2xl px-2">
      <div className="flex flex-col items-center gap-6 w-full">
        {/* Main Countdown Time Blocks */}
        <div className="flex items-center justify-center gap-1 sm:gap-2">
          {renderTimeBlock(pad(days), "Days")}
          <div className="text-[#EEDEC5]/40 text-xl sm:text-3xl md:text-5xl font-extrabold pb-4 sm:pb-5 md:pb-6 animate-pulse select-none">:</div>
          {renderTimeBlock(pad(hours), "Hours")}
          <div className="text-[#EEDEC5]/40 text-xl sm:text-3xl md:text-5xl font-extrabold pb-4 sm:pb-5 md:pb-6 animate-pulse select-none">:</div>
          {renderTimeBlock(pad(minutes), "Minutes")}
          <div className="text-[#EEDEC5]/40 text-xl sm:text-3xl md:text-5xl font-extrabold pb-4 sm:pb-5 md:pb-6 animate-pulse select-none">:</div>
          {renderTimeBlock(pad(seconds), "Seconds")}
        </div>
      </div>
    </div>
  );
}
