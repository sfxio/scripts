// @ts-nocheck
;(function () {
  const _fetch = window.fetch
  const fetch = (endpoint: RequestInfo | URL, option?: RequestInit = {}) => {
    option.mode = option.mode || 'cors'
    return _fetch(endpoint, option)
  }

  const eventBus = window.Shopline.event
  eventBus.on('DataReport::ViewContent', (...args) => {
    console.log('DataReport::ViewContent: ', args)
  })

  const logger = {
    log: (...args: any[]) => console.log(`[SHOPFLEX LOG]: `, ...args),
    warn: (...args: any[]) => console.warn(`[SHOPFLEX WARN]: `, ...args),
    error: (...args: any[]) => console.error(`[SHOPFLEX ERROR]: `, ...args),
  }
})()
