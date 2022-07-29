/* eslint-disable object-curly-newline */
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
import dayjs from 'dayjs';
import blendColors, { createHelloWeekColor } from './color';
import useLoading from './use-loading';
import {
  SF_ADD_TO_CART_CLASSES,
  SF_BTNS,
  SF_HELLO_WEEK_STYLE,
  SF_SELECT_BOOKING_DATE_CLASSES,
  SL_ADD_TO_CARTS,
  SL_BTNS,
  SL_BUY_NOW,
} from './constant';
import {
  createCalendar,
  findVariant,
  getQuantity,
  isValidDate,
  loadScript,
  Schedule,
  warning,
} from './utils';
import { translation } from './translation';
import { Colors, SfCtx, SkuData } from './type';
import { logger } from './logger';
// import './dayjs';

// import './hello.week.theme.min.css';
export const ctx: SfCtx = {
  gCurrentCalendar: null,
  gCurrentSku: null,
  gProduct: null,
  gCurrentSchedules: null,
  gCurrentSchedule: null,
  gSelectedDate: null,
};

const BASE_URL = window.origin;
// @ts-ignore
const IS_DEV = process.env.NODE_ENV !== 'production';

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

// @ts-ignore
const gShopline = window.Shopline as any;
const gEventBus = gShopline.event;
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

// global init
const gShopHandle = gShopline.handle;
// eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
const _productURL = decodeURIComponent(window.location.pathname).split('/');
let gProductHandle: any = '';
if (_productURL && _productURL.length) {
  gProductHandle = _productURL[_productURL.length - 1];
}
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

    resolve(true);
  });
}

function getProduct() {
  return fetcher(`${BASE_URL}/api/product/products.json?handle=${gProductHandle}`).then(
    (res) => res.products[0]
  );
}

function prepare() {
  logger.log('prepare...');

  if (window.location.href.includes('shopflex_testing')) {
    logger.log('testing..');

    if (!IS_DEV) throw new Error('Shopflex testing...');
  }
}

async function initBooking() {
  // gEventBus.on('DataReport::InitiateCheckout', (data: any) => {
  //   console.log('DataReport::InitiateCheckout: ', data);
  // });
  // gEventBus.on('DataReport::CompleteOrder', (data: any) => {
  //   console.log('DataReport::CompleteOrder', data);
  // });

  const product = await getProduct();
  ctx.gProduct = product;
  logger.log('product: ', product);

  if (!product) {
    // logger.error('Failed to find current product: ');
    throw new Error('Failed to find current product: ');
  }
  if (!Array.isArray(product.tags)) {
    throw new Error('Current product is not a booking product');
  }
  if (!product.tags.includes('booking')) {
    throw new Error('Current product is not a booking product');
  }
}

