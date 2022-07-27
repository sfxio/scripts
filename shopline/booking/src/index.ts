/* eslint-disable import/prefer-default-export */
/* eslint-disable no-debugger */
/* eslint-disable operator-linebreak */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */

import './hello-week-local';
import type HelloWeek from 'hello-week/src';
import blendColors, { createHelloWeekColor } from './color';
import useLoading from './use-loading';
import {
  SF_ADD_TO_CART_CLASSES,
  SF_BTNS,
  SF_CALENDAR_CLASSES,
  SF_HELLO_WEEK_STYLE,
  SF_JQUERY_TOAST_STYLE,
  SF_SELECT_BOOKING_DATE_CLASSES,
  SL_ADD_TO_CARTS,
  SL_BTNS,
  SL_BUY_NOW,
} from './constant';
import { createCalendar, findVariant, loadScript } from './utils';
import { initJqueryToast, jqueryToastCss } from './jquery-toast';

// import './hello.week.theme.min.css';
export const ctx: SfCtx = {
  gCurrentCalendar: null,
  gCurrentSku: null,
  gProduct: null,
  gCurrentSchedule: null,
};

const logger = {
  log: (...args: any[]) => console.log('[SHOPFLEX LOG]: ', ...args),
  warn: (...args: any[]) => console.warn('[SHOPFLEX WARN]: ', ...args),
  error: (...args: any[]) => console.error('[SHOPFLEX ERROR]: ', ...args),
};

// @ts-ignore
let $: JQueryStatic = window.$;
// if (!$) {
//   const script = document.createElement('script');
//   script.async = true;
//   script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
//   script.crossOrigin = 'anonymous';
//   script.integrity = 'sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=';
//   script.addEventListener('load', () => {
//     logger.log('init jquery');
//     // @ts-ignore
//     $ = window.$;
//   });
//   document.body.appendChild(script);
// }

const _fetch = window.fetch;
const makeUrl = (url: string, params: Record<string, string> = {}) => {
  const searchParams = new URLSearchParams(params);
  const query = searchParams.toString();
  return url.endsWith('?') ? `${url}${query}` : `${url}?${query}`;
};

const fetcher = (url: string, _options: RequestInit = {}) => {
  const options = { ..._options };
  options.mode = _options.mode || 'cors';
  options.method = options.method || 'get';

  return _fetch(url, options).then((res) => res.json());
};

// interface ViewContent {
//   content_sku_id: string;
//   content_category: string;
//   currency: string;
//   value: string;
//   quantity: number;
//   price: string;
// }

interface SkuData {
  type: 'init' | 'change';
  quantity: number;
  spuSeq: string;
  skuSeq: string;
  stock: number;
  available: boolean;
  id: string;
}

