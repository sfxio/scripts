// @ts-nocheck

;(function () {
  const logger = {
    log: (...args: any[]) => console.log(`[SHOPFLEX LOG]: `, ...args),
    warn: (...args: any[]) => console.warn(`[SHOPFLEX WARN]: `, ...args),
    error: (...args: any[]) => console.error(`[SHOPFLEX ERROR]: `, ...args),
  }
  const BOOKING_DATE_CLASSES = 'shopflex_booking_date'
  const BOOKING_DATE_ACTIVE_CLASSES = 'shopflex_booking_active_date'
  const productURL = decodeURIComponent(window.location.pathname).split('/')
  const gShopHandle = window.Shopline.handle
  const gProductHandle = productURL[productURL.length - 1]
  let gCurrentSelectedDate

  let dataAll = {}
  let variant = {}

  let selectedDate = ''
  let timeRange = ''
  let planIds = ''
  let gStartTime = []

  let visible = false

  const _addToCartBtn = document.querySelector(
    '.__sl-custom-track-add-to-cart-btn',
  )!

  const _buyNowBtn = document.querySelector(
    '.__sl-custom-track-product-detail-buy-now',
  )!

  const _btns = document.querySelector('.product-button-list')!

  let _sfBookingDateBtn = _addToCartBtn.cloneNode(true)
  let _sfAddToCartBtn = _buyNowBtn.cloneNode(true)
  _sfBookingDateBtn.textContent = 'Select booking date'
  _sfAddToCartBtn.textContent = 'Add to cart'

  _addToCartBtn.replaceWith(_sfBookingDateBtn)
  _buyNowBtn.replaceWith(_sfAddToCartBtn)

  _sfBookingDateBtn.addEventListener('click', () => {
    if (visible) {
      // cleanup
      const els = document.querySelectorAll(`.${BOOKING_DATE_CLASSES}`)
      els.forEach((el) => _btns.removeChild(el))
      _btns.removeChild(document.querySelector('.calendar'))
      _sfBookingDateBtn.textContent = 'Select Booking Date'
      gCurrentSelectedDate = undefined
      visible = false
      return
    }

    _sfBookingDateBtn.textContent = 'Hidden'
    const eCalendar = document.createElement('div')
    eCalendar.className = 'calendar hello-week'

    _btns!.insertBefore(eCalendar, _sfAddToCartBtn)
    visible = true

    // 获取当前页面选择sku的index
    const selectedOptions = document.getElementsByClassName('attr-value active')
    const optionText = []
    for (let i = 0; i < selectedOptions.length; i++) {
      optionText.push(selectedOptions[i].outerText)
    }
    optionText = optionText.join(' · ')

    // console.log(optionText)
    // 请求商品详情
    fetch(
      `https://${gShopHandle}.myshopline.com/api/product/products.json?handle=${gProductHandle}`,
    )
      .then((response) => response.json())
      .then((json) => {
        const product = json.products[0]
        const id = product.id
        variant = product.variants.find((item) => {
          return item.title === optionText
        })
        return { id, variant }
      })
      .then(({ id, variant }) => {
        return fetch(
          `https://api.shopflex.io/reserve/sku/datePlanList?platformProductId=${id}&platformVariantId=${variant.id}`,
        )
      })
      .then((response) => response.json())
      .then((json) => {
        dataAll = json.data || {}
        let keys = Object.keys(dataAll)
        // console.log(key)
        const calendar = new HelloWeek({
          selector: '.calendar',
          format: 'YYYY-MM-DD',
          daysHighlight: [
            {
              days: keys,
              backgroundColor: '#f08080',
            },
          ],

          onSelect: () => {
            const selectedDate = calendar.getDaySelected()[0]
            if (gCurrentSelectedDate === selectedDate) return

            const els = document.querySelectorAll(`.${BOOKING_DATE_CLASSES}`)
            els.forEach((el) => {
              el.remove()
            })
            gCurrentSelectedDate = selectedDate

            const timeElement = document.getElementById('timeBtn')
            if (timeElement) {
              timeElement.remove()
            }

            const dates = dataAll[selectedDate] || []

            dates.forEach((element) => {
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
              timeBtn.classList.add(BOOKING_DATE_CLASSES)

              timeBtn.innerHTML = `Buy it now,Get it on ${time}`
              timeBtn.style.background = '#ff3860'
              timeBtn.style.cursor = 'pointer'

              _btns.insertBefore(timeBtn, _sfAddToCartBtn)

              timeBtn.addEventListener('click', () => {
                const activeEl = document.querySelector(
                  `.${BOOKING_DATE_ACTIVE_CLASSES}`,
                )
                if (activeEl) {
                  activeEl.classList.remove(BOOKING_DATE_ACTIVE_CLASSES)
                  if (!activeEl.isSameNode(timeBtn)) {
                    gStartTime = []
                  }
                }

                timeBtn.classList.add(BOOKING_DATE_ACTIVE_CLASSES)
                timeBtn.style.background = '#7fcbc3'
                gStartTime.push(time)
              })
            })
          },
        })
      })
      .catch((err) => logger.error(err))
  })

  _sfAddToCartBtn.addEventListener('click', () => {
    console.log('selectedDate: ', selectedDate)
    dataAll[selectedDate].forEach((element) => {
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
    fetch(
      'https://' + shopHandle + '.myshopline.com/api/carts/ajax-cart/add.js',
      {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [
            {
              id: variant.id.toString(),
              quantity: 1,
              properties: [
                {
                  name: 'booking',
                  value: startTime.join(' '),
                  type: 'text',
                },
                {
                  name: 'Date',
                  value: selectedDate,
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
      },
    ).catch((err) => console.log('Request Failed', err))
    window.alert('Add to Cart Success!')
  })

  _addToCartBtn.replaceWith(_sfBookingDateBtn)
})()
