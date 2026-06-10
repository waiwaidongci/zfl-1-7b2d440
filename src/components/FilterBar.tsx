import { Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useElevatorStore } from '@/store/elevatorStore';
import { ANOMALY_TYPES, TIME_PERIODS } from '@/types/elevator';

export default function FilterBar() {
  const filters = useElevatorStore((state) => state.filters);
  const updateFilters = useElevatorStore((state) => state.updateFilters);
  const clearFilters = useElevatorStore((state) => state.clearFilters);

  const hasActiveFilters =
    filters.floor !== null ||
    filters.timePeriod !== '' ||
    filters.anomalyType !== '';

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
          <Filter className="h-4 w-4" />
          筛选条件
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-xs text-slate-400 transition-colors hover:text-slate-200"
          >
            <X className="h-3 w-3" />
            清除筛选
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-xs text-slate-500">楼层</label>
          <input
            type="number"
            value={filters.floor ?? ''}
            onChange={(e) => {
              const val = e.target.value;
              updateFilters({
                floor: val === '' ? null : parseInt(val, 10),
              });
            }}
            placeholder="输入楼层号"
            className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs text-slate-500">时间段</label>
          <select
            value={filters.timePeriod}
            onChange={(e) => updateFilters({ timePeriod: e.target.value })}
            className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="">全部时段</option>
            {TIME_PERIODS.map((period) => (
              <option key={period.value} value={period.value}>
                {period.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs text-slate-500">异常类型</label>
          <select
            value={filters.anomalyType}
            onChange={(e) => updateFilters({ anomalyType: e.target.value })}
            className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="">全部类型</option>
            {ANOMALY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mt-3 flex flex-wrap gap-2">
          {filters.floor !== null && (
            <span
              className={cn(
                'inline-flex items-center gap-1 rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-xs font-medium text-indigo-300',
              )}
            >
              楼层: {filters.floor}
              <button
                onClick={() => updateFilters({ floor: null })}
                className="ml-1 rounded-full hover:bg-indigo-500/30"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {filters.timePeriod && (
            <span
              className={cn(
                'inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-medium text-emerald-300',
              )}
            >
              时段: {TIME_PERIODS.find((p) => p.value === filters.timePeriod)?.label}
              <button
                onClick={() => updateFilters({ timePeriod: '' })}
                className="ml-1 rounded-full hover:bg-emerald-500/30"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {filters.anomalyType && (
            <span
              className={cn(
                'inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-medium text-amber-300',
              )}
            >
              类型: {filters.anomalyType}
              <button
                onClick={() => updateFilters({ anomalyType: '' })}
                className="ml-1 rounded-full hover:bg-amber-500/30"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
