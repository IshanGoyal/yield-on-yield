"use client";

import SlotMachine from './components/SlotMachine';
import ConnectWallet from './components/ConnectWallet';
import { useState } from 'react';

type SpeedMode = "SLOW" | "MEDIUM" | "FAST";

export default function Home() {
  const [speedMode, setSpeedMode] = useState<SpeedMode>("MEDIUM");

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 relative">
        <ConnectWallet />
        
        {/* Speed Mode Controls */}
        <div className="fixed top-4 right-4 flex gap-2 z-[100]">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSpeedMode("SLOW");
            }}
            className={`p-3 text-2xl rounded-lg transition-transform hover:scale-110 cursor-pointer shadow-md ${
              speedMode === "SLOW" ? 'bg-[#002eff] text-white' : 'bg-white hover:bg-gray-100'
            }`}
            aria-label="Slow speed mode"
          >
            😴
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSpeedMode("MEDIUM");
            }}
            className={`p-3 text-2xl rounded-lg transition-transform hover:scale-110 cursor-pointer shadow-md ${
              speedMode === "MEDIUM" ? 'bg-[#002eff] text-white' : 'bg-white hover:bg-gray-100'
            }`}
            aria-label="Medium speed mode"
          >
            🧃
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSpeedMode("FAST");
            }}
            className={`p-3 text-2xl rounded-lg transition-transform hover:scale-110 cursor-pointer shadow-md ${
              speedMode === "FAST" ? 'bg-[#002eff] text-white' : 'bg-white hover:bg-gray-100'
            }`}
            aria-label="Fast speed mode"
          >
            🚀
          </button>
        </div>

        {/* Centered Slot Machine */}
        <div className="absolute inset-0 flex items-center justify-center">
          <SlotMachine speedMode={speedMode} />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 text-center bg-white/10 backdrop-blur-sm">
        <p className="text-lg font-medium animate-pulse">
          🚀 Reminder: 100 million satoshis = 1 BTC, so keep HODLing! 💎🙌
        </p>
      </footer>
    </div>
  );
}
