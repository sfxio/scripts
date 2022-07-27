/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable consistent-return */
/* eslint-disable no-promise-executor-return */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-underscore-dangle */
import type HelloWeek from 'hello-week/src';
import { SF_CALENDAR_CLASSES, SF_SCHEDULE_GRID_CONTAINER } from './constant';
import { ScheduleItem } from './type';

export function loadScript(src: string, id: string, options: Partial<HTMLScriptElement> = {}) {
  return new Promise((resolve, reject) => {
    const el = document.querySelector(`script#${id}`);
    if (el) return resolve('ok');

    const script = document.createElement('script');
    script.src = src;
    script.id = id;
    Object.keys(options).forEach((key) => {
      // @ts-ignore
      script[key] = options[key];
    });

    document.body.appendChild(script);
    script.addEventListener('load', () => resolve('ok'));
    script.addEventListener('error', (err) => reject(err));
  });
}

export const delay = (timeout = 200) =>
  new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

// @ts-ignore
const GHelloWeek = window.HelloWeek;

/* eslint-disable import/prefer-default-export */
export const createCalendar = async (insert: Function, options: any = {}) => {
  const calendarEl = document.createElement('div');
  calendarEl.style.transition = 'all 200ms';
  calendarEl.style.opacity = '0';
  calendarEl.classList.add(SF_CALENDAR_CLASSES);
  await insert(calendarEl);
  await delay();
  calendarEl.style.opacity = '1';
  const calendar: HelloWeek = new GHelloWeek({
    selector: `.${SF_CALENDAR_CLASSES}`,
    format: 'YYYY-MM-DD',
    ...options,
  });

  const _destroy = calendar.destroy;
  // eslint-disable-next-line func-names
  calendar.destroy = async function (...args) {
    const el = document.querySelector<HTMLElement>(`.${SF_CALENDAR_CLASSES}`);
    if (el) {
      el.style.opacity = '0';
      await delay(200);

      el.remove();
      _destroy.apply(this, args);
    }
  };

  return calendar;
};

export function findVariant(product: any, skuSeq: string) {
  if (!product || !product.variants) return null;
  return product.variants.find((item: any) => item.id === skuSeq);
}

export class Schedule {
  private listener: any;

  constructor(insert: Function, public scheduleItems: ScheduleItem[], public ctx: { colors: any }) {
    if (!this.scheduleItems || !this.scheduleItems.length) return;

    const container = document.createElement('div');
    container.classList.add(SF_SCHEDULE_GRID_CONTAINER);
    const _colors = this.ctx.colors;
    const content = scheduleItems
      .map(
        (item) =>
          `<div class="schedule-item" style="color: ${_colors.primary}" data-type="schedule-item">${item.startTime}~${item.endTime}</div>`
      )
      .join('');
    container.innerHTML = `<div style="display: flex; flex-wrap: wrap; gap: 16px;">${content}</div>`;

    insert(container);

    this.listener = (e: MouseEvent) => {
      const { target } = e;
      console.log('target: ', target);
    };
    container.addEventListener('click', this.listener);
  }

  destroy() {
    const container = document.querySelector(`.${SF_SCHEDULE_GRID_CONTAINER}`);
    if (!container) return;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.listener && container.removeEventListener('click', this.listener);
    container.remove();
  }
}

// export function createScheduleGrid(scheduleItems: ScheduleItem[], ctx: { colors: any }) {}
