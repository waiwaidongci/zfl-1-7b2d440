import { Building2 } from 'lucide-react';
import ElevatorForm from '@/components/ElevatorForm';
import FilterBar from '@/components/FilterBar';
import RecordList from '@/components/RecordList';
import FloorStatsChart from '@/components/FloorStatsChart';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950">
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">电梯怪谈记录本</h1>
              <p className="text-xs text-slate-500">记录那些诡异的电梯异常体验</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <ElevatorForm />
            <FilterBar />
            <RecordList />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <FloorStatsChart />
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-600">
        <p>数据保存在本地浏览器，请定期备份重要记录</p>
      </footer>
    </div>
  );
}