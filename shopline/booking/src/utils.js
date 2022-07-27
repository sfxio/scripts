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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./constant"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.findVariant = exports.createCalendar = exports.delay = exports.loadScript = void 0;
    var constant_1 = require("./constant");
    function loadScript(src, id, options) {
        if (options === void 0) { options = {}; }
        return new Promise(function (resolve, reject) {
            var el = document.querySelector("script#".concat(id));
            if (el)
                return resolve('ok');
            var script = document.createElement('script');
            script.src = src;
            script.id = id;
            Object.keys(options).forEach(function (key) {
                script[key] = options[key];
            });
            document.body.appendChild(script);
            script.addEventListener('load', function () { return resolve('ok'); });
            script.addEventListener('error', function (err) { return reject(err); });
        });
    }
    exports.loadScript = loadScript;
    var delay = function (timeout) {
        if (timeout === void 0) { timeout = 200; }
        return new Promise(function (resolve) {
            setTimeout(resolve, timeout);
        });
    };
    exports.delay = delay;
    var GHelloWeek = window.HelloWeek;
    var createCalendar = function (insert, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(void 0, void 0, void 0, function () {
            var calendarEl, calendar, _destroy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        calendarEl = document.createElement('div');
                        calendarEl.style.transition = 'all 200ms';
                        calendarEl.style.opacity = '0';
                        calendarEl.classList.add(constant_1.SF_CALENDAR_CLASSES);
                        return [4, insert(calendarEl)];
                    case 1:
                        _a.sent();
                        return [4, (0, exports.delay)()];
                    case 2:
                        _a.sent();
                        calendarEl.style.opacity = '1';
                        calendar = new GHelloWeek(__assign({ selector: ".".concat(constant_1.SF_CALENDAR_CLASSES), format: 'YYYY-MM-DD' }, options));
                        _destroy = calendar.destroy;
                        calendar.destroy = function () {
                            var args = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                args[_i] = arguments[_i];
                            }
                            return __awaiter(this, void 0, void 0, function () {
                                var el;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            el = document.querySelector(".".concat(constant_1.SF_CALENDAR_CLASSES));
                                            if (!el) return [3, 2];
                                            el.style.opacity = '0';
                                            return [4, (0, exports.delay)(200)];
                                        case 1:
                                            _a.sent();
                                            el.remove();
                                            _destroy.apply(this, args);
                                            _a.label = 2;
                                        case 2: return [2];
                                    }
                                });
                            });
                        };
                        return [2, calendar];
                }
            });
        });
    };
    exports.createCalendar = createCalendar;
    function findVariant(product, skuSeq) {
        if (!product || !product.variants)
            return null;
        return product.variants.find(function (item) { return item.id === skuSeq; });
    }
    exports.findVariant = findVariant;
});
