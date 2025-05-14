import { useState, useEffect } from 'react';
import { useAccount, useBalance, useContractWrite, useContractRead } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';

// You'll need to replace these with actual contract addresses
const USDC_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
const CBBTC_ADDRESS = '0x7c6b91D9Be155A6Db01f749217d76fF02A7227F2';
const SWAP_ROUTER_ADDRESS = '0x2626664c2603336E57B271c5C0b26F421741e481';

// Simplified ABI for the swap router
const SWAP_ROUTER_ABI = [
  {
    name: 'swapExactTokensForTokens',
    type: 'function',
    inputs: [
      { name: 'amountIn', type: 'uint256' },
      { name: 'amountOutMin', type: 'uint256' },
      { name: 'path', type: 'address[]' },
      { name: 'to', type: 'address' },
      { name: 'deadline', type: 'uint256' },
    ],
    outputs: [{ name: 'amounts', type: 'uint256[]' }],
    stateMutability: 'nonpayable',
  },
];

export default function SwapInterface() {
  const { address } = useAccount();
  const [amount, setAmount] = useState<string>('');
  const [isApproved, setIsApproved] = useState(false);

  // Get USDC balance
  const { data: usdcBalance } = useBalance({
    address,
    token: USDC_ADDRESS,
  });

  // Get estimated output amount
  const { data: estimatedOutput } = useContractRead({
    address: SWAP_ROUTER_ADDRESS,
    abi: SWAP_ROUTER_ABI,
    functionName: 'getAmountsOut',
    args: [
      amount ? parseUnits(amount, 6) : 0n, // USDC has 6 decimals
      [USDC_ADDRESS, CBBTC_ADDRESS],
    ],
    enabled: Boolean(amount),
  });

  // Swap function
  const { write: swap, isLoading: isSwapping } = useContractWrite({
    address: SWAP_ROUTER_ADDRESS,
    abi: SWAP_ROUTER_ABI,
    functionName: 'swapExactTokensForTokens',
  });

  const handleSwap = async () => {
    if (!amount || !address) return;

    const amountIn = parseUnits(amount, 6); // USDC decimals
    const deadline = BigInt(Math.floor(Date.now() / 1000) + 1800); // 30 minutes

    swap({
      args: [
        amountIn,
        0n, // Set minimum amount you want to receive
        [USDC_ADDRESS, CBBTC_ADDRESS],
        address,
        deadline,
      ],
    });
  };

  return (
    <div className="p-4 rounded-lg bg-white/10 backdrop-blur-sm">
      <h2 className="text-lg font-semibold mb-4">Swap USDC to cbBTC</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Amount USDC</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-sm text-gray-400 mt-1">
            Balance: {usdcBalance ? formatUnits(usdcBalance.value, 6) : '0'} USDC
          </p>
        </div>

        {estimatedOutput && (
          <div className="text-sm">
            Estimated cbBTC: {formatUnits(estimatedOutput[1], 8)}
          </div>
        )}

        <button
          onClick={handleSwap}
          disabled={!amount || isSwapping || !isApproved}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSwapping ? 'Swapping...' : 'Swap to cbBTC'}
        </button>
      </div>
    </div>
  );
} 