interface Colors {
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

interface SfCtx {
  gCurrentSku: SkuData | null;
  gProduct: any | null;
  gCurrentCalendar: null | HelloWeek;
  gCurrentSchedule: null | Record<string, any[]>;
}

// @ts-ignore
const gShopline = window.Shopline as any;
const gEventBus = gShopline.event;
const gLocale: 'en' | 'zh' | 'zh-cn' = (gShopline.locale || 'en').toLowerCase();
const gColors: Colors = gShopline.theme?.settings?.colors || {};
const {
  primary = '#42a298',
  pageBg = '#fff',
  secondary = blendColors(primary, pageBg, 0.4),
} = gColors;
const activeColor: string =
  gColors.activeColor || gShopline.theme?.settings.color_tag_background || '#e32619';
logger.log('primary color: ', primary);
logger.log('secondary color: ', secondary);
logger.log('activeColor color: ', activeColor);

const _translation = {
  select_booking_date: {
    en: 'Select booking date',
    zh: '选择预定日期',
  },
  hidden: {
    en: 'Hidden',
    zh: '隐藏',
  },
  add_to_cart: {
    en: 'Add to carts',
    zh: '添加到购物车',
  },
  please_select_a_sku_first: {
    en: 'Please select a sku first',
    zh: '请先选择一个商品的 sku',
  },
};
const translation = Object.keys(_translation).reduce((prev, key) => {
  const locale = gLocale === 'zh-cn' ? 'zh' : gLocale;
  // @ts-ignore
  prev[key] = _translation[key][locale];

  return prev;
}, Object.create(null) as Record<string, string>);

// global init
const gShopHandle = gShopline.handle;
// eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
const _productURL = decodeURIComponent(window.location.pathname).split('/');
const gProductHandle = _productURL[_productURL.length - 1];
// let gCurrentSku: SkuData | null = null;
// let gProduct: any = null;
// let gCurrentCalendar: null | HelloWeek = null;

function _initStyle() {
  logger.log('init style');
  return new Promise((resolve) => {
    if (!document.head.querySelector(`.${SF_HELLO_WEEK_STYLE}`)) {
      const helloWeekCss = createHelloWeekColor(primary, secondary, activeColor);
      const el = document.createElement('style');
      el.classList.add(SF_HELLO_WEEK_STYLE);
      el.innerHTML = helloWeekCss;
      document.head.appendChild(el);
    }

    // if (!document.head.querySelector(`.${SF_JQUERY_TOAST_STYLE}`)) {
    //   const el = document.createElement('style');
    //   el.classList.add(SF_JQUERY_TOAST_STYLE);
    //   el.innerHTML = jqueryToastCss;
    //   document.head.appendChild(el);
    // }

    resolve('');
  });
}

function getProduct() {
  return fetcher(
    `https://${gShopHandle}.myshopline.com/api/product/products.json?handle=${gProductHandle}`
  ).then((res) => res.products[0]);
}

async function initBooking() {
  ctx.gProduct = await getProduct();
  logger.log('product: ', ctx.gProduct);
  if (!ctx.gProduct) {
    // logger.error('Failed to find current product: ');
    throw new Error('Failed to find current product: ');
  }
}

async function injectDep() {
  logger.log('injectDep...');
  _initStyle();
  if (!$) {
    await loadScript('https://code.jquery.com/jquery-3.6.0.min.js', 'sf-jquery', {
      crossOrigin: 'anonymous',
      integrity: 'sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=',
      async: true,
    });
    // @ts-ignore
    $ = window.$;
  }
  // initJqueryToast($);
}

function resetEl() {
  // TODO(rushui 2022-07-26): create element by self
  const slBtns = document.querySelector<HTMLDivElement>(`.${SL_BTNS}`)!;
  const _position = slBtns.style.position;
  slBtns.classList.add(SF_BTNS);
  // if (!['fixed', 'relative', 'absolute', 'sticky'].includes(_position)) {
  //   slBtns.style.position = 'relative';
  // }

  const slAddToCartBtn = slBtns.querySelector<HTMLButtonElement>(`.${SL_ADD_TO_CARTS}`)!;
  const slBuyNowBtn = slBtns.querySelector<HTMLButtonElement>(`.${SL_BUY_NOW}`)!;

  slAddToCartBtn.classList.add(SF_ADD_TO_CART_CLASSES);
  slBuyNowBtn.classList.add(SF_SELECT_BOOKING_DATE_CLASSES);
  const sfAddToCartBtn = slAddToCartBtn.cloneNode(true);
  const sfSelectDateBtn = slBuyNowBtn.cloneNode(true);
  sfAddToCartBtn.textContent = translation.add_to_cart;
  sfSelectDateBtn.textContent = translation.select_booking_date;

  slAddToCartBtn.replaceWith(sfSelectDateBtn);
  slBuyNowBtn.replaceWith(sfAddToCartBtn);
}

function initEvent() {
  // gEventBus.on('DataReport::ViewContent', (content: ViewContent) => {
  //   console.log('DataReport::ViewContent: ', content);
  // });

  gEventBus.on('Product::SkuChanged', ({ data }: { data: SkuData }) => {
    ctx.gCurrentSku = data;
    logger.log('change sku: ', ctx.gCurrentSku);
  });

  const sfBtns = document.querySelector(`.${SF_BTNS}`)!;
  const sfAddToCartBtn = sfBtns.querySelector<HTMLButtonElement>(`.${SF_ADD_TO_CART_CLASSES}`)!;
  const sfSelectDateBtn = sfBtns.querySelector<HTMLButtonElement>(
    `.${SF_SELECT_BOOKING_DATE_CLASSES}`
  )!;

  const { isLoading: isSelectedLoading, run: runSelect } = useLoading();
  const { isLoading: isAddingToCartLoading, run: runAddToCart } = useLoading();

  sfSelectDateBtn.addEventListener('click', async () => {
    logger.log('click select booking btn.. ');
    if (ctx.gCurrentCalendar) {
      ctx.gCurrentCalendar.destroy();
      sfSelectDateBtn.innerHTML = translation.select_booking_date;
      ctx.gCurrentCalendar = null;
      return;
    }

    const sku = ctx.gCurrentSku?.skuSeq;
    if (!sku) {
      // eslint-disable-next-line no-alert
      alert(translation.please_select_a_sku_first);
      return;
    }

    // const variant = findVariant(ctx.gProduct, sku)!;
    // logger.log('variant: ', variant);

    const scheduleData = await fetcher(
      makeUrl('https://api.shopflex.io/reserve/sku/datePlanList', {
        platformProductId: ctx.gProduct.id,
        platformVariantId: sku,
      })
    ).then((res: any) => {
      if (res.code === 200) return res.data;
      return Promise.reject(
        new Error(
          `Failed to fetch schedule data, platformProductId = ${ctx.gProduct.id}, platformVariantId = ${sku}`
        )
      );
    });

    logger.log('scheduleData: ', scheduleData);

    ctx.gCurrentSchedule = scheduleData;
    const days = Object.keys(ctx.gCurrentSchedule || {});

    ctx.gCurrentCalendar = await createCalendar(
      (calendarEl: any) => {
        sfBtns.insertBefore(calendarEl, sfAddToCartBtn);
      },
      {
        daysHighlight: [
          {
            days,
            // backgroundColor: '#f08080',
          },
        ],

        onSelect() {
          const calendar = ctx.gCurrentCalendar!;
          

          console.log(calendar.getDaySelected());
        },
      }
    );

    sfSelectDateBtn.innerHTML = translation.hidden;
  });

  sfAddToCartBtn.addEventListener('click', () => {
    logger.log('click add to cart btn');
  });
}

async function main() {
  try {
    await initBooking();
    await injectDep();
    await injectDep();
    await resetEl();
    await initEvent();
  } catch (err) {
    logger.warn('booking error with ', err);
  }
}

main();
