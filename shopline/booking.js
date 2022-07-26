"use strict";
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
    var _fetch = window.fetch;
    var fetch = function (endpoint, option) {
        if (option === void 0) { option = {}; }
        option.mode = option.mode || 'cors';
        return _fetch(endpoint, option);
    };
    var eventBus = window.Shopline.event;
    eventBus.on('DataReport::ViewContent', function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log('DataReport::ViewContent: ', args);
    });
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
})();
