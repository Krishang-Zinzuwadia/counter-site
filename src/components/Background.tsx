"use client";

import React from "react";
import Balatro from "@/components/Balatro";

export default function Background({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-950 flex flex-col items-center justify-center">
      {/* Balatro animated shader background */}
      <div className="absolute inset-0 z-0">
        <Balatro 
          isRotate={true}
          mouseInteraction={true}
          color1="#de443b"
          color2="#006bb4"
          color3="#162325"
          contrast={3.0}
          lighting={0.3}
          pixelFilter={750}
          spinSpeed={0.1}
        />
      </div>

      {/* Sleek overlay to create a premium depth feel and ensure text readability */}
      <div className="absolute inset-0 z-10 bg-slate-950/45 backdrop-blur-[1px]"></div>

      <div className="relative z-20 w-full h-full flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}
