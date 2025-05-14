"use client";

import { useEffect, useState, useMemo } from "react";
import LamboCalculator from "./LamboCalculator";

type SpeedMode = "SLOW" | "MEDIUM" | "FAST";

const SPEED_CONFIGS = {
  SLOW: {
    multiplier: 0.5,
    apy: 0.017, // Harvest-Moonwell
  },
  MEDIUM: {
    multiplier: 1,
    apy: 0.06, // Umoja
  },
  FAST: {
    multiplier: 2,
    apy: 0.29, // Uniswap 0.3%
  }
} as const;

interface SlotDisplayProps {
  label: string;
  value: number;
  prefix?: string;
  showDecimals?: boolean;
  footnote?: string;
}

const SlotDisplay = ({ label, value, prefix = "", showDecimals = false, footnote }: SlotDisplayProps) => {
  const formattedValue = showDecimals 
    ? value.toLocaleString(undefined, { minimumFractionDigits: 8, maximumFractionDigits: 8 })
    : Math.floor(value).toLocaleString();
  
  return (
    <div className="flex flex-col items-center bg-blue-50 rounded-xl p-6 shadow-lg w-full min-h-[160px]">
      <h3 className="text-[#002eff] text-xl mb-4 font-semibold">{label}</h3>
      <div className="bg-white rounded-lg p-5 w-full shadow-inner">
        <div className="font-mono text-2xl text-[#002eff] text-center whitespace-nowrap overflow-x-auto scrollbar-hide">
          {prefix}{formattedValue} sats
        </div>
      </div>
      {footnote && (
        <p className="text-sm text-[#002eff]/70 mt-2 italic">
          {footnote}
        </p>
      )}
    </div>
  );
};

interface SlotMachineProps {
  speedMode: SpeedMode;
}

export default function SlotMachine({ speedMode }: SlotMachineProps) {
  const INITIAL_COLLATERAL = 1_000_000;
  const [collateral] = useState(INITIAL_COLLATERAL);
  const [yieldEarned, setYieldEarned] = useState(0);
  const [yieldOnYield, setYieldOnYield] = useState(0);
  const [showLamboCalc, setShowLamboCalc] = useState(false);

  const currentAPY = useMemo(() => {
    return SPEED_CONFIGS[speedMode].apy * SPEED_CONFIGS[speedMode].multiplier;
  }, [speedMode]);

  const satsPerSecond = useMemo(() => {
    const yearlyYield = collateral * currentAPY;
    return yearlyYield / (365 * 24 * 60 * 60);
  }, [collateral, currentAPY]);

  const yoyPerSecond = useMemo(() => {
    const yearlyYieldOnYield = yieldEarned * currentAPY;
    return yearlyYieldOnYield / (365 * 24 * 60 * 60);
  }, [yieldEarned, currentAPY]);

  const portfolioValue = useMemo(() => {
    return collateral + yieldEarned + yieldOnYield;
  }, [collateral, yieldEarned, yieldOnYield]);

  useEffect(() => {
    const interval = setInterval(() => {
      setYieldEarned(prev => prev + satsPerSecond);
      setYieldOnYield(prev => prev + yoyPerSecond);
    }, 50); // Update more frequently for smoother animation

    return () => clearInterval(interval);
  }, [satsPerSecond, yoyPerSecond]);

  if (showLamboCalc) {
    return (
      <LamboCalculator
        initialPortfolioValue={portfolioValue}
        initialYieldRate={currentAPY}
        onBack={() => setShowLamboCalc(false)}
      />
    );
  }

  return (
    <div className="flex flex-col items-center space-y-8 p-8 bg-blue-100 rounded-xl shadow-2xl max-w-5xl mx-auto relative">
      <div className="text-center w-full">
        <h2 className="text-3xl font-bold text-[#002eff] mb-2">Yield Machine</h2>
        <p className="text-[#002eff] opacity-80">
          {(currentAPY * 100).toFixed(1)}% APY
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        <SlotDisplay
          label="Portfolio Value"
          value={portfolioValue}
          footnote={`Initial collateral: ${INITIAL_COLLATERAL.toLocaleString()} sats`}
        />
        <SlotDisplay
          label="Yield Earned"
          value={yieldEarned}
          prefix="+"
          showDecimals={true}
        />
        <SlotDisplay
          label="Yield on Yield"
          value={yieldOnYield}
          prefix="+"
          showDecimals={true}
        />
      </div>

      <button
        onClick={() => setShowLamboCalc(true)}
        className="text-[#002eff] text-sm font-medium hover:text-[#002eff]/80 transition-colors cursor-pointer absolute bottom-2 left-1/2 transform -translate-x-1/2"
      >
        wen lambo 🏎️
      </button>
    </div>
  );
} 