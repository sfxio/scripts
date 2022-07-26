/* eslint-disable no-param-reassign */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */

import './hello-week';
// import './hello.week.theme.min.css';

export default {};

const SF_SELECT_BOOKING_DATE_CLASSES = '__sf-select-booking-date';
const SF_ADD_TO_CART_CLASSES = '__sf-add-to-cart';
const SF_CALENDAR_CLASSES = '__sf-calendar';
const SF_BOOKING_DATE_CLASSES = '__sf-booking-date';
const SF_BOOKING_DATE_ACTIVE_CLASSES = '__sf-booking-active-date';

const SL_BTNS = 'product-button-list';
const SL_ADD_TO_CARTS = '__sl-custom-track-add-to-cart-btn';
const SL_BUY_NOW = '__sl-custom-track-product-detail-buy-now';

const logger = {
  log: (...args: any[]) => console.log('[SHOPFLEX LOG]: ', ...args),
  warn: (...args: any[]) => console.warn('[SHOPFLEX WARN]: ', ...args),
  error: (...args: any[]) => console.error('[SHOPFLEX ERROR]: ', ...args),
};

// @ts-ignore
// let $: JQueryStatic = window.$;
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
  stock: number;
  available: boolean;
  id: string;
}

// @ts-ignore
const gShopline = window.Shopline as any;
const gEventBus = gShopline.event;
const gLocale: 'en' | 'zh' | 'zh-cn' = (gShopline.locale || 'en').toLowerCase();
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
let gCurrentSku: SkuData | null = null;
let gProduct: any = null;

function getProduct() {
  return fetcher(`https://${gShopHandle}.myshopline.com/api/product/products.json?handle=${gProductHandle}`).then(
    (res) => res.products[0]
  );
}

async function initBooking() {
  gProduct = await getProduct();
  logger.log('product: ', gProduct);
  if (!gProduct) {
    // logger.error('Failed to find current product: ');
    throw new Error('Failed to find current product: ');
  }
}

function resetEl() {
  // TODO(rushui 2022-07-26): create element by self
  const slBtns = document.querySelector(`.${SL_BTNS}`)!;
  const slAddToCartBtn = slBtns.querySelector<HTMLButtonElement>(`.${SL_ADD_TO_CARTS}`)!;
  const slBuyNowBtn = slBtns.querySelector<HTMLButtonElement>(`.${SL_BUY_NOW}`)!;

  slAddToCartBtn.classList.add(SF_ADD_TO_CART_CLASSES);
  slBuyNowBtn.classList.add(SF_SELECT_BOOKING_DATE_CLASSES);
  const sfAddToCartBtn = slAddToCartBtn.cloneNode(true);
  const sfSelectDateBtn = slBuyNowBtn.cloneNode(true);

  slAddToCartBtn.replaceWith(sfSelectDateBtn);
  slBuyNowBtn.replaceWith(sfAddToCartBtn);
}

function initEvent() {
  // gEventBus.on('DataReport::ViewContent', (content: ViewContent) => {
  //   console.log('DataReport::ViewContent: ', content);
  // });

  gEventBus.on('Product::SkuChanged', ({ data }: { data: SkuData }) => {
    gCurrentSku = data;
    logger.log('change sku: ', gCurrentSku);
  });
}

async function main() {
  try {
    await initBooking();
    await resetEl();
    await initEvent();
  } catch (err) {
    logger.warn('booking error with ', err);
  }
}

main();
