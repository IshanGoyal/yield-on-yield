"use client";

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { useEffect, useState } from 'react';

export default function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (isConnected && address) {
    return (
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={() => disconnect()}
          className="bg-[#002eff] hover:bg-[#0024cc] text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105 shadow-md"
        >
          {address.slice(0, 6)}...{address.slice(-4)}
        </button>
      </div>
    );
  }

  return (
    <div className="fixed top-4 left-4 z-50">
      <button
        onClick={() => connect({ connector: injected() })}
        className="bg-[#002eff] hover:bg-[#0024cc] text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105 shadow-md"
      >
        Connect Wallet
      </button>
    </div>
  );
} 