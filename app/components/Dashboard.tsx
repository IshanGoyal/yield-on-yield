import { useState, useEffect } from 'react';
import { useAccount, useBalance, useContractRead } from 'wagmi';
import { formatEther, formatUnits } from 'viem';
import WalletConnect from './WalletConnect';
import OnRamp from './OnRamp';
import SwapInterface from './SwapInterface';
import YieldStats from './YieldStats';
import VaultInterface from './VaultInterface';

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const [totalYieldSats, setTotalYieldSats] = useState<string>('0');
  const [yieldOnYield, setYieldOnYield] = useState<string>('0');
  
  // Fetch user's cbBTC balance
  const { data: cbBTCBalance } = useBalance({
    address,
    token: '0x7c6b91D9Be155A6Db01f749217d76fF02A7227F2', // cbBTC address on Base
    watch: true,
  });

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h1 className="text-2xl font-bold">Welcome to Yield-on-Yield</h1>
        <p className="text-gray-600">Connect your wallet to get started</p>
        <WalletConnect />
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Balance Display */}
        <div className="p-4 rounded-lg bg-white/10 backdrop-blur-sm">
          <h2 className="text-lg font-semibold mb-2">Your Balance</h2>
          <p className="text-2xl font-bold">
            {cbBTCBalance ? formatUnits(cbBTCBalance.value, 8) : '0'} cbBTC
          </p>
        </div>
        
        {/* Yield Stats */}
        <YieldStats 
          totalYieldSats={totalYieldSats}
          yieldOnYield={yieldOnYield}
        />
      </div>

      {/* Main Actions */}
      <div className="space-y-4">
        <OnRamp />
        <SwapInterface />
        <VaultInterface />
      </div>
    </div>
  );
} 