async function injectDep() {
  logger.log('injectDep...');
  _initStyle();
  // if (!$) {
  //   await loadScript('https://code.jquery.com/jquery-3.6.0.min.js', 'sf-jquery', {
  //     crossOrigin: 'anonymous',
  //     integrity: 'sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=',
  //     async: true,
  //   });
  //   // @ts-ignore
  //   $ = window.$;
  // }
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

  slAddToCartBtn.classList.remove(SL_ADD_TO_CARTS);
  slAddToCartBtn.classList.remove(SF_SELECT_BOOKING_DATE_CLASSES);
  slAddToCartBtn.classList.add(SF_ADD_TO_CART_CLASSES);

  slBuyNowBtn.classList.remove(SL_BUY_NOW);
  slBuyNowBtn.classList.remove(SF_ADD_TO_CART_CLASSES);
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

  let content: any;
  const { isLoading: isSelectedLoading, run: runSelect } = useLoading();
  const { isLoading: isAddingToCartLoading, run: runAddToCart } = useLoading({
    before: () => {
      content = sfAddToCartBtn.innerHTML;
      sfAddToCartBtn.innerHTML = 'Loading...';
      sfAddToCartBtn.disabled = true;
    },
    after: () => {
      sfAddToCartBtn.innerHTML = content;
      sfAddToCartBtn.disabled = false;
      content = null;
    },
  });

  sfSelectDateBtn.addEventListener('click', async () => {
    logger.log('click select booking btn.. ');
    if (ctx.gCurrentCalendar) {
      ctx.gCurrentCalendar.destroy();
      ctx.gCurrentSchedule?.destroy();
      ctx.gSelectedDate = null;
      sfSelectDateBtn.innerHTML = translation.select_booking_date;
      ctx.gCurrentCalendar = null;
      return;
    }

    const sku = ctx.gCurrentSku?.skuSeq;
    if (!sku) {
      // eslint-disable-next-line no-alert
      warning(translation.please_select_a_sku_first);
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

    ctx.gCurrentSchedules = scheduleData;
    const schedules = ctx.gCurrentSchedules || {};
    const days = Object.keys(schedules).filter(isValidDate);
    // console.log('days: ', days);
    const locations = scheduleData.locations || [];
    const resources = scheduleData.resources || [];

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
          const selectedDate = (calendar.getDaySelected() as any)[0];
          const schedule = ctx.gCurrentSchedules![selectedDate];
          if (ctx.gSelectedDate !== selectedDate) {
            ctx.gSelectedDate = selectedDate;
            ctx.gCurrentSchedule?.destroy();
            ctx.gCurrentSchedule = new Schedule(
              (el: HTMLElement) => {
                // sfBtns.insertBefore(el, runAddToCart);
                sfBtns.insertBefore(el, sfAddToCartBtn);
              },
              schedule,
              {
                colors: { primary, secondary, activeColor },
                locations,
                resources,
              }
            );
          }
        },
      }
    );

    sfSelectDateBtn.innerHTML = translation.hidden;
  });

  console.log('sfAddToCartBtn: ', sfAddToCartBtn);
  sfAddToCartBtn.addEventListener('click', async () => {
    logger.log('click add to cart btn, current context: ', ctx);
    const currentSchedule = ctx.gCurrentSchedule?.active;
    // 没有选择有效的时间段
    if (!currentSchedule) {
      warning(translation.please_select_a_valid_booking_date);
      return;
    }

    const scheduleInstance = ctx.gCurrentSchedule!;
    const { capacity, currentLocation, currentResource } = scheduleInstance;
    const quantity = getQuantity();
    if (quantity > capacity) {
      warning(
        translation.capacity_exceed
          .replace('{{capacity}}', `${capacity}`)
          .replace('{{quantity}}', `${quantity}`)
      );

      return;
    }

    logger.log(`add to cart - sku = ${ctx.gCurrentSku?.skuSeq}, quantity: ${quantity}`);

    try {
      const ids = `${currentSchedule.id}_${currentSchedule.adminId}_${currentSchedule.productId}_${
        currentSchedule.variantId
      }_${currentLocation?.id || 0}_${currentResource?.id || 0}`;
      const extra: any[] = [];
      if (currentLocation) {
        extra.push({
          name: 'Location',
          value: currentLocation.name,
          type: 'text',
          show: true,
          export: true,
        });
      }
      if (currentResource) {
        extra.push({
          name: 'Resource',
          value: currentResource.name,
          type: 'text',
          show: true,
          export: true,
        });
      }

      await runAddToCart(
        fetcher(`${BASE_URL}/api/carts/ajax-cart/add.js`, {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: [
              {
                id: ctx.gCurrentSku!.skuSeq,
                quantity,
                properties: [
                  {
                    name: 'Booking',
                    value: dayjs(currentSchedule.startTime).format('YYYY-MM-DD'),
                    type: 'text',
                  },
                  ...extra,
                  {
                    name: 'Date',
                    value: dayjs(currentSchedule.startTime).format('YYYY-MM-DD'),
                    type: 'text',
                    show: true,
                    export: true,
                    extInfo: '',
                  },
                  {
                    name: 'Time Range',
                    value: `${dayjs(currentSchedule.startTime).format('HH:mm')}-${dayjs(
                      currentSchedule.endTime
                    ).format('HH:mm')}`,
                    type: 'text',
                    show: true,
                    export: true,
                    extInfo: '',
                  },
                  {
                    name: 'planIds',
                    // addressId_resourceId
                    value: ids,
                    type: 'text',
                    show: false,
                    export: true,
                    extInfo: '',
                  },
                  {
                    name: 'uniqueCode',
                    value: ids,
                    type: 'text',
                    show: true,
                    export: true,
                    extInfo: '',
                  },
                ],
              },
            ],
          }),
        })
      );
      logger.log('Add to cart successfully');
      gEventBus.emit('Cart::NavigateCart');
    } catch (err) {
      warning(translation.failed_to_add_to_cart);
      throw err;
    }
  });
}

async function main() {
  try {
    logger.log('booking start...');
    logger.log('current version: 1.2');
    await prepare();
    await initBooking();
    // await injectDep();
    await injectDep();
    await resetEl();
    await initEvent();
    logger.log('booking end...');
  } catch (err) {
    logger.warn('booking error with ', err);
  }
}

main();
