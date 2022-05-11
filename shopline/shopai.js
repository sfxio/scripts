(function() {
  initGa(function() {
    triggerViewEvent(Shopline.uri.alias)
    initEventListener()

    if (Shopline.uri.alias === 'ProductsDetail') {
      initPredict()
    }
  })
})()

function gtag() {
  dataLayer.push(arguments)
}

async function getClientId(cb) {
  let clientId = localStorage.getItem('clientId') || null;
  if (!clientId) {
    let _clientId = s_ga.getAll()[0].get('clientId')

    if (!_clientId) {
      _clientId = await (function() {
        return new Promise(resolve => {
          gtag('get', 'G-HP0GTQL69G', 'client_id', (_cid) => {
            resolve(_cid)
          })
        })
      })()
    }

    localStorage.setItem('clientId', _clientId)
    cb(_clientId)
  } else {
    cb(clientId)
  }
}

function initGa(cb) {
  var GTAG_ID = 'G-HP0GTQL69G'; 
  (function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    if (i[r]) return cb()
    i[r] = function () {
      (i[r].q = i[r].q || []).push(arguments)
    }
    i[r].l = 1 * new Date();
    a = s.createElement(o);
    m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g; m.parentNode.insertBefore(a, m);
    a.onload = cb;
  })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 's_ga');
  window.s_ga('create', GTAG_ID, 'auto');
}

// event

function triggerViewEvent(type) {
  switch(type) {
    case 'Home': homePageViewEvent()
    break
    case 'ProductsDetail': detailPageViewEvent()
    break
  }
}

function homePageViewEvent() {
  record_user_event("home-page-view");
}

function detailPageViewEvent() {
  Shopline.event.on('DataReport::ViewContent', function({ data: { content_spu_id: productId } }) {
    record_user_event("detail-page-view", {
      productDetails: [
        {
          product: {
            id: productId
          }
        }
      ]
    })
  })
}

function initEventListener() {
  Shopline.event.on('DataReport::AddToCart', function({ data: { quantity, content_spu_id: productId } }) {
    record_user_event("add-to-cart", {
      cartId: "cart-id",
      productDetails: [
        {
          product: {
            id: productId
          },
          quantity: quantity
        }
      ]
    })
  })


  Shopline.event.on('DataReport::CompleteOrder', function({ data: {currency, value, contents}}) {
    record_user_event("purchase-complete", {
      productDetails: contents.map(({ content_spu_id: productId, quantity }) => {
        return {
          product: {
            id: productId
          },
          quantity: quantity
        }
      }),
      purchaseTransaction: {
        revenue: value,
        currencyCode: currency
      }
    })
  })
}

function record_user_event(eventType, params = {}) {
  let clientId = localStorage.getItem('clientId') || null;

  if (!clientId) {
    getClientId(function(_clientId) {
      localStorage.setItem('clientId', _clientId)
      user_event(eventType, _clientId, params)
    })
    return
  }

  user_event(eventType, clientId, params)
}

function user_event(eventType, visitorId, params) {
  fetch('https://us-central1-shopai001.cloudfunctions.net/shopai_event', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({
      eventType,
      visitorId,
      ...params
    })
  })
}

// predict
function initPredict() {
  getClientId(function(clientId) {
    Shopline.event.on('DataReport::ViewContent', async function({ data: { content_spu_id: productId } }) {
      let productList = await getPredictList('detail-page-view', clientId, [{
        product: {
          id: productId
        }
      }])

      if (productList.length < predictNum) return
      
      productList = productList.slice(0, predictNum)
      removeProductList()
      productList.forEach(item => {
        appendProduct(item)
      })
    })
  })
}

function getPredictList(eventType, visitorId, productDetails) {
  return new Promise(resolve => {
    fetch('https://us-central1-shopai001.cloudfunctions.net/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        eventType,
        visitorId,
        productDetails,
        shop: 'g4freegear'
      })
    })
    .then(async response => {
      resolve((await response.json())?.data || [])
    })
  })
}

function appendProduct(productInfo) {
  const { price, compare_at_price } = productInfo.variants[0]
  const savePrice = Math.floor((productInfo.variants[0].compare_at_price * 1 - productInfo.variants[0].price * 1) * 100) / 100
  productListDoms.innerHTML += `
    ${
      isMobile ? '<div class="col">' : `<div class="swiper-slide" style="${ pcSwiperSlideStyle }">`
    }
      <a
        data-id="${productInfo.id}"
        data-item-no="${productInfo.variants[0].sku}"
        data-sku-id="${productInfo.variants[0].id}"
        data-index=""
        data-status="${productInfo.status === 'active'}"
        data-name="${productInfo.title}"
        data-price="${price * 100}"
        class="${ isMobile ? 'product-item' : 'product-item __sl-custom-track-product-recommend-item'}"
        href="/products/${productInfo.handle}"
        data-plugin-product-item-a=""
      >
        <div class="product-item-image-wrapper">
          <div class="product-item-next-image" data-plugin-product-item-next-img-box="">
            <div data-test="" class="product-process-image " style="opacity: 1;" data-plugin-product-item-img-ele="">
              <img
                style="object-fit: contain; height: auto;"
                class="lozad lazyloaded"
                sizes="(max-width: 749px) 80vw,(max-width: 959px) 100vw"
                src="${productInfo.image.src}?w=999&amp;h=999&amp;t=webp"
              />
            </div>
          </div>
          <div class="product-item-image" data-plugin-product-item-img-box="">
            <div data-test="" class="product-process-image" style="opacity: 1;" data-plugin-product-item-img-ele="">
              <img
                style="object-fit: contain; height: auto;"
                class="lozad lazyloaded"
                sizes="(max-width: 749px) 80vw,(max-width: 959px) 100vw"
                src="${productInfo.image.src}?w=1500&amp;h=1500&amp;t=webp"
              >
            </div>
          </div>
          ${ compare_at_price * 1 ? '<span class="product-item-sale-tag body4">Sale</span>' : '' }
          <div class="product-item-btn-con d-none d-md-block">
            <button
              data-query=""
              data-spu-seq="${productInfo.id}"
              data-unique-key="${productInfo.handle}"
              class="btn btn-primary btn-sm product-item-btn"
              type="button"
            >
              Quick view
            </button>
          </div>
        </div>
        <div class="product-item-info">
          <div class="product-item-title product-grid-font">
            ${productInfo.title}
          </div>
          <div data-ssr-product-item-price-top=""></div>
          <div class="product-item-price body-font display-center">
            ${ compare_at_price * 1 ? `<span data-product-item-price="${compare_at_price * 100}" class="product-item-origin-price notranslate">$${compare_at_price}</span>` : ''  }
            <span class="product-item-sale-price">
              <span data-product-item-price="${price * 100}" data-from="1">${ compare_at_price * 1 ? 'From' : '' } $${price}</span>
            </span>
            ${ compare_at_price * 1 ? `
              <span class="product-item-save-price">
                Save
                <span class="notranslate" data-product-item-price="${savePrice * 100}">$${savePrice}</span>
              </span>
            ` : '' }
          </div>
          <div data-ssr-product-item-price-bottom=""></div>
        </div>
        <div data-ssr-product-item-bottom=""></div>
      </a>
    </div>
  `
}

function removeProductList() {
  productListDoms.innerHTML = ''
}