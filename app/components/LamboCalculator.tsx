"use client";

import { useState, useEffect } from "react";

interface LamboCalculatorProps {
  initialPortfolioValue: number;
  initialYieldRate: number;
  onBack: () => void;
}

export default function LamboCalculator({ initialPortfolioValue, initialYieldRate, onBack }: LamboCalculatorProps) {
  const LAMBO_PRICE_USD = 650_000;
  const BTC_PRICE_USD = 100_000;
  const SATS_PER_BTC = 100_000_000;
  const LAMBO_PRICE_SATS = (LAMBO_PRICE_USD / BTC_PRICE_USD) * SATS_PER_BTC;

  const [portfolioValue, setPortfolioValue] = useState(initialPortfolioValue);
  const [yieldRate, setYieldRate] = useState(initialYieldRate);

  // Update yield rate when initialYieldRate changes (speed mode changes)
  useEffect(() => {
    setYieldRate(initialYieldRate);
  }, [initialYieldRate]);

  // Calculate time until Lambo using continuous compound interest
  const calculateTimeToLambo = () => {
    if (portfolioValue >= LAMBO_PRICE_SATS) return 0;
    if (yieldRate <= 0) return Infinity;

    // Using continuous compound interest formula: A = P * e^(rt)
    // Solving for t: t = ln(A/P) / r
    // where A is target amount (Lambo price), P is principal (portfolio value), r is yield rate
    const yearsToLambo = Math.log(LAMBO_PRICE_SATS / portfolioValue) / yieldRate;
    return Math.max(0, yearsToLambo);
  };

  const timeToLambo = calculateTimeToLambo();
  const years = Math.floor(timeToLambo);
  const remainingMonths = (timeToLambo - years) * 12;
  const months = Math.floor(remainingMonths);
  const days = Math.floor((remainingMonths - months) * 30.44); // Using more precise days per month

  return (
    <div className="flex flex-col items-center space-y-8 p-8 bg-blue-100 rounded-xl shadow-2xl max-w-2xl mx-auto">
      <div className="text-center w-full">
        <h2 className="text-3xl font-bold text-[#002eff] mb-2">Lambo Calculator 🏎️</h2>
        <p className="text-[#002eff] opacity-80">
          Time until you can buy a $650,000 Lambo at $100,000 BTC
        </p>
      </div>

      <div className="w-full space-y-6">
        <div className="space-y-2">
          <label className="text-[#002eff] font-medium">Portfolio Value (sats)</label>
          <input
            type="number"
            value={portfolioValue}
            onChange={(e) => setPortfolioValue(Math.max(0, Number(e.target.value)))}
            className="w-full p-3 rounded-lg border-2 border-[#002eff] focus:outline-none focus:ring-2 focus:ring-[#002eff] text-[#002eff]"
            min="0"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[#002eff] font-medium">Annual Yield Rate</label>
          <div className="relative">
            <input
              type="number"
              value={(yieldRate * 100).toFixed(1)}
              onChange={(e) => setYieldRate(Math.max(0, Number(e.target.value)) / 100)}
              className="w-full p-3 rounded-lg border-2 border-[#002eff] focus:outline-none focus:ring-2 focus:ring-[#002eff] text-[#002eff] pr-8"
              step="0.1"
              min="0"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#002eff]">%</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-[#002eff] mb-4">Time until Lambo</h3>
          {timeToLambo === Infinity ? (
            <p className="text-red-500">Never (need positive yield rate)</p>
          ) : timeToLambo === 0 ? (
            <p className="text-green-500 font-bold">You can already buy a Lambo! 🎉</p>
          ) : (
            <p className="text-[#002eff] text-lg">
              {years > 0 && <span>{years} year{years !== 1 ? 's' : ''}{" "}</span>}
              {months > 0 && <span>{months} month{months !== 1 ? 's' : ''}{" "}</span>}
              {days > 0 && <span>{days} day{days !== 1 ? 's' : ''}</span>}
            </p>
          )}
        </div>
      </div>

      <button
        onClick={onBack}
        className="text-[#002eff] font-medium hover:text-[#002eff]/80 transition-colors"
      >
        ← Back to Yield Machine
      </button>
    </div>
  );
} 