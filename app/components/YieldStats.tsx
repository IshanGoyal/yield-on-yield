interface YieldStatsProps {
  totalYieldSats: string;
  yieldOnYield: string;
}

export default function YieldStats({ totalYieldSats, yieldOnYield }: YieldStatsProps) {
  // Convert sats to BTC for display
  const totalYieldBTC = (Number(totalYieldSats) / 100000000).toFixed(8);
  const yieldOnYieldBTC = (Number(yieldOnYield) / 100000000).toFixed(8);

  return (
    <div className="p-4 rounded-lg bg-white/10 backdrop-blur-sm">
      <h2 className="text-lg font-semibold mb-4">Yield Statistics</h2>
      
      <div className="space-y-4">
        <div className="flex flex-col">
          <span className="text-sm text-gray-400">Total Yield Earned</span>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold">{totalYieldBTC}</span>
            <span className="text-sm">BTC</span>
          </div>
          <span className="text-sm text-gray-400">({totalYieldSats} sats)</span>
        </div>

        <div className="flex flex-col">
          <span className="text-sm text-gray-400">Yield on Yield</span>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold">{yieldOnYieldBTC}</span>
            <span className="text-sm">BTC</span>
          </div>
          <span className="text-sm text-gray-400">({yieldOnYield} sats)</span>
        </div>
      </div>
    </div>
  );
} 