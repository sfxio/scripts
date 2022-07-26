// @ts-nocheck
;(function () {
  const _fetch = window.fetch
  const fetch = (endpoint: RequestInfo | URL, option?: RequestInit = {}) => {
    option.mode = option.mode || 'cors'
    return _fetch(endpoint, option)
  }

  const eventBus = window.Shopline.event
  const logger = {
    log: (...args: any[]) => console.log(`[SHOPFLEX LOG]: `, ...args),
    warn: (...args: any[]) => console.warn(`[SHOPFLEX WARN]: `, ...args),
    error: (...args: any[]) => console.error(`[SHOPFLEX ERROR]: `, ...args),
  }

  const canInject = (product) => {
    return (
      product &&
      product.tags &&
      (product.tags === 'booking' ||
        (Array.isArray(product.tags) && product.tags.includes('booking')))
    )
  }
  const _productURL = decodeURIComponent(window.location.pathname).split('/')
  // global init
  const gShopHandle = window.Shopline.handle
  const gProductHandle = _productURL[_productURL.length - 1]
  let gStartTime = []
  let gProductDetail
  let gScheduleData
  let gCurrentVariant
  let gCurrentSelectedDate
  let gIsCalendarVisible = false
  if (!gShopHandle || !gProductHandle) {
    return logger.warn(
      `Failed to init global data: shop_handle = ${gShopHandle}, product_handle = ${gProductHandle}`,
    )
  }

  const SF_SELECT_BOOKING_DATE_CLASSES = '__sf-select-booking-date'
  const SF_ADD_TO_CART_CLASSES = '__sf-add-to-cart'
  const SF_CALENDAR_CLASSES = '__sf-calendar'
  const SF_BOOKING_DATE_CLASSES = '__sf-booking-date'
  const SF_BOOKING_DATE_ACTIVE_CLASSES = '__sf-booking-active-date'

  function resetEl() {
    logger.log('resetEl...')
    const _addToCartBtn = document.querySelector(
      '.__sl-custom-track-add-to-cart-btn',
    )!

    const _buyNowBtn = document.querySelector(
      '.__sl-custom-track-product-detail-buy-now',
    )!

    // const _btns = document.querySelector('.product-button-list')!

    _addToCartBtn.classList.add(SF_SELECT_BOOKING_DATE_CLASSES)
    _buyNowBtn.classList.add(SF_ADD_TO_CART_CLASSES)
    const _sfBookingDateBtn = _addToCartBtn.cloneNode(true)
    const _sfAddToCartBtn = _buyNowBtn.cloneNode(true)
    _sfBookingDateBtn.textContent = 'Select booking date'
    _sfAddToCartBtn.textContent = 'Add to cart'

    _addToCartBtn.replaceWith(_sfBookingDateBtn)
    _buyNowBtn.replaceWith(_sfAddToCartBtn)
    return Promise.resolve()
  }

  function initProductDetail() {
    return fetch(
      `https://${gShopHandle}.myshopline.com/api/product/products.json?handle=${gProductHandle}`,
    )
      .then((response) => response.json())
      .then((json) => {
        return json.products[0]
      })
      .then((product) => {
        gProductDetail = product
        logger.log('product: ', gProductDetail)
      })
  }

  function _handleDateSelectorBtnClick(
    dateSelectorBtn: HTMLButtonElement,
    addToCartBtn: HTMLButtonElement,
    parent: HTMLDivElement,
    e,
  ) {
    // cleanup
    if (gIsCalendarVisible) {
      const els = document.querySelectorAll(`.${SF_BOOKING_DATE_CLASSES}`)
      const calendarEl = document.querySelector(`.${SF_CALENDAR_CLASSES}`)
      els.forEach((el) => parent.removeChild(el))
      gStartTime = []

      if (calendarEl) {
        parent.removeChild(calendarEl)
        dateSelectorBtn.textContent = 'Select booking date'
      }

      gIsCalendarVisible = false
      return
    }

    // init
    dateSelectorBtn.textContent = 'Hidden'
    const calendar = document.createElement('div')
    calendar.className = ['calendar ', 'hello-week', SF_CALENDAR_CLASSES].join(
      ' ',
    )
    parent.insertBefore(calendar, addToCartBtn)
    gIsCalendarVisible = true

    const selectedOptionsEl = document.getElementsByClassName(
      'attr-value active',
    )
    let selectedOptions = []
    for (let i = 0; i < selectedOptionsEl.length; i++) {
      selectedOptions.push(selectedOptionsEl[i].outerText)
    }

    const { id } = gProductDetail
    const variant = gProductDetail.variants.find((item) => {
      const variantOptions: string[] = item.options || []
      return selectedOptions.every((option) => variantOptions.includes(option))
    })
    gCurrentVariant = variant

    logger.log(`click dateSelectorBtn: product_id=$${id}, variant = `, variant)

    return fetch(
      'https://api.shopflex.io/reserve/sku/datePlanList?platformProductId=' +
        id +
        '&platformVariantId=' +
        variant.id,
    )
      .then((res) => res.json())
      .then((response) => {
        if (response.code === 200) {
          return response.data
        }
        return Promise.reject(new Error(response.message))
      })
      .then((data) => {
        gScheduleData = data || {}
        logger.log('schedule: ', gScheduleData)
        const keys = Object.keys(gScheduleData)
        const oCalendar = new HelloWeek({
          selector: `.${SF_CALENDAR_CLASSES}`,
          format: 'YYYY-MM-DD',
          daysHighlight: [
            {
              days: keys,
              backgroundColor: '#f08080',
            },
          ],
          onSelect: () => {
            const selectedDate = oCalendar.getDaySelected()[0]
            if (gCurrentSelectedDate === selectedDate) return

            const els = document.querySelectorAll<HTMLButtonElement>(
              `.${SF_BOOKING_DATE_CLASSES}`,
            )

            // toggle
            els.forEach((el) => {
              // el.removeEventListener('click')
              el.remove()
            })

            gCurrentSelectedDate = selectedDate

            const schedule: any[] = gScheduleData[selectedDate] || []
            schedule.forEach((element) => {
              let hh = new Date(element.startTime).getHours()
              let mm =
                new Date(element.startTime).getMinutes() < 10
                  ? '0' + new Date(element.startTime).getMinutes()
                  : +new Date(element.startTime).getMinutes()
              let startTime = hh + ':' + mm
              hh = new Date(element.endTime).getHours()
              mm =
                new Date(element.endTime).getMinutes() < 10
                  ? '0' + new Date(element.endTime).getMinutes()
                  : +new Date(element.endTime).getMinutes()
              let endTime = hh + ':' + mm
              let time = selectedDate + ' ' + startTime + '-' + endTime
              let timeBtn = document.createElement('button')
              timeBtn.classList.add(SF_BOOKING_DATE_CLASSES)

              timeBtn.innerHTML = `Buy it now,Get it on ${time}`
              timeBtn.style.background = '#ff3860'
              timeBtn.style.cursor = 'pointer'

              parent.insertBefore(timeBtn, addToCartBtn)

              timeBtn.addEventListener('click', () => {
                const activeEl = document.querySelector<HTMLButtonElement>(
                  `.${SF_BOOKING_DATE_ACTIVE_CLASSES}`,
                )
                if (activeEl) {
                  // recover
                  activeEl.classList.remove(SF_BOOKING_DATE_ACTIVE_CLASSES)
                  activeEl.style.background = '#7fcbc3'
                  if (!activeEl.isSameNode(timeBtn)) {
                    gStartTime = []
                  }
                }

                timeBtn.classList.add(SF_BOOKING_DATE_ACTIVE_CLASSES)
                timeBtn.style.background = '#7fcbc3'
                gStartTime.push(time)
              })
            })
          },
        })
      })
  }

  function _handleAddToCartSelectorBtnClick(
    dateSelectorBtn: HTMLButtonElement,
    addToCartBtn: HTMLButtonElement,
    parent: HTMLDivElement,
    e,
  ) {
    if (!gCurrentSelectedDate) {
      window.alert(`Select booking data first`)
      return
    }
    const el = document.querySelector<HTMLInputElement>(
      `#product-detail-sku-quantity_productDetail input`,
    )
    console.log('el: ', el)
    const quantity = Number(el?.value || 1)
    // console.log('quantity: ', quantity)

    const schedule = gScheduleData[gCurrentSelectedDate] || []

    let timeRange
    let planIds

    schedule.forEach((element) => {
      let hh = new Date(element.startTime).getHours()
      let mm =
        new Date(element.startTime).getMinutes() < 10
          ? '0' + new Date(element.startTime).getMinutes()
          : +new Date(element.startTime).getMinutes()
      let startTime = hh + ':' + mm
      hh = new Date(element.endTime).getHours()
      mm =
        new Date(element.endTime).getMinutes() < 10
          ? '0' + new Date(element.endTime).getMinutes()
          : +new Date(element.endTime).getMinutes()
      let endTime = hh + ':' + mm
      timeRange = startTime + '-' + endTime
      planIds =
        element.id +
        '_' +
        element.adminId +
        '_' +
        element.productId +
        '_' +
        element.variantId
    })

    logger.log(`properties: variant = `, gCurrentVariant)
    logger.log(`properties: startTime = `, gStartTime.join(' '))
    logger.log(`properties: selectedDate = `, gCurrentSelectedDate)
    logger.log(`properties: timeRange = `, timeRange)
    logger.log(`properties: planIds = `, planIds)

    fetch(`https://${gShopHandle}.myshopline.com/api/carts/ajax-cart/add.js`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [
          {
            id: gCurrentVariant.id,
            quantity,
            properties: [
              {
                name: 'booking',
                value: gStartTime.join(' '),
                type: 'text',
              },
              {
                name: 'Date',
                value: gCurrentSelectedDate,
                type: 'text',
                show: true,
                export: true,
                extInfo: '',
              },
              {
                name: 'Time Range',
                value: timeRange,
                type: 'text',
                show: true,
                export: true,
                extInfo: '',
              },
              {
                name: 'planIds',
                value: planIds,
                type: 'text',
                show: false,
                export: true,
                extInfo: '',
              },
            ],
          },
        ],
      }),
    }).catch((err) => logger.error('add to cart error: ', err))
    // window.alert('Add to Cart Success!')
    eventBus.emit('Cart::NavigateCart')
  }

  // async function initSchedule() {}
  function initEvent() {
    const dateSelectorBtn = document.querySelector(
      `.${SF_SELECT_BOOKING_DATE_CLASSES}`,
    )!
    const addToCartBtn = document.querySelector(`.${SF_ADD_TO_CART_CLASSES}`)!
    const btns = document.querySelector(`.product-button-list`)!
    // console.log('dateSelectorBtn: ', dateSelectorBtn)
    // console.log('addToCartBtn: ', addToCartBtn)

    dateSelectorBtn.addEventListener('click', (e) =>
      _handleDateSelectorBtnClick(dateSelectorBtn, addToCartBtn, btns, e),
    )

    addToCartBtn.addEventListener('click', (e) =>
      _handleAddToCartSelectorBtnClick(dateSelectorBtn, addToCartBtn, btns, e),
    )

    return Promise.resolve()
  }

  function main() {
    resetEl()
      .then(() => {
        return initProductDetail()
      })
      .then(() => {
        if (!canInject(gProductDetail))
          return Promise.reject(new Error('is not a booking product'))
      })
      .then(() => {
        return initEvent()
      })
      .catch((err) => {
        logger.warn(err)
      })
  }

  main()
})()
