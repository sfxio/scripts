"use strict";
// @ts-nocheck
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
;
(function () {
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
        },
    };
    var BOOKING_DATE_CLASSES = 'shopflex_booking_date';
    var BOOKING_DATE_ACTIVE_CLASSES = 'shopflex_booking_active_date';
    var productURL = decodeURIComponent(window.location.pathname).split('/');
    var gShopHandle = window.Shopline.handle;
    var gProductHandle = productURL[productURL.length - 1];
    var gCurrentSelectedDate;
    var dataAll = {};
    var variant = {};
    var selectedDate = '';
    var timeRange = '';
    var planIds = '';
    var gStartTime = [];
    var visible = false;
    var _addToCartBtn = document.querySelector('.__sl-custom-track-add-to-cart-btn');
    var _buyNowBtn = document.querySelector('.__sl-custom-track-product-detail-buy-now');
    var _btns = document.querySelector('.product-button-list');
    var _sfBookingDateBtn = _addToCartBtn.cloneNode(true);
    var _sfAddToCartBtn = _buyNowBtn.cloneNode(true);
    _sfBookingDateBtn.textContent = 'Select booking date';
    _sfAddToCartBtn.textContent = 'Add to cart';
    _addToCartBtn.replaceWith(_sfBookingDateBtn);
    _buyNowBtn.replaceWith(_sfAddToCartBtn);
    _sfBookingDateBtn.addEventListener('click', function () {
        if (visible) {
            // cleanup
            var els = document.querySelectorAll(".".concat(BOOKING_DATE_CLASSES));
            els.forEach(function (el) { return _btns.removeChild(el); });
            _btns.removeChild(document.querySelector('.calendar'));
            _sfBookingDateBtn.textContent = 'Select Booking Date';
            gCurrentSelectedDate = undefined;
            visible = false;
            return;
        }
        _sfBookingDateBtn.textContent = 'Hidden';
        var eCalendar = document.createElement('div');
        eCalendar.className = 'calendar hello-week';
        _btns.insertBefore(eCalendar, _sfAddToCartBtn);
        visible = true;
        // 获取当前页面选择sku的index
        var selectedOptions = document.getElementsByClassName('attr-value active');
        var optionText = [];
        for (var i = 0; i < selectedOptions.length; i++) {
            optionText.push(selectedOptions[i].outerText);
        }
        optionText = optionText.join(' · ');
        // console.log(optionText)
        // 请求商品详情
        fetch("https://".concat(gShopHandle, ".myshopline.com/api/product/products.json?handle=").concat(gProductHandle))
            .then(function (response) { return response.json(); })
            .then(function (json) {
            var product = json.products[0];
            var id = product.id;
            variant = product.variants.find(function (item) {
                return item.title === optionText;
            });
            return { id: id, variant: variant };
        })
            .then(function (_a) {
            var id = _a.id, variant = _a.variant;
            return fetch("https://api.shopflex.io/reserve/sku/datePlanList?platformProductId=".concat(id, "&platformVariantId=").concat(variant.id));
        })
            .then(function (response) { return response.json(); })
            .then(function (json) {
            dataAll = json.data || {};
            var keys = Object.keys(dataAll);
            // console.log(key)
            var calendar = new HelloWeek({
                selector: '.calendar',
                format: 'YYYY-MM-DD',
                daysHighlight: [
                    {
                        days: keys,
                        backgroundColor: '#f08080',
                    },
                ],
                onSelect: function () {
                    var selectedDate = calendar.getDaySelected()[0];
                    if (gCurrentSelectedDate === selectedDate)
                        return;
                    var els = document.querySelectorAll(".".concat(BOOKING_DATE_CLASSES));
                    els.forEach(function (el) {
                        el.remove();
                    });
                    gCurrentSelectedDate = selectedDate;
                    var timeElement = document.getElementById('timeBtn');
                    if (timeElement) {
                        timeElement.remove();
                    }
                    var dates = dataAll[selectedDate] || [];
                    dates.forEach(function (element) {
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
                        timeBtn.classList.add(BOOKING_DATE_CLASSES);
                        timeBtn.innerHTML = "Buy it now,Get it on ".concat(time);
                        timeBtn.style.background = '#ff3860';
                        timeBtn.style.cursor = 'pointer';
                        _btns.insertBefore(timeBtn, _sfAddToCartBtn);
                        timeBtn.addEventListener('click', function () {
                            var activeEl = document.querySelector(".".concat(BOOKING_DATE_ACTIVE_CLASSES));
                            if (activeEl) {
                                activeEl.classList.remove(BOOKING_DATE_ACTIVE_CLASSES);
                                if (!activeEl.isSameNode(timeBtn)) {
                                    gStartTime = [];
                                }
                            }
                            timeBtn.classList.add(BOOKING_DATE_ACTIVE_CLASSES);
                            timeBtn.style.background = '#7fcbc3';
                            gStartTime.push(time);
                        });
                    });
                },
            });
        })
            .catch(function (err) { return logger.error(err); });
    });
    _sfAddToCartBtn.addEventListener('click', function () {
        console.log('selectedDate: ', selectedDate);
        dataAll[selectedDate].forEach(function (element) {
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
        fetch('https://' + shopHandle + '.myshopline.com/api/carts/ajax-cart/add.js', {
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
        }).catch(function (err) { return console.log('Request Failed', err); });
        window.alert('Add to Cart Success!');
    });
    _addToCartBtn.replaceWith(_sfBookingDateBtn);
})();
