export interface ElevatorRecord {
  id: string;
  buildingName: string;
  floor: number;
  time: string;
  buttonReaction: string;
  doorBehavior: string;
  companionCount: number;
  description: string;
  credibility: number;
  anomalyType: string;
  createdAt: number;
}

export interface FilterOptions {
  floor: number | null;
  timePeriod: string;
  anomalyType: string;
}

export const ANOMALY_TYPES = [
  '按钮失灵',
  '门异常开合',
  '突然下坠',
  '灯光闪烁',
  '异响',
  '楼层显示错误',
  '无故停留',
  '其他',
] as const;

export const TIME_PERIODS = [
  { label: '凌晨 (0-6点)', value: '0-6' },
  { label: '早晨 (6-9点)', value: '6-9' },
  { label: '上午 (9-12点)', value: '9-12' },
  { label: '下午 (12-18点)', value: '12-18' },
  { label: '傍晚 (18-21点)', value: '18-21' },
  { label: '深夜 (21-24点)', value: '21-24' },
] as const;

export const BUTTON_REACTIONS = [
  '无反应',
  '延迟反应',
  '亮灯但不运行',
  '按错楼层',
  '多灯同时亮',
  '正常',
] as const;

export const DOOR_BEHAVIORS = [
  '无法打开',
  '无法关闭',
  '反复开合',
  '夹人',
  '开关缓慢',
  '正常',
] as const;
