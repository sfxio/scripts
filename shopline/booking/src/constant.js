(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SL_BUY_NOW = exports.SL_ADD_TO_CARTS = exports.SL_BTNS = exports.SF_JQUERY_TOAST_STYLE = exports.SF_HELLO_WEEK_STYLE = exports.SF_BOOKING_DATE_ACTIVE_CLASSES = exports.SF_BOOKING_DATE_CLASSES = exports.SF_CALENDAR_CLASSES = exports.SF_ADD_TO_CART_CLASSES = exports.SF_SELECT_BOOKING_DATE_CLASSES = exports.SF_BTNS = void 0;
    exports.SF_BTNS = '__sf-product-button-list';
    exports.SF_SELECT_BOOKING_DATE_CLASSES = '__sf-select-booking-date';
    exports.SF_ADD_TO_CART_CLASSES = '__sf-add-to-cart';
    exports.SF_CALENDAR_CLASSES = '__sf-calendar';
    exports.SF_BOOKING_DATE_CLASSES = '__sf-booking-date';
    exports.SF_BOOKING_DATE_ACTIVE_CLASSES = '__sf-booking-active-date';
    exports.SF_HELLO_WEEK_STYLE = '__sf-hello-week-style';
    exports.SF_JQUERY_TOAST_STYLE = '__sf-jquery-toast-style';
    exports.SL_BTNS = 'product-button-list';
    exports.SL_ADD_TO_CARTS = '__sl-custom-track-add-to-cart-btn';
    exports.SL_BUY_NOW = '__sl-custom-track-product-detail-buy-now';
});
