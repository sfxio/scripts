export interface ScheduleItem {
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
