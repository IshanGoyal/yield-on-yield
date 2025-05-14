"use client";

import { useState, useEffect } from 'react';

interface LamboCalculatorProps {
  initialPortfolioValue: number;
  initialYieldRate: number;
  onBack: () => void;
}

export default function LamboCalculator({ initialPortfolioValue, initialYieldRate, onBack }: LamboCalculatorProps) {
  const [portfolioValue, setPortfolioValue] = useState(initialPortfolioValue);
  const [yieldRate, setYieldRate] = useState(initialYieldRate);
  const [isEditingPortfolio, setIsEditingPortfolio] = useState(false);
  const [isEditingYield, setIsEditingYield] = useState(false);
  
  const LAMBO_PRICE_USD = 650000;
  const BTC_PRICE_USD = 100000;
  const SATS_PER_BTC = 100000000;
  
  // Update portfolio value when it changes in the yield machine
  useEffect(() => {
    if (!isEditingPortfolio) {
      setPortfolioValue(initialPortfolioValue);
    }
  }, [initialPortfolioValue, isEditingPortfolio]);

  // Update yield rate when it changes in the yield machine
  useEffect(() => {
    if (!isEditingYield) {
      setYieldRate(initialYieldRate);
    }
  }, [initialYieldRate, isEditingYield]);
  
  const calculateYearsToLambo = () => {
    const targetSats = (LAMBO_PRICE_USD / BTC_PRICE_USD) * SATS_PER_BTC;
    const currentValueUSD = (portfolioValue / SATS_PER_BTC) * BTC_PRICE_USD;
    
    if (yieldRate <= 0) return Infinity;
    
    // Using compound interest formula: A = P(1 + r)^t
    // Solving for t: t = log(A/P) / log(1 + r)
    // where A is target amount, P is principal, r is interest rate
    const yearsToLambo = Math.log(targetSats / portfolioValue) / Math.log(1 + yieldRate);
    
    return Math.max(0, yearsToLambo);
  };

  const years = calculateYearsToLambo();
  const formattedYears = years === Infinity ? "∞" : years.toFixed(1);

  return (
    <div className="flex flex-col items-center space-y-8 p-8 bg-blue-100 rounded-xl shadow-2xl max-w-5xl mx-auto">
      <div className="text-center w-full">
        <h2 className="text-3xl font-bold text-[#002eff] mb-2">Lambo Calculator 🏎️</h2>
        <p className="text-[#002eff] opacity-80">
          Time until you can buy a Lamborghini
        </p>
      </div>

      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2">
          <label className="block text-[#002eff] text-sm font-medium">Portfolio Value (sats)</label>
          <div 
            className="w-full px-4 py-2 rounded-lg border bg-blue-50 border-blue-200 focus-within:ring-2 focus-within:ring-[#002eff] cursor-text"
            onClick={() => setIsEditingPortfolio(true)}
          >
            {isEditingPortfolio ? (
              <input
                type="number"
                value={portfolioValue}
                onChange={(e) => setPortfolioValue(Math.max(0, Number(e.target.value)))}
                onBlur={() => setIsEditingPortfolio(false)}
                className="w-full bg-transparent focus:outline-none font-mono text-[#002eff]"
                autoFocus
              />
            ) : (
              <div className="font-mono text-[#002eff]">
                {portfolioValue.toLocaleString()} sats
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-[#002eff] text-sm font-medium">Annual Yield Rate (%)</label>
          <div 
            className="w-full px-4 py-2 rounded-lg border bg-blue-50 border-blue-200 focus-within:ring-2 focus-within:ring-[#002eff] cursor-text"
            onClick={() => setIsEditingYield(true)}
          >
            {isEditingYield ? (
              <input
                type="number"
                value={(yieldRate * 100).toFixed(1)}
                onChange={(e) => setYieldRate(Math.max(0, Number(e.target.value)) / 100)}
                onBlur={() => setIsEditingYield(false)}
                step="0.1"
                className="w-full bg-transparent focus:outline-none font-mono text-[#002eff]"
                autoFocus
              />
            ) : (
              <div className="font-mono text-[#002eff]">
                {(yieldRate * 100).toFixed(1)}%
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 text-center">
          <h3 className="text-[#002eff] text-xl mb-2">Time to Lambo</h3>
          <p className="text-4xl font-bold text-[#002eff]">
            {formattedYears} years
          </p>
          <p className="text-sm text-[#002eff]/70 mt-2">
            Based on Lambo price: ${LAMBO_PRICE_USD.toLocaleString()}<br/>
            BTC price: ${BTC_PRICE_USD.toLocaleString()}
          </p>
        </div>
      </div>

      <button
        onClick={onBack}
        className="mt-6 px-6 py-2 bg-[#002eff] text-white rounded-lg hover:bg-[#002eff]/90 transition-colors"
      >
        ← Back to Yield Machine
      </button>
    </div>
  );
} 