// @ts-nocheck
/* eslint-disable */

const gLocale: 'en' | 'zh' | 'zh-cn' = (window.Shopline.locale || 'en').toLowerCase();
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
  got_it_on: {
    en: 'Got it on',
    zh: '预定于',
  },
} as const;

export const translation = Object.keys(_translation).reduce((prev, key) => {
  const locale = gLocale === 'zh-cn' ? 'zh' : gLocale;
  // @ts-ignore
  prev[key] = _translation[key][locale];

  return prev;
}, Object.create(null) as { [key in keyof typeof _translation]: string });
