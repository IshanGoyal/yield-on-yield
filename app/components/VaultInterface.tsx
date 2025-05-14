import { useState } from 'react';
import { useAccount, useContractWrite, useContractRead, useBalance } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';

// Replace with actual Morpho vault contract address
const MORPHO_VAULT_ADDRESS = '0x...';

const VAULT_ABI = [
  {
    name: 'deposit',
    type: 'function',
    inputs: [
      { name: 'assets', type: 'uint256' },
      { name: 'receiver', type: 'address' },
    ],
    outputs: [{ name: 'shares', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    name: 'withdraw',
    type: 'function',
    inputs: [
      { name: 'assets', type: 'uint256' },
      { name: 'receiver', type: 'address' },
      { name: 'owner', type: 'address' },
    ],
    outputs: [{ name: 'shares', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    name: 'getUserYield',
    type: 'function',
    inputs: [{ name: 'user', type: 'address' }],
    outputs: [{ name: 'yield', type: 'uint256' }],
    stateMutability: 'view',
  },
];

export default function VaultInterface() {
  const { address } = useAccount();
  const [depositAmount, setDepositAmount] = useState<string>('');
  const [withdrawAmount, setWithdrawAmount] = useState<string>('');

  // Get user's vault balance
  const { data: vaultBalance } = useBalance({
    address,
    token: MORPHO_VAULT_ADDRESS,
  });

  // Get user's yield
  const { data: userYield } = useContractRead({
    address: MORPHO_VAULT_ADDRESS,
    abi: VAULT_ABI,
    functionName: 'getUserYield',
    args: [address || '0x0000000000000000000000000000000000000000'],
  });

  // Deposit function
  const { write: deposit, isLoading: isDepositing } = useContractWrite({
    address: MORPHO_VAULT_ADDRESS,
    abi: VAULT_ABI,
    functionName: 'deposit',
  });

  // Withdraw function
  const { write: withdraw, isLoading: isWithdrawing } = useContractWrite({
    address: MORPHO_VAULT_ADDRESS,
    abi: VAULT_ABI,
    functionName: 'withdraw',
  });

  const handleDeposit = () => {
    if (!depositAmount || !address) return;
    
    deposit({
      args: [parseUnits(depositAmount, 8), address],
    });
  };

  const handleWithdraw = () => {
    if (!withdrawAmount || !address) return;
    
    withdraw({
      args: [parseUnits(withdrawAmount, 8), address, address],
    });
  };

  return (
    <div className="p-4 rounded-lg bg-white/10 backdrop-blur-sm">
      <h2 className="text-lg font-semibold mb-4">Morpho Vault</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Deposit Section */}
        <div className="space-y-4">
          <h3 className="text-md font-medium">Deposit cbBTC</h3>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleDeposit}
            disabled={!depositAmount || isDepositing}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isDepositing ? 'Depositing...' : 'Deposit'}
          </button>
        </div>

        {/* Withdraw Section */}
        <div className="space-y-4">
          <h3 className="text-md font-medium">Withdraw cbBTC</h3>
          <input
            type="number"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleWithdraw}
            disabled={!withdrawAmount || isWithdrawing}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isWithdrawing ? 'Withdrawing...' : 'Withdraw'}
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mt-6 space-y-2">
        <div className="flex justify-between">
          <span>Your Deposited cbBTC:</span>
          <span>{vaultBalance ? formatUnits(vaultBalance.value, 8) : '0'}</span>
        </div>
        <div className="flex justify-between">
          <span>Total Yield Earned:</span>
          <span>{userYield ? formatUnits(userYield, 8) : '0'} cbBTC</span>
        </div>
      </div>
    </div>
  );
} 