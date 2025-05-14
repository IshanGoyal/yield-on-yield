import { useState } from 'react';
import { useAccount } from 'wagmi';

export default function OnRamp() {
  const { address } = useAccount();
  const [amount, setAmount] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleOnRamp = async () => {
    if (!amount || !address) return;
    
    setIsLoading(true);
    try {
      // Initialize Coinbase OnRamp
      const { CoinbaseOnramp } = await import('@coinbase/cbpay-js');
      
      const onramp = new CoinbaseOnramp({
        appId: process.env.NEXT_PUBLIC_COINBASE_APP_ID!,
        target: '#onramp-target',
        onSuccess: () => {
          console.log('Transaction completed');
          setAmount('');
        },
        onExit: () => {
          console.log('User exited the flow');
        },
        onEvent: (event) => {
          console.log('Event:', event);
        },
      });

      await onramp.open({
        destinationWallets: [{
          address,
          assets: ['USDC'],
        }],
        presetCryptoAmount: Number(amount),
      });
    } catch (error) {
      console.error('OnRamp error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 rounded-lg bg-white/10 backdrop-blur-sm">
      <h2 className="text-lg font-semibold mb-4">Buy USDC with Apple Pay</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Amount (USD)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleOnRamp}
          disabled={!amount || isLoading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Processing...' : 'Buy USDC'}
        </button>
      </div>
      <div id="onramp-target" /> {/* Coinbase OnRamp will mount here */}
    </div>
  );
} 