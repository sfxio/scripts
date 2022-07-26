var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// @ts-nocheck
;
(function () {
    var _fetch = window.fetch;
    var fetch = function (endpoint, option) {
        if (option === void 0) { option = {}; }
        option.mode = option.mode || 'cors';
        return _fetch(endpoint, option);
    };
    var eventBus = window.Shopline.event;
    var logger = {
        log: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return console.log.apply(console, __spreadArray(["[SHOPFLEX LOG]: "], args, false));
        },
        warn: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return console.warn.apply(console, __spreadArray(["[SHOPFLEX WARN]: "], args, false));
        },
        error: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return console.error.apply(console, __spreadArray(["[SHOPFLEX ERROR]: "], args, false));
        }
    };
    var canInject = function (product) {
        return (product &&
            product.tags &&
            (product.tags === 'booking' ||
                (Array.isArray(product.tags) && product.tags.includes('booking'))));
    };
    var _productURL = decodeURIComponent(window.location.pathname).split('/');
    // global init
    var gShopHandle = window.Shopline.handle;
    var gProductHandle = _productURL[_productURL.length - 1];
    var gStartTime = [];
    var gProductDetail;
    var gScheduleData;
    var gCurrentVariant;
    var gCurrentSelectedDate;
    var gIsCalendarVisible = false;
    if (!gShopHandle || !gProductHandle) {
        return logger.warn("Failed to init global data: shop_handle = ".concat(gShopHandle, ", product_handle = ").concat(gProductHandle));
    }
    var SF_SELECT_BOOKING_DATE_CLASSES = '__sf-select-booking-date';
    var SF_ADD_TO_CART_CLASSES = '__sf-add-to-cart';
    var SF_CALENDAR_CLASSES = '__sf-calendar';
    var SF_BOOKING_DATE_CLASSES = '__sf-booking-date';
    var SF_BOOKING_DATE_ACTIVE_CLASSES = '__sf-booking-active-date';
    function resetEl() {
        logger.log('resetEl...');
        var _addToCartBtn = document.querySelector('.__sl-custom-track-add-to-cart-btn');
        var _buyNowBtn = document.querySelector('.__sl-custom-track-product-detail-buy-now');
        // const _btns = document.querySelector('.product-button-list')!
        _addToCartBtn.classList.add(SF_SELECT_BOOKING_DATE_CLASSES);
        _buyNowBtn.classList.add(SF_ADD_TO_CART_CLASSES);
        var _sfBookingDateBtn = _addToCartBtn.cloneNode(true);
        var _sfAddToCartBtn = _buyNowBtn.cloneNode(true);
        _sfBookingDateBtn.textContent = 'Select booking date';
        _sfAddToCartBtn.textContent = 'Add to cart';
        _addToCartBtn.replaceWith(_sfBookingDateBtn);
        _buyNowBtn.replaceWith(_sfAddToCartBtn);
        return Promise.resolve();
    }
    function initProductDetail() {
        return fetch("https://".concat(gShopHandle, ".myshopline.com/api/product/products.json?handle=").concat(gProductHandle))
            .then(function (response) { return response.json(); })
            .then(function (json) {
            return json.products[0];
        })
            .then(function (product) {
            gProductDetail = product;
            logger.log('product: ', gProductDetail);
        });
    }
    function _handleDateSelectorBtnClick(dateSelectorBtn, addToCartBtn, parent, e) {
        // cleanup
        if (gIsCalendarVisible) {
            var els = document.querySelectorAll(".".concat(SF_BOOKING_DATE_CLASSES));
            var calendarEl = document.querySelector(".".concat(SF_CALENDAR_CLASSES));
            els.forEach(function (el) { return parent.removeChild(el); });
            gStartTime = [];
            if (calendarEl) {
                parent.removeChild(calendarEl);
                dateSelectorBtn.textContent = 'Select booking date';
            }
            gIsCalendarVisible = false;
            return;
        }
        // init
        dateSelectorBtn.textContent = 'Hidden';
        var calendar = document.createElement('div');
        calendar.className = ['calendar ', 'hello-week', SF_CALENDAR_CLASSES].join(' ');
        parent.insertBefore(calendar, addToCartBtn);
        gIsCalendarVisible = true;
        var selectedOptionsEl = document.getElementsByClassName('attr-value active');
        var selectedOptions = [];
        for (var i = 0; i < selectedOptionsEl.length; i++) {
            selectedOptions.push(selectedOptionsEl[i].outerText);
        }
        var id = gProductDetail.id;
        var variant = gProductDetail.variants.find(function (item) {
            var variantOptions = item.options || [];
            return selectedOptions.every(function (option) { return variantOptions.includes(option); });
        });
        gCurrentVariant = variant;
        logger.log("click dateSelectorBtn: product_id=$".concat(id, ", variant = "), variant);
        return fetch('https://api.shopflex.io/reserve/sku/datePlanList?platformProductId=' +
            id +
            '&platformVariantId=' +
            variant.id)
            .then(function (res) { return res.json(); })
            .then(function (response) {
            if (response.code === 200) {
                return response.data;
            }
            return Promise.reject(new Error(response.message));
        })
            .then(function (data) {
            gScheduleData = data || {};
            logger.log('schedule: ', gScheduleData);
            var keys = Object.keys(gScheduleData);
            var oCalendar = new HelloWeek({
                selector: ".".concat(SF_CALENDAR_CLASSES),
                format: 'YYYY-MM-DD',
                daysHighlight: [
                    {
                        days: keys,
                        backgroundColor: '#f08080'
                    },
                ],
                onSelect: function () {
                    var selectedDate = oCalendar.getDaySelected()[0];
                    if (gCurrentSelectedDate === selectedDate)
                        return;
                    var els = document.querySelectorAll(".".concat(SF_BOOKING_DATE_CLASSES));
                    // toggle
                    els.forEach(function (el) {
                        // el.removeEventListener('click')
                        el.remove();
                    });
                    gCurrentSelectedDate = selectedDate;
                    var schedule = gScheduleData[selectedDate] || [];
                    schedule.forEach(function (element) {
                        var hh = new Date(element.startTime).getHours();
                        var mm = new Date(element.startTime).getMinutes() < 10
                            ? '0' + new Date(element.startTime).getMinutes()
                            : +new Date(element.startTime).getMinutes();
                        var startTime = hh + ':' + mm;
                        hh = new Date(element.endTime).getHours();
                        mm =
                            new Date(element.endTime).getMinutes() < 10
                                ? '0' + new Date(element.endTime).getMinutes()
                                : +new Date(element.endTime).getMinutes();
                        var endTime = hh + ':' + mm;
                        var time = selectedDate + ' ' + startTime + '-' + endTime;
                        var timeBtn = document.createElement('button');
                        timeBtn.classList.add(SF_BOOKING_DATE_CLASSES);
                        timeBtn.innerHTML = "Buy it now,Get it on ".concat(time);
                        timeBtn.style.background = '#ff3860';
                        timeBtn.style.cursor = 'pointer';
                        parent.insertBefore(timeBtn, addToCartBtn);
                        timeBtn.addEventListener('click', function () {
                            var activeEl = document.querySelector(".".concat(SF_BOOKING_DATE_ACTIVE_CLASSES));
                            if (activeEl) {
                                // recover
                                activeEl.classList.remove(SF_BOOKING_DATE_ACTIVE_CLASSES);
                                activeEl.style.background = '#7fcbc3';
                                if (!activeEl.isSameNode(timeBtn)) {
                                    gStartTime = [];
                                }
                            }
                            timeBtn.classList.add(SF_BOOKING_DATE_ACTIVE_CLASSES);
                            timeBtn.style.background = '#7fcbc3';
                            gStartTime.push(time);
                        });
                    });
                }
            });
        });
    }
    function _handleAddToCartSelectorBtnClick(dateSelectorBtn, addToCartBtn, parent, e) {
        if (!gCurrentSelectedDate) {
            window.alert("Select booking data first");
            return;
        }
        var el = document.querySelector("#product-detail-sku-quantity_productDetail input");
        console.log('el: ', el);
        var quantity = Number((el === null || el === void 0 ? void 0 : el.value) || 1);
        // console.log('quantity: ', quantity)
        var schedule = gScheduleData[gCurrentSelectedDate] || [];
        var timeRange;
        var planIds;
        schedule.forEach(function (element) {
            var hh = new Date(element.startTime).getHours();
            var mm = new Date(element.startTime).getMinutes() < 10
                ? '0' + new Date(element.startTime).getMinutes()
                : +new Date(element.startTime).getMinutes();
            var startTime = hh + ':' + mm;
            hh = new Date(element.endTime).getHours();
            mm =
                new Date(element.endTime).getMinutes() < 10
                    ? '0' + new Date(element.endTime).getMinutes()
                    : +new Date(element.endTime).getMinutes();
            var endTime = hh + ':' + mm;
            timeRange = startTime + '-' + endTime;
            planIds =
                element.id +
                    '_' +
                    element.adminId +
                    '_' +
                    element.productId +
                    '_' +
                    element.variantId;
        });
        logger.log("properties: variant = ", gCurrentVariant);
        logger.log("properties: startTime = ", gStartTime.join(' '));
        logger.log("properties: selectedDate = ", gCurrentSelectedDate);
        logger.log("properties: timeRange = ", timeRange);
        logger.log("properties: planIds = ", planIds);
        fetch("https://".concat(gShopHandle, ".myshopline.com/api/carts/ajax-cart/add.js"), {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: [
                    {
                        id: gCurrentVariant.id,
                        quantity: quantity,
                        properties: [
                            {
                                name: 'booking',
                                value: gStartTime.join(' '),
                                type: 'text'
                            },
                            {
                                name: 'Date',
                                value: gCurrentSelectedDate,
                                type: 'text',
                                show: true,
                                "export": true,
                                extInfo: ''
                            },
                            {
                                name: 'Time Range',
                                value: timeRange,
                                type: 'text',
                                show: true,
                                "export": true,
                                extInfo: ''
                            },
                            {
                                name: 'planIds',
                                value: planIds,
                                type: 'text',
                                show: false,
                                "export": true,
                                extInfo: ''
                            },
                        ]
                    },
                ]
            })
        })["catch"](function (err) { return logger.error('add to cart error: ', err); });
        // window.alert('Add to Cart Success!')
        eventBus.emit('Cart::NavigateCart');
    }
    // async function initSchedule() {}
    function initEvent() {
        var dateSelectorBtn = document.querySelector(".".concat(SF_SELECT_BOOKING_DATE_CLASSES));
        var addToCartBtn = document.querySelector(".".concat(SF_ADD_TO_CART_CLASSES));
        var btns = document.querySelector(".product-button-list");
        // console.log('dateSelectorBtn: ', dateSelectorBtn)
        // console.log('addToCartBtn: ', addToCartBtn)
        dateSelectorBtn.addEventListener('click', function (e) {
            return _handleDateSelectorBtnClick(dateSelectorBtn, addToCartBtn, btns, e);
        });
        addToCartBtn.addEventListener('click', function (e) {
            return _handleAddToCartSelectorBtnClick(dateSelectorBtn, addToCartBtn, btns, e);
        });
        return Promise.resolve();
    }
    function main() {
        resetEl()
            .then(function () {
            return initProductDetail();
        })
            .then(function () {
            if (!canInject(gProductDetail))
                return Promise.reject(new Error('is not a booking product'));
        })
            .then(function () {
            return initEvent();
        })["catch"](function (err) {
            logger.warn(err);
        });
    }
    main();
})();
