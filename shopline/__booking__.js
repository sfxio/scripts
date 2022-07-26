// window.onload = function () {}
;(function () {
  var btnList = document.getElementById('product-button-list_productDetail')
  btnList.innerHTML =
    '<button id="selectBookingDate">Select Booking Date</button><button id="addToCart">Add to cart</button>'

  var el = document.getElementById('selectBookingDate')

  const shopHandle = window.Shopline.handle
  const productURL = decodeURIComponent(window.location.pathname).split('/')
  const productHandle = productURL[productURL.length - 1]
  let dataAll = {}
  let variant = {}

  let selectedDate = ''
  let timeRange = ''
  let planIds = ''
  let startTime = []

  el.addEventListener('click', function () {
    // 展示日历
    var calendar = document.createElement('div')
    calendar.className = 'calendar hello-week'
    btnList.insertBefore(calendar, btnList.childNodes[1])
    // new HelloWeek({
    //   format: 'YYYY-DD-MM',
    // })

    // 获取当前页面选择sku的index
    var selectedOptions = document.getElementsByClassName('attr-value active')
    var optionText = []
    for (let i = 0; i < selectedOptions.length; i++) {
      optionText.push(selectedOptions[i].outerText)
    }
    optionText = optionText.join(' · ')
    console.log(optionText)
    // 请求商品详情

    fetch(
      'https://' +
        shopHandle +
        '.myshopline.com/api/product/products.json?handle=' +
        productHandle,
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
          'https://api.shopflex.io/reserve/sku/datePlanList?platformProductId=' +
            id +
            '&platformVariantId=' +
            variant.id,
        )
      })
      .then((response) => response.json())
      .then((json) => {
        dataAll = json.data
        let key = Object.keys(dataAll)
        console.log(key)
        const calendar = new HelloWeek({
          selector: '.calendar',
          format: 'YYYY-MM-DD',
          daysHighlight: [
            {
              days: key,
              backgroundColor: '#f08080',
            },
          ],
          onSelect: () => {
            console.log(calendar.getDaySelected())
            selectedDate = calendar.getDaySelected()[0]

            var timeElement = document.getElementById('timeBtn')
            if (timeElement) {
              timeElement.remove()
            }

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
              let time = selectedDate + ' ' + startTime + '-' + endTime
              let timeBtn = document.createElement('button')
              timeBtn.setAttribute('id', 'timeBtn')
              // timeBtn.className = 'timeBtn'
              timeBtn.innerHTML = 'Buy it now,Get it on ' + time
              timeBtn.style.background = '#ff3860'

              btnList.insertBefore(timeBtn, btnList.childNodes[2])
              timeBtn.addEventListener('click', () => {
                timeBtn.style.background = '#7fcbc3'
                startTime.push(time)
              })
            })
          },
        })
      })
      .catch((err) => console.log('Request Failed', err))
  })

  var cart = document.getElementById('addToCart')
  cart.addEventListener('click', function () {
    debugger
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
})()
