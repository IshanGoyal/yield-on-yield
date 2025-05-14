"use client";

import SlotMachine from './components/SlotMachine';
import ConnectWallet from './components/ConnectWallet';
import { useState, useCallback } from 'react';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";

type SpeedMode = "SLOW" | "MEDIUM" | "FAST";

export default function Home() {
  const [speedMode, setSpeedMode] = useState<SpeedMode>("MEDIUM");

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 relative">
        <ConnectWallet />
        <Particles
          id="baseConfetti"
          init={particlesInit}
          options={{
            fullScreen: {
              enable: true,
              zIndex: 1
            },
            particles: {
              number: {
                value: 0
              },
              color: {
                value: "#ffffff"
              },
              shape: {
                type: "image",
                image: {
                  src: "/images/base-logo.png",
                  width: 24,
                  height: 24
                }
              },
              opacity: {
                value: 1,
                animation: {
                  enable: true,
                  speed: 4,
                  minimumValue: 0,
                  sync: false,
                  destroy: "min",
                  startValue: "max"
                }
              },
              size: {
                value: 16
              },
              life: {
                duration: {
                  value: 0.01,
                  sync: true
                },
                count: 1
              },
              move: {
                enable: true,
                speed: 50,
                direction: "none",
                random: true,
                straight: false,
                outModes: {
                  default: "destroy"
                },
                gravity: {
                  enable: true,
                  acceleration: 50
                }
              }
            },
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "emitter"
                }
              },
              modes: {
                emitter: {
                  quantity: 8,
                  rate: {
                    delay: 0.01,
                    quantity: 8
                  }
                }
              }
            }
          }}
        />
        
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
