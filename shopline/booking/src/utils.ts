/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable consistent-return */
/* eslint-disable no-promise-executor-return */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-underscore-dangle */
import dayjs from 'dayjs';
import type HelloWeek from 'hello-week/src';
import { SF_CALENDAR_CLASSES, SF_SCHEDULE_GRID_CONTAINER } from './constant';
import { translation } from './translation';
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

export const delay = (timeout = 400) =>
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
      await delay(400);

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

  public active: ScheduleItem | null = null;

  constructor(insert: Function, public scheduleItems: ScheduleItem[], public ctx: { colors: any }) {
    if (!this.scheduleItems || !this.scheduleItems.length) return;

    const container = document.createElement('div');
    container.classList.add(SF_SCHEDULE_GRID_CONTAINER);
    const { primary, activeColor } = this.ctx.colors;
    const content = scheduleItems
      .map((item, index) => {
        const { startTime, endTime } = item;
        const start = dayjs(startTime).format('HH:mm');
        const end = dayjs(endTime).format('HH:mm');
        const date = dayjs(startTime).format('YYYY-MM-DD');
        const data = `data-type="schedule-item" data-index="${index}" data-start="${start} data-end="${end}"`;

        return `<div class="schedule-item" 
            style="background: ${primary}; color: #ffffff; width: 96px; height: 96px; cursor: pointer; display: flex; flex-direction: column; justify-content: center; line-height: 1.5; margin-bottom: 8px; text-align: center;"
            ${data}
          >
            <div ${data}>${translation.got_it_on}</div>
            <div ${data}>${date}</div>
            <div ${data}>${start}~${end}</div>
          </div>`;
      })
      .join('');
    container.innerHTML = `<div style="display: flex; flex-wrap: wrap; gap: 16px;">${content}</div>`;

    insert(container);

    this.listener = (e: any) => {
      const target: HTMLDivElement = e.target;
      const type = target.getAttribute('data-type');
      if (type !== 'schedule-item') return;

      const index = Number(target.getAttribute('data-index')!);
      this.active = this.scheduleItems[index];
      const els = container.querySelectorAll<HTMLElement>('.schedule-item');
      els.forEach((el, idx) => {
        if (String(idx) === String(index)) {
          el.classList.add('active');
          el.style.background = activeColor;
        } else {
          el.style.background = primary;
          el.classList.remove('active');
        }
      });
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
export async function warning(msg: string, timeout = 4000) {
  const id = 'sf-warning';
  const existedEl = document.getElementById(id);
  if (existedEl) {
    existedEl.style.opacity = '0';
    await delay(400);
    existedEl.remove();
  }

  const el = document.createElement(`div`);
  el.id = id;
  el.innerHTML = msg;

  el.style.position = 'fixed';
  el.style.zIndex = '10001';
  el.style.position = '0';
  el.style.top = '20px';
  el.style.left = '50%';
  el.style.border = '1px solid black';
  el.style.color = `#663c00`;
  el.style.background = `#fff4e5`;
  el.style.borderColor = `#f5dab1`;
  el.style.transform = 'translateX(-50%);';
  el.style.transition = 'all 200ms';
  el.style.lineHeight = '1.5';
  el.style.padding = '16px 24px';
  el.style.opacity = '1';
  document.body.appendChild(el);

  setTimeout(async () => {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.opacity = '0';

    await delay(400);
    if (el) el.remove();
  }, timeout);
}
