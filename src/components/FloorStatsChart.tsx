import { useMemo } from 'react';
import { AlertTriangle } from 'lucide-react';
import { useElevatorStore, getFloorStats } from '@/store/elevatorStore';

export default function FloorStatsChart() {
  const records = useElevatorStore((state) => state.records);

  const floorStats = useMemo(() => {
    const stats = getFloorStats(records);
    return Array.from(stats.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);
  }, [records]);

  const maxCount = useMemo(() => {
    if (floorStats.length === 0) return 0;
    return Math.max(...floorStats.map(([, count]) => count));
  }, [floorStats]);

  const getBarColor = (index: number) => {
    const colors = [
      'bg-red-500',
      'bg-orange-500',
      'bg-amber-500',
      'bg-yellow-500',
      'bg-lime-500',
      'bg-emerald-500',
      'bg-cyan-500',
      'bg-blue-500',
    ];
    return colors[index] || 'bg-slate-500';
  };

  if (records.length === 0) {
    return (
      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5">
        <div className="mb-4 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-400" />
          <h2 className="text-lg font-semibold text-white">高频异常楼层</h2>
        </div>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="mb-2 text-3xl">📊</div>
          <p className="text-sm text-slate-500">暂无数据，添加记录后显示统计</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5">
      <div className="mb-4 flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-amber-400" />
        <h2 className="text-lg font-semibold text-white">高频异常楼层</h2>
        <span className="ml-auto text-xs text-slate-500">
          共 {records.length} 条记录
        </span>
      </div>

      {floorStats.length > 0 ? (
        <div className="space-y-3">
          {floorStats.map(([floor, count], index) => {
            const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
            return (
              <div key={floor} className="flex items-center gap-3">
                <div className="w-16 text-right">
                  <span className="text-sm font-medium text-slate-300">
                    {floor}层
                  </span>
                </div>
                <div className="relative flex-1 overflow-hidden rounded-full bg-slate-900">
                  <div
                    className={`h-6 rounded-full ${getBarColor(index)} transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  />
                  <div className="absolute inset-0 flex items-center px-3">
                    <span className="text-xs font-medium text-white drop-shadow">
                      {count} 次
                    </span>
                  </div>
                </div>
                {index === 0 && (
                  <span className="text-xs font-medium text-red-400">⚠️ 最高</span>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="mb-2 text-3xl">📊</div>
          <p className="text-sm text-slate-500">暂无统计数据</p>
        </div>
      )}

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-700 pt-4">
        <div className="text-center">
          <div className="text-xl font-bold text-white">
            {new Set(records.map((r) => r.floor)).size}
          </div>
          <div className="text-xs text-slate-500">涉及楼层</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-white">
            {new Set(records.map((r) => r.buildingName)).size}
          </div>
          <div className="text-xs text-slate-500">涉及楼宇</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-white">
            {floorStats.length > 0 ? floorStats[0][0] : '-'}
          </div>
          <div className="text-xs text-slate-500">最危险楼层</div>
        </div>
      </div>
    </div>
  );
}
