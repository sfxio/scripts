// @ts-nocheck
/* eslint-disable */

const gLocale: 'en' | 'zh' | 'zh-cn' | 'zh-hans-cn' = (
  window.Shopline.locale || 'en'
).toLowerCase();
const _translation = {
  select_booking_date: {
    en: 'Select date',
    zh: '选择日期',
  },
  hidden: {
    en: 'Hidden',
    zh: '隐藏',
  },
  add_to_cart: {
    en: 'Add to cart',
    zh: '添加到购物车',
  },
  please_select_a_sku_first: {
    en: 'Please select a sku first',
    zh: '请先选择一个商品的 sku',
  },
  got_it_on: {
    en: 'Got it on',
    zh: '预定于',
  },
  please_select_a_valid_booking_date: {
    en: 'Please select a valid booking date',
    zh: '请选择有效的预约日期',
  },
  failed_to_add_to_cart: {
    en: 'Failed to add to cart',
    zh: '加入购物车失败',
  },
  capacity_exceed: {
    en: 'Capacity exceed',
    zh: '容量超额',
  },
} as const;

export const translation = Object.keys(_translation).reduce((prev, key) => {
  const locale = (gLocale as string).includes('zh') ? 'zh' : 'en';
  // @ts-ignore
  prev[key] = _translation[key][locale];

  return prev;
}, Object.create(null) as { [key in keyof typeof _translation]: string });
