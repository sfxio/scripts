/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
export const logger = {
  log: (...args: any[]) => console.log('[SHOPFLEX LOG]: ', ...args),
  warn: (...args: any[]) => console.warn('[SHOPFLEX WARN]: ', ...args),
  error: (...args: any[]) => console.error('[SHOPFLEX ERROR]: ', ...args),
};
