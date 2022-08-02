/* eslint-disable @typescript-eslint/indent */
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
import {
  SF_CALENDAR_CLASSES,
  SF_CAPACITY,
  SF_SCHEDULE_GRID_CONTAINER,
  SF_SCHEDULE_LOCATIONS,
  SF_SCHEDULE_RESOURCES,
} from './constant';
import { logger } from './logger';
import { translation } from './translation';
import type { ScheduleItem } from './type';

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
  public capacity: number = Number.MAX_SAFE_INTEGER;

  private listener: any;

  private selectListener: any;

  public active: ScheduleItem | null = null;

  public currentLocation: any | null = null;

  public currentResource: any | null = null;

  constructor(
    insert: Function,
    public scheduleItems: ScheduleItem[],
    public ctx: { colors: any; locations: any[]; resources: any[] }
  ) {
    if (!this.scheduleItems || !this.scheduleItems.length) return;

    const container = document.createElement('div');
    container.classList.add(SF_SCHEDULE_GRID_CONTAINER);
    const { primary, activeColor, secondary } = this.ctx.colors;
    const { locations, resources } = this.ctx;
    const content = scheduleItems
      .map((item, index) => {
        const { startTime, endTime } = item;
        const start = dayjs(startTime).format('HH:mm');
        const end = dayjs(endTime).format('HH:mm');
        const date = dayjs(startTime).format('YYYY-MM-DD');
        const data = `data-type="schedule-item" data-index="${index}" data-start="${start} data-end="${end}"`;

        return `<div class="schedule-item" 
            style="background: ${secondary}; color: #000; width: 96px; height: 96px; cursor: pointer; display: flex; flex-direction: column; justify-content: center; line-height: 1.5; margin-bottom: 8px; text-align: center;"
            ${data}
          >
            <div ${data}>${translation.got_it_on}</div>
            <div ${data}>${date}</div>
            <div ${data}>${start}~${end}</div>
            <div ${data}></div>
          </div>`;
      })
      .join('');
    let resourcesContent = '';
    let locationsContent = '';

    if (locations.length) {
      locationsContent = `
<div style="vertical-align: middle; font-size: 1.2em">
  <span style="color: red;">*</span>
  <span>
    ${translation.location}:
  </span>
  <select style="min-width: 120px; text-align: center; height: 2.2em;" class=${SF_SCHEDULE_LOCATIONS} data-type="location">
    ${locations
      .map((location) => `<option value="${location.id}">${location.name}</option>`)
      .join('')}
  </select>
</div>
`;
    }

    if (resources.length) {
      resourcesContent = `
<div style="vertical-align: middle; font-size: 1.2em">
  <span style="color: red;">*</span>
  <span>
    ${translation.resource}:
  </span>
  <select style="min-width: 120px; text-align: center; height: 2.2em;" class=${SF_SCHEDULE_RESOURCES} data-type="resource">
    ${resources
      .map((resource) => `<option value="${resource.id}">${resource.name}</option>`)
      .join('')}
  </select>
</div>
`;
    }

    container.innerHTML = `
<div style="display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 16px;">${content}</div>
<div style="display: flex; gap: 16px; margin-bottom: 16px;">${locationsContent}${resourcesContent}</div>
<div style="color: #171f2b; font-size: 14px; margin-bottom: 16px;" class="${SF_CAPACITY}"></div>
`;

    insert(container);

    this.selectListener = (e: any) => {
      const target: HTMLSelectElement = e.target;
      this.initSelect(target);
      // const type = target.getAttribute('data-type');
      // const value = target.value;
      // if (type === 'location') {
      //   const location = locations.find((item: any) => String(item.id) === String(value));
      //   this.currentLocation = location;
      // } else {
      //   const resource = resources.find((item: any) => String(item.id) === String(value));
      //   this.currentResource = resource;
      // }
    };

    container.querySelectorAll('select').forEach((select) => {
      this.initSelect(select);
      select.addEventListener('change', this.selectListener);
    });

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
          el.style.color = '#fff';
        } else {
          el.style.background = secondary;
          el.style.color = '#000';
          el.classList.remove('active');
        }
      });
    };
    container.addEventListener('click', this.listener);
  }

  destroy() {
    const container = document.querySelector(`.${SF_SCHEDULE_GRID_CONTAINER}`);
    this.active = null;
    this.currentLocation = null;
    this.currentResource = null;
    this.capacity = Number.MAX_SAFE_INTEGER;
    if (!container) return;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.listener && container.removeEventListener('click', this.listener);

    if (this.selectListener) {
      container
        .querySelectorAll('select')
        .forEach((select) => select.removeEventListener('change', this.selectListener));
    }
    container.remove();
  }

  private initSelect(target: HTMLSelectElement) {
    // logger.log('init select');
    const type = target.getAttribute('data-type');
    const value = target.value;
    const locations = this.ctx.locations;
    const resources = this.ctx.resources;
    if (type === 'location') {
      const location = locations.find((item: any) => String(item.id) === String(value));
      this.currentLocation = location;
    } else {
      const resource = resources.find((item: any) => String(item.id) === String(value));
      this.currentResource = resource;
    }
    this.capacity = Number.MAX_SAFE_INTEGER;
    if (this.active) {
      this.capacity = Math.min(this.capacity, this.active.capacity || Number.MAX_SAFE_INTEGER);
    }
    if (this.currentLocation) {
      this.capacity = Math.min(
        this.capacity,
        this.currentLocation.capacity || Number.MAX_SAFE_INTEGER
      );
    }
    if (this.currentResource) {
      this.capacity = Math.min(
        this.capacity,
        this.currentResource.capacity || Number.MAX_SAFE_INTEGER
      );
    }
    if (this.capacity === Number.MAX_SAFE_INTEGER) this.capacity = 0;
    const el = document.querySelector(`.${SF_CAPACITY}`);
    if (el) el.innerHTML = `${translation.capacity}: ${this.capacity}`;
    // logger.log('location: ', this.currentLocation);
    // logger.log('resource: ', this.currentResource);
  }
}

