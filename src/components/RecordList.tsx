import { Trash2, Building, Clock, Users, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useElevatorStore, getFilteredRecords } from '@/store/elevatorStore';
import type { ElevatorRecord } from '@/types/elevator';

interface RecordCardProps {
  record: ElevatorRecord;
  onDelete: (id: string) => void;
}

function RecordCard({ record, onDelete }: RecordCardProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getCredibilityColor = (credibility: number) => {
    if (credibility >= 8) return 'text-emerald-400';
    if (credibility >= 5) return 'text-amber-400';
    return 'text-rose-400';
  };

  const getAnomalyTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      '按钮失灵': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      '门异常开合': 'bg-rose-500/20 text-rose-400 border-rose-500/30',
      '突然下坠': 'bg-red-500/20 text-red-400 border-red-500/30',
      '灯光闪烁': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      '异响': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      '楼层显示错误': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      '无故停留': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
      '其他': 'bg-slate-500/20 text-slate-400 border-slate-500/30',
    };
    return colors[type] || colors['其他'];
  };

  return (
    <div className="group relative overflow-hidden rounded-xl border border-slate-700 bg-slate-800/50 p-5 transition-all hover:border-slate-600 hover:bg-slate-800">
      <div className="absolute right-4 top-4 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          onClick={() => onDelete(record.id)}
          className="rounded-full p-1.5 text-slate-500 transition-colors hover:bg-rose-500/20 hover:text-rose-400"
          title="删除记录"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span
          className={cn(
            'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
            getAnomalyTypeColor(record.anomalyType),
          )}
        >
          {record.anomalyType}
        </span>
        <span className="flex items-center gap-1 text-xs text-slate-500">
          <Star className={cn('h-3 w-3', getCredibilityColor(record.credibility))} />
          <span className={getCredibilityColor(record.credibility)}>
            {record.credibility}/10
          </span>
        </span>
      </div>

      <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white">
        <Building className="h-4 w-4 text-slate-400" />
        {record.buildingName} · {record.floor}层
      </h3>

      <div className="mb-3 grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center gap-1.5 text-slate-400">
          <Clock className="h-3.5 w-3.5" />
          <span>{record.time}</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400">
          <Users className="h-3.5 w-3.5" />
          <span>{record.companionCount} 人同行</span>
        </div>
      </div>

      <div className="mb-3 grid grid-cols-2 gap-3 text-sm">
        <div>
          <span className="text-slate-500">按钮反应:</span>
          <span className="ml-1.5 text-slate-300">{record.buttonReaction}</span>
        </div>
        <div>
          <span className="text-slate-500">门:</span>
          <span className="ml-1.5 text-slate-300">{record.doorBehavior}</span>
        </div>
      </div>

      {record.description && (
        <p className="mb-3 rounded-lg bg-slate-900/50 p-3 text-sm text-slate-300">
          {record.description}
        </p>
      )}

      <div className="text-xs text-slate-600">
        记录于 {formatDate(record.createdAt)}
      </div>
    </div>
  );
}

export default function RecordList() {
  const records = useElevatorStore((state) => state.records);
  const filters = useElevatorStore((state) => state.filters);
  const deleteRecord = useElevatorStore((state) => state.deleteRecord);

  const filteredRecords = getFilteredRecords(records, filters);

  if (filteredRecords.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 py-16 text-center">
        <div className="mb-3 text-4xl">🔇</div>
        <h3 className="mb-1 text-lg font-medium text-slate-300">暂无记录</h3>
        <p className="text-sm text-slate-500">
          {records.length === 0
            ? '点击上方按钮记录你的第一个电梯异常经历'
            : '没有符合筛选条件的记录，请尝试调整筛选条件'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">
          异常记录
          <span className="ml-2 text-sm font-normal text-slate-500">
            共 {filteredRecords.length} 条
          </span>
        </h2>
      </div>
      <div className="grid gap-4">
        {filteredRecords.map((record) => (
          <RecordCard
            key={record.id}
            record={record}
            onDelete={deleteRecord}
          />
        ))}
      </div>
    </div>
  );
}
