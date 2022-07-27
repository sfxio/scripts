/* eslint-disable consistent-return */
/* eslint-disable no-promise-executor-return */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-underscore-dangle */
import type HelloWeek from 'hello-week/src';
import { SF_CALENDAR_CLASSES } from './constant';

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