async function message(
  msg: string,
  timeout: number,
  colors: { color: string; background: string; border: string }
) {
  const id = 'sf-message';
  const existedEl = document.getElementById(id);
  if (existedEl) {
    existedEl.style.opacity = '0';
    await delay(200);
    existedEl.remove();
  }

  const el = document.createElement('div');
  el.id = id;
  el.innerHTML = msg;

  el.style.position = 'fixed';
  el.style.zIndex = '10001';
  el.style.position = '0';
  el.style.top = '20px';
  el.style.left = '50%';
  el.style.border = '1px solid black';
  el.style.color = colors.color;
  el.style.background = colors.background;
  el.style.borderColor = colors.border;
  el.style.transform = 'translateX(-50%)';
  el.style.minWidth = '300px';
  el.style.maxWidth = '420px';
  el.style.transition = 'all 200ms';
  el.style.lineHeight = '1.5';
  el.style.padding = '16px 24px';
  el.style.opacity = '1';
  document.body.appendChild(el);

  setTimeout(async () => {
    const _el = document.getElementById(id);
    if (!_el) return;
    _el.style.opacity = '0';

    await delay(400);
    if (_el) _el.remove();
  }, timeout);
}

// export function createScheduleGrid(scheduleItems: ScheduleItem[], ctx: { colors: any }) {}
export function warning(msg: string, timeout = 4000) {
  return message(msg, timeout, {
    color: '#663c00',
    background: '#fff4e5',
    border: '#f5dab1',
  });
}

export function error(msg: string, timeout = 4000) {
  return message(msg, timeout, {
    color: '#5f2120',
    border: '#fdeded',
    background: '#fdeded',
  });
}

export function success(msg: string, timeout = 4000) {
  return message(msg, timeout, {
    color: '#1e4620',
    background: '#edf7ed',
    border: '#edf7ed',
  });
}

export function getQuantity(defaultVal = 1) {
  const el = document.querySelector<HTMLInputElement>(
    '#product-detail-sku-stepper_productDetail input'
  );
  if (!el) return defaultVal;

  const value = Number(el.value);
  if (value <= 0) return defaultVal;
  return value;
}

export function isValidDate(date: string) {
  return /\d{2}-\d{2}-\d{2}/.test(date);
}
