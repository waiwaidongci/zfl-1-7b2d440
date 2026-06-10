import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { StateCreator } from 'zustand';
import type { ElevatorRecord, FilterOptions } from '../types/elevator';

interface ElevatorState {
  records: ElevatorRecord[];
  filters: FilterOptions;
  addRecord: (record: Omit<ElevatorRecord, 'id' | 'createdAt'>) => void;
  deleteRecord: (id: string) => void;
  updateFilters: (filters: Partial<FilterOptions>) => void;
  clearFilters: () => void;
}

const defaultFilters: FilterOptions = {
  floor: null,
  timePeriod: '',
  anomalyType: '',
};

const createElevatorStore: StateCreator<
  ElevatorState,
  [],
  [['zustand/persist', ElevatorState]]
> = (set, get) => ({
  records: [],
  filters: defaultFilters,
  addRecord: (record) =>
    set({
      records: [
        {
          ...record,
          id: crypto.randomUUID(),
          createdAt: Date.now(),
        },
        ...get().records,
      ],
    }),
  deleteRecord: (id) =>
    set({
      records: get().records.filter((r) => r.id !== id),
    }),
  updateFilters: (newFilters) =>
    set({
      filters: { ...get().filters, ...newFilters },
    }),
  clearFilters: () =>
    set({
      filters: defaultFilters,
    }),
});

export const useElevatorStore = create<ElevatorState>()(
  persist(createElevatorStore, {
    name: 'elevator-records-storage',
  }),
);

export const getFilteredRecords = (
  records: ElevatorRecord[],
  filters: FilterOptions,
): ElevatorRecord[] => {
  return records.filter((record) => {
    if (filters.floor !== null && record.floor !== filters.floor) {
      return false;
    }

    if (filters.timePeriod) {
      const [start, end] = filters.timePeriod.split('-').map(Number);
      const recordHour = parseInt(record.time.split(':')[0], 10);
      if (recordHour < start || recordHour >= end) {
        return false;
      }
    }

    if (filters.anomalyType && record.anomalyType !== filters.anomalyType) {
      return false;
    }

    return true;
  });
};

export const getFloorStats = (records: ElevatorRecord[]): Map<number, number> => {
  const stats = new Map<number, number>();
  records.forEach((record) => {
    const count = stats.get(record.floor) || 0;
    stats.set(record.floor, count + 1);
  });
  return stats;
};
