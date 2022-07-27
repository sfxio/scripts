import type HelloWeek from 'hello-week/src';
import { Schedule } from './utils';

export interface ScheduleItem {
  adminId: number;
  id: number;
  productId: number;
  variantId: number;
  scheduleId: number;
  startTime: string;
  endTime: string;
  price: number;
  compareAtPrice: number;
  totalCapacity: number;
  capacity: number;
  orderIds: null;
  note: null;
  status: 1;
  createdTime: string;
  updatedTime: string;
}

export interface SfCtx {
  gCurrentSku: SkuData | null;
  gProduct: any | null;
  gCurrentCalendar: null | HelloWeek;
  gCurrentSchedules: null | Record<string, any[]>;
  gCurrentSchedule: Schedule | null;
  gSelectedDate: string | null;
}

export interface Colors {
  body?: string;
  btn?: string;
  btnBg?: string;
  input?: string;
  inputBg?: string;
  inputBorder?: string;
  link?: string;
  maskBg?: string;
  moduleBg?: string;
  orderCanceledBg?: string;
  orderConfirmedBg?: string;
  orderFinishedBg?: string;
  orderProcessingBg?: string;
  pageBg?: string;
  primary?: string;
  productTitle?: string;
  sale?: string;
  saleDescription?: string;
  star?: string;
  statusError?: string;
  tag?: string;
  tagBg?: string;
  tagDisabledBg?: string;
  title?: string;
  vip?: string;
  vipBg?: string;
  secondary?: string;
  activeColor?: string;
}
export interface SkuData {
  type: 'init' | 'change';
  quantity: number;
  spuSeq: string;
  skuSeq: string;
  stock: number;
  available: boolean;
  id: string;
}
