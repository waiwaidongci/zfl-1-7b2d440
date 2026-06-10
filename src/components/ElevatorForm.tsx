import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useElevatorStore } from '@/store/elevatorStore';
import {
  ANOMALY_TYPES,
  BUTTON_REACTIONS,
  DOOR_BEHAVIORS,
} from '@/types/elevator';

interface ElevatorFormProps {
  onClose?: () => void;
}

export default function ElevatorForm({ onClose }: ElevatorFormProps) {
  const addRecord = useElevatorStore((state) => state.addRecord);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    buildingName: '',
    floor: '',
    time: '',
    buttonReaction: '',
    doorBehavior: '',
    companionCount: '0',
    description: '',
    credibility: '5',
    anomalyType: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.buildingName ||
      !formData.floor ||
      !formData.time ||
      !formData.buttonReaction ||
      !formData.doorBehavior ||
      !formData.anomalyType
    ) {
      return;
    }

    addRecord({
      buildingName: formData.buildingName,
      floor: parseInt(formData.floor, 10),
      time: formData.time,
      buttonReaction: formData.buttonReaction,
      doorBehavior: formData.doorBehavior,
      companionCount: parseInt(formData.companionCount, 10) || 0,
      description: formData.description,
      credibility: parseInt(formData.credibility, 10),
      anomalyType: formData.anomalyType,
    });

    setFormData({
      buildingName: '',
      floor: '',
      time: '',
      buttonReaction: '',
      doorBehavior: '',
      companionCount: '0',
      description: '',
      credibility: '5',
      anomalyType: '',
    });

    setIsOpen(false);
    onClose?.();
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-white font-medium transition-all hover:bg-indigo-700 active:scale-[0.98]',
        )}
      >
        <Plus className="h-5 w-5" />
        记录新的异常
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-slate-900 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-700 px-6 py-4">
          <h2 className="text-xl font-bold text-white">记录电梯异常</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-h-[75vh] overflow-y-auto px-6 py-5"
        >
          <div className="space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">
                  楼名 <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  name="buildingName"
                  value={formData.buildingName}
                  onChange={handleChange}
                  placeholder="例如：A座"
                  className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2.5 text-white placeholder-slate-500 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">
                  楼层 <span className="text-rose-400">*</span>
                </label>
                <input
                  type="number"
                  name="floor"
                  value={formData.floor}
                  onChange={handleChange}
                  placeholder="例如：13"
                  min="-10"
                  max="200"
                  className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2.5 text-white placeholder-slate-500 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">
                  时间 <span className="text-rose-400">*</span>
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2.5 text-white transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">
                  同行人数
                </label>
                <input
                  type="number"
                  name="companionCount"
                  value={formData.companionCount}
                  onChange={handleChange}
                  min="0"
                  max="20"
                  className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2.5 text-white transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-300">
                异常类型 <span className="text-rose-400">*</span>
              </label>
              <select
                name="anomalyType"
                value={formData.anomalyType}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2.5 text-white transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="">请选择异常类型</option>
                {ANOMALY_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">
                  按钮反应 <span className="text-rose-400">*</span>
                </label>
                <select
                  name="buttonReaction"
                  value={formData.buttonReaction}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2.5 text-white transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="">请选择按钮反应</option>
                  {BUTTON_REACTIONS.map((reaction) => (
                    <option key={reaction} value={reaction}>
                      {reaction}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">
                  门开合情况 <span className="text-rose-400">*</span>
                </label>
                <select
                  name="doorBehavior"
                  value={formData.doorBehavior}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2.5 text-white transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="">请选择门的情况</option>
                  {DOOR_BEHAVIORS.map((behavior) => (
                    <option key={behavior} value={behavior}>
                      {behavior}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-300">
                可信度评分: {formData.credibility}/10
              </label>
              <input
                type="range"
                name="credibility"
                value={formData.credibility}
                onChange={handleChange}
                min="1"
                max="10"
                className="w-full cursor-pointer accent-indigo-500"
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>存疑</span>
                <span>可信</span>
                <span>确信</span>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-300">
                异常描述
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                placeholder="详细描述当时的情况..."
                className="w-full resize-none rounded-lg border border-slate-600 bg-slate-800 px-3 py-2.5 text-white placeholder-slate-500 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex-1 rounded-lg border border-slate-600 bg-slate-800 px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-700"
            >
              取消
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
            >
              保存记录
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
