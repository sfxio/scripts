var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./hello-week-local", "./color", "./use-loading", "./constant", "./utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    var _a, _b, _c;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ctx = void 0;
    require("./hello-week-local");
    var color_1 = __importStar(require("./color"));
    var use_loading_1 = __importDefault(require("./use-loading"));
    var constant_1 = require("./constant");
    var utils_1 = require("./utils");
    exports.ctx = {
        gCurrentCalendar: null,
        gCurrentSku: null,
        gProduct: null,
        gCurrentSchedule: null,
    };
    var logger = {
        log: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return console.log.apply(console, __spreadArray(['[SHOPFLEX LOG]: '], args, false));
        },
        warn: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return console.warn.apply(console, __spreadArray(['[SHOPFLEX WARN]: '], args, false));
        },
        error: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return console.error.apply(console, __spreadArray(['[SHOPFLEX ERROR]: '], args, false));
        },
    };
    var $ = window.$;
    var _fetch = window.fetch;
    var makeUrl = function (url, params) {
        if (params === void 0) { params = {}; }
        var searchParams = new URLSearchParams(params);
        var query = searchParams.toString();
        return url.endsWith('?') ? "".concat(url).concat(query) : "".concat(url, "?").concat(query);
    };
    var fetcher = function (url, _options) {
        if (_options === void 0) { _options = {}; }
        var options = __assign({}, _options);
        options.mode = _options.mode || 'cors';
        options.method = options.method || 'get';
        return _fetch(url, options).then(function (res) { return res.json(); });
    };
    var gShopline = window.Shopline;
    var gEventBus = gShopline.event;
    var gLocale = (gShopline.locale || 'en').toLowerCase();
    var gColors = ((_b = (_a = gShopline.theme) === null || _a === void 0 ? void 0 : _a.settings) === null || _b === void 0 ? void 0 : _b.colors) || {};
    var _d = gColors.primary, primary = _d === void 0 ? '#42a298' : _d, _e = gColors.pageBg, pageBg = _e === void 0 ? '#fff' : _e, _f = gColors.secondary, secondary = _f === void 0 ? (0, color_1.default)(primary, pageBg, 0.4) : _f;
    var activeColor = gColors.activeColor || ((_c = gShopline.theme) === null || _c === void 0 ? void 0 : _c.settings.color_tag_background) || '#e32619';
    logger.log('primary color: ', primary);
    logger.log('secondary color: ', secondary);
    logger.log('activeColor color: ', activeColor);
    var _translation = {
        select_booking_date: {
            en: 'Select booking date',
            zh: '选择预定日期',
        },
        hidden: {
            en: 'Hidden',
            zh: '隐藏',
        },
        add_to_cart: {
            en: 'Add to carts',
            zh: '添加到购物车',
        },
        please_select_a_sku_first: {
            en: 'Please select a sku first',
            zh: '请先选择一个商品的 sku',
        },
    };
    var translation = Object.keys(_translation).reduce(function (prev, key) {
        var locale = gLocale === 'zh-cn' ? 'zh' : gLocale;
        prev[key] = _translation[key][locale];
        return prev;
    }, Object.create(null));
    var gShopHandle = gShopline.handle;
    var _productURL = decodeURIComponent(window.location.pathname).split('/');
    var gProductHandle = _productURL[_productURL.length - 1];
    function _initStyle() {
        logger.log('init style');
        return new Promise(function (resolve) {
            if (!document.head.querySelector(".".concat(constant_1.SF_HELLO_WEEK_STYLE))) {
                var helloWeekCss = (0, color_1.createHelloWeekColor)(primary, secondary, activeColor);
                var el = document.createElement('style');
                el.classList.add(constant_1.SF_HELLO_WEEK_STYLE);
                el.innerHTML = helloWeekCss;
                document.head.appendChild(el);
            }
            resolve('');
        });
    }
    function getProduct() {
        return fetcher("https://".concat(gShopHandle, ".myshopline.com/api/product/products.json?handle=").concat(gProductHandle)).then(function (res) { return res.products[0]; });
    }
    function initBooking() {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = exports.ctx;
                        return [4, getProduct()];
                    case 1:
                        _a.gProduct = _b.sent();
                        logger.log('product: ', exports.ctx.gProduct);
                        if (!exports.ctx.gProduct) {
                            throw new Error('Failed to find current product: ');
                        }
                        return [2];
                }
            });
        });
    }
    function injectDep() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger.log('injectDep...');
                        _initStyle();
                        if (!!$) return [3, 2];
                        return [4, (0, utils_1.loadScript)('https://code.jquery.com/jquery-3.6.0.min.js', 'sf-jquery', {
                                crossOrigin: 'anonymous',
                                integrity: 'sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=',
                                async: true,
                            })];
                    case 1:
                        _a.sent();
                        $ = window.$;
                        _a.label = 2;
                    case 2: return [2];
                }
            });
        });
    }
    function resetEl() {
        var slBtns = document.querySelector(".".concat(constant_1.SL_BTNS));
        var _position = slBtns.style.position;
        slBtns.classList.add(constant_1.SF_BTNS);
        var slAddToCartBtn = slBtns.querySelector(".".concat(constant_1.SL_ADD_TO_CARTS));
        var slBuyNowBtn = slBtns.querySelector(".".concat(constant_1.SL_BUY_NOW));
        slAddToCartBtn.classList.add(constant_1.SF_ADD_TO_CART_CLASSES);
        slBuyNowBtn.classList.add(constant_1.SF_SELECT_BOOKING_DATE_CLASSES);
        var sfAddToCartBtn = slAddToCartBtn.cloneNode(true);
        var sfSelectDateBtn = slBuyNowBtn.cloneNode(true);
        sfAddToCartBtn.textContent = translation.add_to_cart;
        sfSelectDateBtn.textContent = translation.select_booking_date;
        slAddToCartBtn.replaceWith(sfSelectDateBtn);
        slBuyNowBtn.replaceWith(sfAddToCartBtn);
    }
    function initEvent() {
        var _this = this;
        gEventBus.on('Product::SkuChanged', function (_a) {
            var data = _a.data;
            exports.ctx.gCurrentSku = data;
            logger.log('change sku: ', exports.ctx.gCurrentSku);
        });
        var sfBtns = document.querySelector(".".concat(constant_1.SF_BTNS));
        var sfAddToCartBtn = sfBtns.querySelector(".".concat(constant_1.SF_ADD_TO_CART_CLASSES));
        var sfSelectDateBtn = sfBtns.querySelector(".".concat(constant_1.SF_SELECT_BOOKING_DATE_CLASSES));
        var _a = (0, use_loading_1.default)(), isSelectedLoading = _a.isLoading, runSelect = _a.run;
        var _b = (0, use_loading_1.default)(), isAddingToCartLoading = _b.isLoading, runAddToCart = _b.run;
        sfSelectDateBtn.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
            var sku, scheduleData, days, _a;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        logger.log('click select booking btn.. ');
                        if (exports.ctx.gCurrentCalendar) {
                            exports.ctx.gCurrentCalendar.destroy();
                            sfSelectDateBtn.innerHTML = translation.select_booking_date;
                            exports.ctx.gCurrentCalendar = null;
                            return [2];
                        }
                        sku = (_b = exports.ctx.gCurrentSku) === null || _b === void 0 ? void 0 : _b.skuSeq;
                        if (!sku) {
                            alert(translation.please_select_a_sku_first);
                            return [2];
                        }
                        return [4, fetcher(makeUrl('https://api.shopflex.io/reserve/sku/datePlanList', {
                                platformProductId: exports.ctx.gProduct.id,
                                platformVariantId: sku,
                            })).then(function (res) {
                                if (res.code === 200)
                                    return res.data;
                                return Promise.reject(new Error("Failed to fetch schedule data, platformProductId = ".concat(exports.ctx.gProduct.id, ", platformVariantId = ").concat(sku)));
                            })];
                    case 1:
                        scheduleData = _c.sent();
                        logger.log('scheduleData: ', scheduleData);
                        exports.ctx.gCurrentSchedule = scheduleData;
                        days = Object.keys(exports.ctx.gCurrentSchedule || {});
                        _a = exports.ctx;
                        return [4, (0, utils_1.createCalendar)(function (calendarEl) {
                                sfBtns.insertBefore(calendarEl, sfAddToCartBtn);
                            }, {
                                daysHighlight: [
                                    {
                                        days: days,
                                    },
                                ],
                                onSelect: function () {
                                    var calendar = exports.ctx.gCurrentCalendar;
                                    console.log(calendar.getDaySelected());
                                },
                            })];
                    case 2:
                        _a.gCurrentCalendar = _c.sent();
                        sfSelectDateBtn.innerHTML = translation.hidden;
                        return [2];
                }
            });
        }); });
        sfAddToCartBtn.addEventListener('click', function () {
            logger.log('click add to cart btn');
        });
    }
    function main() {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4, initBooking()];
                    case 1:
                        _a.sent();
                        return [4, injectDep()];
                    case 2:
                        _a.sent();
                        return [4, injectDep()];
                    case 3:
                        _a.sent();
                        return [4, resetEl()];
                    case 4:
                        _a.sent();
                        return [4, initEvent()];
                    case 5:
                        _a.sent();
                        return [3, 7];
                    case 6:
                        err_1 = _a.sent();
                        logger.warn('booking error with ', err_1);
                        return [3, 7];
                    case 7: return [2];
                }
            });
        });
    }
    main();
});
