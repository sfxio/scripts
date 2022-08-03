(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.SfBooking = {}));
})(this, (function (exports) { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = _objectWithoutPropertiesLoose(source, excluded);

    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  var _excluded = ["attributes"];

  /* eslint-disable */
  // @ts-nocheck
  // reference: https://hello-week.com/#/
  // ../resources/hell-week-master: 源码修改后的代码
  !function (t) {

    var e = 'hello-week',
        s = 'day',
        a = 'month',
        n = 'navigation',
        i = 'next',
        r = 'period',
        o = 'prev',
        l = 'rtl',
        h = 'week',
        d = 'is-begin-range',
        c = 'is-disabled',
        g = 'is-end-range',
        u = 'is-highlight',
        y = 'is-selected',
        f = 'is-range',
        p = 'is-today',
        b = 'is-weekend',
        D = {
      FRIDAY: 5,
      MONDAY: 1,
      SATURDAY: 6,
      SUNDAY: 0,
      THURSDAY: 4,
      TUESDAY: 2,
      WEDNESDAY: 3
    },
        S = 'margin-right',
        m = 'margin-left';

    function v(t) {
      return null != t;
    }

    function M(t) {
      return null !== t && 'object' == _typeof(t);
    }

    function k(t) {
      return null !== t && Array.isArray(t);
    }

    function Y(t) {
      return 'string' == typeof t;
    }

    function O(t, e, s) {
      return t.setAttribute(e, s);
    }

    function R(t, e) {
      return t.classList.add(e);
    }

    function w(t, e) {
      return t.classList.remove(e);
    }

    function A(t, e) {
      return v(e) ? e.querySelector(".".concat(t)) : document.querySelector(".".concat(t));
    }

    function H(t, e, s) {
      for (var _i = 0, _Object$keys = Object.keys(t.attributes[s]); _i < _Object$keys.length; _i++) {
        var _a = _Object$keys[_i];
        O(e, "data-".concat(_a), t.attributes[s][_a]);
      }
    }

    function T(t, e, s) {
      Y(t.attributes[s]) ? e.className = t.attributes[s] : k(t.attributes[s]) && t.attributes[s].forEach(function (t) {
        R(e, t);
      });
    }

    function x(t, e, s) {
      if (Y(t.attributes[s])) e.style = t.attributes[s];else if (M(t.attributes[s])) for (var _i2 = 0, _Object$keys2 = Object.keys(t.attributes[s]); _i2 < _Object$keys2.length; _i2++) {
        var _a2 = _Object$keys2[_i2];
        e.style[_a2] = t.attributes[s][_a2];
      }
    }

    function C(t, e) {
      var _ref;

      var a = {
        nodeName: t
      };

      for (var _len = arguments.length, s = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        s[_key - 2] = arguments[_key];
      }

      return e && (a.attributes = e), s.length && (a.children = (_ref = []).concat.apply(_ref, s)), a;
    }

    function F(t, e) {
      if (t.split) return document.createTextNode(t);
      var s = document.createElement(t.nodeName);
      return v(t.attributes) && function (t, e) {
        for (var _i3 = 0, _Object$keys3 = Object.keys(t.attributes); _i3 < _Object$keys3.length; _i3++) {
          var _s = _Object$keys3[_i3];
          'class' === _s ? T(t, e, _s) : 'style' === _s ? x(t, e, _s) : 'data' === _s ? H(t, e, _s) : O(e, _s, t.attributes[_s]);
        }
      }(t, s), (t.children || []).forEach(function (t) {
        return s.appendChild(F(t));
      }), e ? e.appendChild(s) : s;
    }

    function N(t, e) {
      return Object.assign(t, e);
    }

    function L(t, e) {
      return Array.prototype.slice.call(t).indexOf(e) + 1;
    }

    function j(t) {
      var e = [];

      function s(t) {
        var s = [];

        var _iterator = _createForOfIteratorHelper(e),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _a3 = _step.value;
            e[_a3] === t ? t = null : s.push(e[_a3]);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        e = s;
      }

      return t = t || {}, {
        setState: function setState(s, a) {
          t = a ? s : N(N({}, t), s);
          var n = e;

          var _iterator2 = _createForOfIteratorHelper(n),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var _e = _step2.value;

              n[_e](t);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        },
        subscribe: function subscribe(t) {
          return e.push(t), function () {
            s(t);
          };
        },
        unsubscribe: s,
        getState: function getState() {
          return t;
        }
      };
    }

    var E = {
      store: j({
        selector: '.hello-week',
        lang: 'en',
        langFolder: './langs/',
        format: 'DD/MM/YYYY',
        monthShort: !1,
        weekShort: !0,
        defaultDate: null,
        minDate: null,
        maxDate: null,
        disableDaysOfWeek: null,
        timezoneOffset: new Date().getTimezoneOffset(),
        disableDates: null,
        weekStart: 0,
        daysSelected: null,
        daysHighlight: null,
        multiplePick: !1,
        disablePastDays: !1,
        todayHighlight: !0,
        range: !1,
        locked: !1,
        rtl: !1,
        nav: ['◀', '▶'],
        beforeLoad: function beforeLoad() {},
        onLoad: function onLoad() {},
        onNavigation: function onNavigation() {},
        onSelect: function onSelect(t) {
          return t;
        },
        beforeCreateDay: function beforeCreateDay(t) {
          return t;
        }
      }),
      set: function set(t) {
        this.store.setState(t);
      },
      get: function get() {
        return this.store.getState();
      }
    },
        W = {
      store: j({}),
      set: function set(t) {
        this.store.setState(t);
      },
      get: function get() {
        return this.store.getState();
      }
    };

    function U(t, e) {
      var s = v(t) ? new Date(t) : new Date();
      return e = e || s.getTimezoneOffset(), s.setTime(s.getTime() + 60 * e * 1e3), s;
    }

    function I(t, e) {
      var s = U(t, e);
      return a = s.getDate(), n = s.getMonth(), "".concat(s.getFullYear(), "-").concat(('0' + (n + 1)).slice(-2), "-").concat(('0' + a).slice(-2));
      var a, n;
    }

    function J(t, e, s) {
      var _E$get = E.get(),
          a = _E$get.format,
          _W$get = W.get(),
          n = _W$get.months,
          i = _W$get.monthsShort,
          r = U(t, s);

      return e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = e || a).replace('dd', r.getDate().toString())).replace('DD', (r.getDate() > 9 ? r.getDate() : '0' + r.getDate()).toString())).replace('mm', (r.getMonth() + 1).toString())).replace('MMM', n[r.getMonth()])).replace('MM', (r.getMonth() + 1 > 9 ? r.getMonth() + 1 : '0' + (r.getMonth() + 1)).toString())).replace('mmm', i[r.getMonth()])).replace('yyyy', r.getFullYear().toString())).replace('YYYY', r.getFullYear().toString())).replace('YY', r.getFullYear().toString().substring(2))).replace('yy', r.getFullYear().toString().substring(2));
    }

    function P(t) {
      var e = new Date(t);
      return Number('' + e.getFullYear() + (e.getMonth() + 1) + (e.getDate() > 9 ? e.getDate() : '0' + e.getDate()).toString());
    }

    function $(t, e) {
      return P(t) > P(e);
    }

    function q(t, e) {
      return P(t) < P(e);
    }

    function z(t, e) {
      return P(t) === P(e);
    }

    function _(t, e) {
      return z(t, e) || $(t, e);
    }

    function B(t, e) {
      return z(t, e) || q(t, e);
    }

    function G(t) {
      return v(t) ? new Date(t) : new Date();
    }

    function K(t) {
      var e = G(t);
      return I(e.setDate(e.getDate() - 1));
    }

    function Q(t) {
      var e = G(t);
      return I(e.setDate(e.getDate() + 1));
    }

    var V = /*#__PURE__*/function () {
      function V(t) {
        var _this = this;

        _classCallCheck(this, V);

        _defineProperty(this, "options", void 0);

        _defineProperty(this, "langs", void 0);

        _defineProperty(this, "selector", void 0);

        _defineProperty(this, "daysOfMonth", void 0);

        _defineProperty(this, "todayDate", I(new Date()));

        _defineProperty(this, "date", new Date());

        _defineProperty(this, "defaultDate", void 0);

        _defineProperty(this, "calendar", void 0);

        _defineProperty(this, "days", void 0);

        _defineProperty(this, "isRTL", void 0);

        _defineProperty(this, "daysHighlight", void 0);

        _defineProperty(this, "intervalRange", {});

        _defineProperty(this, "daysSelected", []);

        _defineProperty(this, "lastSelectedDay", void 0);

        this.langs = W, this.options = E, this.options.set(t);

        var _ref2 = function (t, s) {
          var d = {};
          if (!v(t.selector)) throw new Error('You need to specify a selector!');
          return Y(t.selector) ? d.selector = t.selector ? document.querySelector(t.selector) : t.selector : d.selector = t.selector, v(d.selector) ? t.selector !== e && R(d.selector, e) : d.selector = F(C('div', {
            "class": [t.selector, e]
          })), d.calendar = {}, d.calendar.navigation = A(n, d.selector), v(d.calendar.navigation) || (d.calendar.navigation = F(C('div', {
            "class": n
          }), d.selector)), v(t.nav[0]) && (d.calendar.prevMonth = F(C('div', {
            "class": o
          }, t.nav[0]), d.calendar.navigation), d.calendar.prevMonth.addEventListener('click', function () {
            return s.prev.cb();
          })), d.calendar.period = A(r, d.selector), v(d.calendar.period) || (d.calendar.period = F(C('div', {
            "class": r
          }), d.calendar.navigation)), v(t.nav[1]) && (d.calendar.nextMonth = F(C('div', {
            "class": i
          }, t.nav[1]), d.calendar.navigation), d.calendar.nextMonth.addEventListener('click', function () {
            return s.next.cb();
          })), d.calendar.week = A(h, d.selector), v(d.calendar.week) || (d.calendar.week = F(C('div', {
            "class": h
          }), d.selector)), d.calendar.month = A(a, d.selector), v(d.calendar.month) || (d.calendar.month = F(C('div', {
            "class": a
          }), d.selector)), t.rtl && (R(d.calendar.week, l), R(d.calendar.month, l)), d;
        }(this.options.get(), {
          prev: {
            cb: function cb() {
              return _this.prev();
            }
          },
          next: {
            cb: function cb() {
              return _this.next();
            }
          }
        }),
            s = _ref2.calendar,
            d = _ref2.selector;

        this.selector = d, this.calendar = s, this.beforeCreate();
      }

      _createClass(V, [{
        key: "destroy",
        value: function destroy() {
          this.removeStatesClass(), this.selector.remove();
        }
      }, {
        key: "prev",
        value: function prev() {
          var _this$options$get = this.options.get(),
              t = _this$options$get.onNavigation,
              e = this.date.getMonth() - 1;

          this.date.setMonth(e), this.update(), t();
        }
      }, {
        key: "next",
        value: function next() {
          var _this$options$get2 = this.options.get(),
              t = _this$options$get2.onNavigation,
              e = this.date.getMonth() + 1;

          this.date.setMonth(e), this.update(), t();
        }
      }, {
        key: "prevYear",
        value: function prevYear() {
          var _this$options$get3 = this.options.get(),
              t = _this$options$get3.onNavigation,
              e = this.date.getFullYear() - 1;

          this.date.setFullYear(e), this.update(), t();
        }
      }, {
        key: "nextYear",
        value: function nextYear() {
          var _this$options$get4 = this.options.get(),
              t = _this$options$get4.onNavigation,
              e = this.date.getFullYear() + 1;

          this.date.setFullYear(e), this.update(), t();
        }
      }, {
        key: "update",
        value: function update() {
          this.clearCalendar(), this.mounted();
        }
      }, {
        key: "goToDate",
        value: function goToDate() {
          var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.todayDate;
          this.date = new Date(t), this.date.setDate(1), this.update();
        }
      }, {
        key: "getDaySelected",
        value: function getDaySelected() {
          var _this$options$get5 = this.options.get(),
              t = _this$options$get5.format;

          return this.daysSelected.sort(function (t, e) {
            return P(t) - P(e);
          }).map(function (e) {
            return J(e, t);
          });
        }
      }, {
        key: "getLastDaySelected",
        value: function getLastDaySelected() {
          return this.lastSelectedDay;
        }
      }, {
        key: "getDaysHighlight",
        value: function getDaysHighlight() {
          return this.daysHighlight;
        }
      }, {
        key: "getMonth",
        value: function getMonth() {
          return this.date.getMonth() + 1;
        }
      }, {
        key: "getYear",
        value: function getYear() {
          return this.date.getFullYear();
        }
      }, {
        key: "setOptions",
        value: function setOptions(t, e) {
          M(t) && this.options.set(t), 'function' == typeof e && this.options.set(e(this.options.get())), this.update();
        }
      }, {
        key: "setDaysHighlight",
        value: function setDaysHighlight(t) {
          this.daysHighlight = [].concat(_toConsumableArray(this.daysHighlight), _toConsumableArray(t)), this.update();
        }
      }, {
        key: "setIntervalRange",
        value: function setIntervalRange(t) {
          var _this$options$get6 = this.options.get(),
              e = _this$options$get6.range;

          if (e && t && k(t)) {
            var _t = _slicedToArray(t, 2),
                _e2 = _t[0],
                _s2 = _t[1];

            this.intervalRange = {
              begin: _e2,
              end: _s2
            };
          }
        }
      }, {
        key: "setMinDate",
        value: function setMinDate(t) {
          this.options.set({
            minDate: K(t)
          });
        }
      }, {
        key: "setMaxDate",
        value: function setMaxDate(t) {
          this.options.set({
            maxDate: Q(t)
          });
        }
      }, {
        key: "beforeCreate",
        value: function beforeCreate() {
          var _this2 = this;

          var _this$options$get7 = this.options.get(),
              t = _this$options$get7.rtl;

          this.isRTL = t ? S : m, Promise.resolve({
            "default": {
              days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
              daysShort: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
              months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
              monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            }
          }).then(function (t) {
            return t;
          }).then(function (t) {
            _this2.langs.set(t["default"]);
          }).then(function () {
            return _this2.beforeMount();
          });
        }
      }, {
        key: "beforeMount",
        value: function beforeMount() {
          var _this$options$get8 = this.options.get(),
              t = _this$options$get8.daysHighlight,
              e = _this$options$get8.daysSelected,
              s = _this$options$get8.defaultDate,
              a = _this$options$get8.timezoneOffset,
              n = _this$options$get8.minDate,
              i = _this$options$get8.maxDate,
              r = _this$options$get8.beforeLoad,
              o = _this$options$get8.onLoad;

          this.daysHighlight = t || [], this.daysSelected = e || [], r(), s && (this.date = U(s, a), this.defaultDate = U(s, a), this.defaultDate.setDate(this.defaultDate.getDate())), this.date.setDate(1), n && this.setMinDate(n), i && this.setMaxDate(i), this.mounted(), o();
        }
      }, {
        key: "selectDay",
        value: function selectDay(t) {
          var _this$options$get9 = this.options.get(),
              e = _this$options$get9.range;

          this.daysOfMonth = this.selector.querySelectorAll('.' + a + ' .' + s);

          for (var _i4 = 0, _Object$keys4 = Object.keys(this.daysOfMonth); _i4 < _Object$keys4.length; _i4++) {
            var _s3 = _Object$keys4[_i4];
            this.handleClickInteraction(this.daysOfMonth[_s3], t), e && this.handleMouseInteraction(this.daysOfMonth[_s3]);
          }
        }
      }, {
        key: "handleClickInteraction",
        value: function handleClickInteraction(t, e) {
          var _this3 = this;

          var _this$options$get10 = this.options.get(),
              s = _this$options$get10.range,
              a = _this$options$get10.multiplePick,
              n = _this$options$get10.onSelect;

          t.addEventListener('click', function (t) {
            var i = L(_this3.daysOfMonth, t.target);
            var r, o;
            _this3.days[i].locked || (_this3.lastSelectedDay = _this3.days[i].date, s || (a ? (_this3.days[i].date && (_this3.daysSelected = _this3.daysSelected.filter(function (t) {
              return P(t) !== P(_this3.lastSelectedDay);
            })), _this3.days[i].isSelected || _this3.daysSelected.push(_this3.lastSelectedDay)) : (_this3.days[i].locked || _this3.removeStatesClass(), _this3.daysSelected = [], _this3.daysSelected.push(_this3.lastSelectedDay))), r = t.target, o = y, r.classList.toggle(o), _this3.days[i].isSelected = !_this3.days[i].isSelected, s && (_this3.intervalRange.begin && _this3.intervalRange.end && (_this3.intervalRange = {}, _this3.removeStatesClass()), _this3.intervalRange.begin && !_this3.intervalRange.end && (_this3.intervalRange.end = _this3.days[i].date, _this3.daysSelected = function (t, e) {
              var s = [];
              var a = t;

              var n = function n(t) {
                var e = new Date(this.valueOf());
                return e.setDate(e.getDate() + t), e.getTime();
              };

              for (; a <= e;) {
                s.push(J(a)), a = n.call(a, 1);
              }

              return s;
            }(_this3.intervalRange.begin, _this3.intervalRange.end), R(t.target, g), _this3.intervalRange.begin > _this3.intervalRange.end && (_this3.intervalRange = {}, _this3.removeStatesClass())), _this3.intervalRange.begin || (_this3.intervalRange.begin = _this3.days[i].date), R(t.target, y)), n(_this3.days[i]), e && e(_this3.days[i]));
          });
        }
      }, {
        key: "handleMouseInteraction",
        value: function handleMouseInteraction(t) {
          var _this4 = this;

          t.addEventListener('mouseover', function (t) {
            var e = L(_this4.daysOfMonth, t.target);

            if (!(!_this4.intervalRange.begin || _this4.intervalRange.begin && _this4.intervalRange.end)) {
              _this4.removeStatesClass();

              for (var _t2 = 1; _t2 <= Object.keys(_this4.days).length; _t2++) {
                _this4.days[_t2].isSelected = !1, _(_this4.days[e].date, _this4.intervalRange.begin) && _(_this4.days[_t2].date, _this4.intervalRange.begin) && B(_this4.days[_t2].date, _this4.days[e].date) && (R(_this4.days[_t2].element, y), R(_this4.days[_t2].element, f), z(_this4.days[_t2].date, _this4.intervalRange.begin) && R(_this4.days[_t2].element, d));
              }
            }
          });
        }
      }, {
        key: "creatWeek",
        value: function creatWeek(t) {
          F(C('span', {
            "class": s
          }, t), this.calendar.week);
        }
      }, {
        key: "createMonth",
        value: function createMonth() {
          var t = this.date.getMonth();

          for (; this.date.getMonth() === t;) {
            this.createDay(this.date), this.date.setDate(this.date.getDate() + 1);
          }

          this.date.setMonth(this.date.getMonth() - 1), this.selectDay();
        }
      }, {
        key: "createDay",
        value: function createDay(t) {
          var e = t.getDate(),
              a = t.getDay();
          var n = {
            day: e,
            date: I(t),
            isWeekend: !1,
            locked: !1,
            isToday: !1,
            isRange: !1,
            isSelected: !1,
            isHighlight: !1,
            events: void 0,
            attributes: {
              "class": [s],
              style: {}
            },
            node: void 0,
            element: void 0
          };

          var _this$options$get11 = this.options.get(),
              i = _this$options$get11.locked,
              r = _this$options$get11.disableDaysOfWeek,
              o = _this$options$get11.disablePastDays,
              l = _this$options$get11.minDate,
              h = _this$options$get11.maxDate,
              u = _this$options$get11.disableDates,
              S = _this$options$get11.todayHighlight,
              m = _this$options$get11.weekStart,
              v = _this$options$get11.beforeCreateDay;

          this.days = this.days || {}, a !== D.SUNDAY && a !== D.SATURDAY || (n.attributes["class"].push(b), n.isWeekend = !0), (i || r && r.includes(a) || o && B(this.date, this.defaultDate) || l && _(l, n.date) || h && B(h, n.date)) && (n.attributes["class"].push(c), n.locked = !0), u && this.disabledDays(n), z(this.todayDate, n.date) && (n.isToday = !0, S && n.attributes["class"].push(p)), this.daysSelected.find(function (t) {
            z(t, n.date) && (n.attributes["class"].push(y), n.isSelected = !0);
          }), function (t, e, s) {
            return $(s, t) && q(s, e);
          }(this.intervalRange.begin, this.intervalRange.end, n.date) && (n.attributes["class"].push(f), n.isRange = !0), z(n.date, this.intervalRange.begin) && n.attributes["class"].push(d), z(n.date, this.intervalRange.end) && n.attributes["class"].push(g), this.daysHighlight && this.highlightDays(n), 1 === n.day && (n.attributes.style[this.isRTL] = m === D.SUNDAY ? a * (100 / Object.keys(D).length) + '%' : a === D.SUNDAY ? (Object.keys(D).length - m) * (100 / Object.keys(D).length) + '%' : (a - 1) * (100 / Object.keys(D).length) + '%'), n.node = C('div', n.attributes, n.day.toString()), n = v(n), n.element = F(n.node, this.calendar.month), this.days[n.day] = n;
        }
      }, {
        key: "disabledDays",
        value: function disabledDays(t) {
          var _this$options$get12 = this.options.get(),
              e = _this$options$get12.disableDates;

          k(e[0]) ? e.map(function (e) {
            _(t.date, e[0]) && B(t.date, e[1]) && (t.attributes["class"].push(c), t.locked = !0);
          }) : e.map(function (e) {
            z(t.date, e) && (t.attributes["class"].push(c), t.locked = !0);
          });
        }
      }, {
        key: "highlightDays",
        value: function highlightDays(t) {
          var _this5 = this;

          var _loop = function _loop(_e3) {
            _this5.daysHighlight[_e3].days[0] instanceof Array ? _this5.daysHighlight[_e3].days.map(function (s) {
              _(t.date, s[0]) && B(t.date, s[1]) && _this5.computedAttributes(_e3, t);
            }) : _this5.daysHighlight[_e3].days.map(function (s) {
              z(t.date, s) && _this5.computedAttributes(_e3, t);
            });
          };

          for (var _e3 in this.daysHighlight) {
            _loop(_e3);
          }
        }
      }, {
        key: "computedAttributes",
        value: function computedAttributes(t, e) {
          var _this$daysHighlight$t = this.daysHighlight[t],
              s = _this$daysHighlight$t.attributes,
              a = _objectWithoutProperties(_this$daysHighlight$t, _excluded);

          delete a.days, e = N(e, a);

          for (var _t3 in s) {
            e.attributes[_t3] && s[_t3] ? e.attributes[_t3] = N(e.attributes[_t3], s[_t3]) : s[_t3] && (e.attributes[_t3] = s[_t3]);
          }

          e.attributes["class"].push(u), e.isHighlight = !0;
        }
      }, {
        key: "monthsAsString",
        value: function monthsAsString(t) {
          var _this$options$get13 = this.options.get(),
              e = _this$options$get13.monthShort,
              _this$langs$get = this.langs.get(),
              s = _this$langs$get.monthsShort,
              a = _this$langs$get.months;

          return e ? s[t] : a[t];
        }
      }, {
        key: "weekAsString",
        value: function weekAsString(t) {
          var _this$options$get14 = this.options.get(),
              e = _this$options$get14.weekShort,
              _this$langs$get2 = this.langs.get(),
              s = _this$langs$get2.daysShort,
              a = _this$langs$get2.days;

          return e ? s[t] : a[t];
        }
      }, {
        key: "mounted",
        value: function mounted() {
          this.calendar.period && (this.calendar.period.innerHTML = this.monthsAsString(this.date.getMonth()) + ' ' + this.date.getFullYear());

          var t = [],
              _this$options$get15 = this.options.get(),
              e = _this$options$get15.weekStart,
              _this$langs$get3 = this.langs.get(),
              s = _this$langs$get3.daysShort;

          this.calendar.week.textContent = '';

          for (var _a4 = e; _a4 < s.length; _a4++) {
            t.push(_a4);
          }

          for (var _s4 = 0; _s4 < e; _s4++) {
            t.push(_s4);
          }

          for (var _i5 = 0, _t4 = t; _i5 < _t4.length; _i5++) {
            var _e4 = _t4[_i5];
            this.creatWeek(this.weekAsString(_e4));
          }

          this.createMonth();
        }
      }, {
        key: "clearCalendar",
        value: function clearCalendar() {
          this.calendar.month.textContent = '';
        }
      }, {
        key: "removeStatesClass",
        value: function removeStatesClass() {
          for (var _i6 = 0, _Object$keys5 = Object.keys(this.daysOfMonth); _i6 < _Object$keys5.length; _i6++) {
            var _t5 = _Object$keys5[_i6];
            w(this.daysOfMonth[_t5], y), w(this.daysOfMonth[_t5], f), w(this.daysOfMonth[_t5], d), w(this.daysOfMonth[_t5], g), this.days[+_t5 + 1].isSelected = !1;
          }
        }
      }]);

      return V;
    }();

    var X = V;
    window.HelloWeek = X, t.HelloWeek = X, t.createElement = C, t["default"] = V, t.el = C, t.render = F, Object.defineProperty(t, '__esModule', {
      value: !0
    });
  }({});

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var dayjs_min = createCommonjsModule(function (module, exports) {
    !function (t, e) {
      module.exports = e() ;
    }(commonjsGlobal, function () {

      var t = 1e3,
          e = 6e4,
          n = 36e5,
          r = "millisecond",
          i = "second",
          s = "minute",
          u = "hour",
          a = "day",
          o = "week",
          f = "month",
          h = "quarter",
          c = "year",
          d = "date",
          $ = "Invalid Date",
          l = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
          y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
          M = {
        name: "en",
        weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_")
      },
          m = function (t, e, n) {
        var r = String(t);
        return !r || r.length >= e ? t : "" + Array(e + 1 - r.length).join(n) + t;
      },
          g = {
        s: m,
        z: function (t) {
          var e = -t.utcOffset(),
              n = Math.abs(e),
              r = Math.floor(n / 60),
              i = n % 60;
          return (e <= 0 ? "+" : "-") + m(r, 2, "0") + ":" + m(i, 2, "0");
        },
        m: function t(e, n) {
          if (e.date() < n.date()) return -t(n, e);
          var r = 12 * (n.year() - e.year()) + (n.month() - e.month()),
              i = e.clone().add(r, f),
              s = n - i < 0,
              u = e.clone().add(r + (s ? -1 : 1), f);
          return +(-(r + (n - i) / (s ? i - u : u - i)) || 0);
        },
        a: function (t) {
          return t < 0 ? Math.ceil(t) || 0 : Math.floor(t);
        },
        p: function (t) {
          return {
            M: f,
            y: c,
            w: o,
            d: a,
            D: d,
            h: u,
            m: s,
            s: i,
            ms: r,
            Q: h
          }[t] || String(t || "").toLowerCase().replace(/s$/, "");
        },
        u: function (t) {
          return void 0 === t;
        }
      },
          v = "en",
          D = {};

      D[v] = M;

      var p = function (t) {
        return t instanceof _;
      },
          S = function t(e, n, r) {
        var i;
        if (!e) return v;

        if ("string" == typeof e) {
          var s = e.toLowerCase();
          D[s] && (i = s), n && (D[s] = n, i = s);
          var u = e.split("-");
          if (!i && u.length > 1) return t(u[0]);
        } else {
          var a = e.name;
          D[a] = e, i = a;
        }

        return !r && i && (v = i), i || !r && v;
      },
          w = function (t, e) {
        if (p(t)) return t.clone();
        var n = "object" == typeof e ? e : {};
        return n.date = t, n.args = arguments, new _(n);
      },
          O = g;

      O.l = S, O.i = p, O.w = function (t, e) {
        return w(t, {
          locale: e.$L,
          utc: e.$u,
          x: e.$x,
          $offset: e.$offset
        });
      };

      var _ = function () {
        function M(t) {
          this.$L = S(t.locale, null, !0), this.parse(t);
        }

        var m = M.prototype;
        return m.parse = function (t) {
          this.$d = function (t) {
            var e = t.date,
                n = t.utc;
            if (null === e) return new Date(NaN);
            if (O.u(e)) return new Date();
            if (e instanceof Date) return new Date(e);

            if ("string" == typeof e && !/Z$/i.test(e)) {
              var r = e.match(l);

              if (r) {
                var i = r[2] - 1 || 0,
                    s = (r[7] || "0").substring(0, 3);
                return n ? new Date(Date.UTC(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, s)) : new Date(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, s);
              }
            }

            return new Date(e);
          }(t), this.$x = t.x || {}, this.init();
        }, m.init = function () {
          var t = this.$d;
          this.$y = t.getFullYear(), this.$M = t.getMonth(), this.$D = t.getDate(), this.$W = t.getDay(), this.$H = t.getHours(), this.$m = t.getMinutes(), this.$s = t.getSeconds(), this.$ms = t.getMilliseconds();
        }, m.$utils = function () {
          return O;
        }, m.isValid = function () {
          return !(this.$d.toString() === $);
        }, m.isSame = function (t, e) {
          var n = w(t);
          return this.startOf(e) <= n && n <= this.endOf(e);
        }, m.isAfter = function (t, e) {
          return w(t) < this.startOf(e);
        }, m.isBefore = function (t, e) {
          return this.endOf(e) < w(t);
        }, m.$g = function (t, e, n) {
          return O.u(t) ? this[e] : this.set(n, t);
        }, m.unix = function () {
          return Math.floor(this.valueOf() / 1e3);
        }, m.valueOf = function () {
          return this.$d.getTime();
        }, m.startOf = function (t, e) {
          var n = this,
              r = !!O.u(e) || e,
              h = O.p(t),
              $ = function (t, e) {
            var i = O.w(n.$u ? Date.UTC(n.$y, e, t) : new Date(n.$y, e, t), n);
            return r ? i : i.endOf(a);
          },
              l = function (t, e) {
            return O.w(n.toDate()[t].apply(n.toDate("s"), (r ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e)), n);
          },
              y = this.$W,
              M = this.$M,
              m = this.$D,
              g = "set" + (this.$u ? "UTC" : "");

          switch (h) {
            case c:
              return r ? $(1, 0) : $(31, 11);

            case f:
              return r ? $(1, M) : $(0, M + 1);

            case o:
              var v = this.$locale().weekStart || 0,
                  D = (y < v ? y + 7 : y) - v;
              return $(r ? m - D : m + (6 - D), M);

            case a:
            case d:
              return l(g + "Hours", 0);

            case u:
              return l(g + "Minutes", 1);

            case s:
              return l(g + "Seconds", 2);

            case i:
              return l(g + "Milliseconds", 3);

            default:
              return this.clone();
          }
        }, m.endOf = function (t) {
          return this.startOf(t, !1);
        }, m.$set = function (t, e) {
          var n,
              o = O.p(t),
              h = "set" + (this.$u ? "UTC" : ""),
              $ = (n = {}, n[a] = h + "Date", n[d] = h + "Date", n[f] = h + "Month", n[c] = h + "FullYear", n[u] = h + "Hours", n[s] = h + "Minutes", n[i] = h + "Seconds", n[r] = h + "Milliseconds", n)[o],
              l = o === a ? this.$D + (e - this.$W) : e;

          if (o === f || o === c) {
            var y = this.clone().set(d, 1);
            y.$d[$](l), y.init(), this.$d = y.set(d, Math.min(this.$D, y.daysInMonth())).$d;
          } else $ && this.$d[$](l);

          return this.init(), this;
        }, m.set = function (t, e) {
          return this.clone().$set(t, e);
        }, m.get = function (t) {
          return this[O.p(t)]();
        }, m.add = function (r, h) {
          var d,
              $ = this;
          r = Number(r);

          var l = O.p(h),
              y = function (t) {
            var e = w($);
            return O.w(e.date(e.date() + Math.round(t * r)), $);
          };

          if (l === f) return this.set(f, this.$M + r);
          if (l === c) return this.set(c, this.$y + r);
          if (l === a) return y(1);
          if (l === o) return y(7);
          var M = (d = {}, d[s] = e, d[u] = n, d[i] = t, d)[l] || 1,
              m = this.$d.getTime() + r * M;
          return O.w(m, this);
        }, m.subtract = function (t, e) {
          return this.add(-1 * t, e);
        }, m.format = function (t) {
          var e = this,
              n = this.$locale();
          if (!this.isValid()) return n.invalidDate || $;

          var r = t || "YYYY-MM-DDTHH:mm:ssZ",
              i = O.z(this),
              s = this.$H,
              u = this.$m,
              a = this.$M,
              o = n.weekdays,
              f = n.months,
              h = function (t, n, i, s) {
            return t && (t[n] || t(e, r)) || i[n].slice(0, s);
          },
              c = function (t) {
            return O.s(s % 12 || 12, t, "0");
          },
              d = n.meridiem || function (t, e, n) {
            var r = t < 12 ? "AM" : "PM";
            return n ? r.toLowerCase() : r;
          },
              l = {
            YY: String(this.$y).slice(-2),
            YYYY: this.$y,
            M: a + 1,
            MM: O.s(a + 1, 2, "0"),
            MMM: h(n.monthsShort, a, f, 3),
            MMMM: h(f, a),
            D: this.$D,
            DD: O.s(this.$D, 2, "0"),
            d: String(this.$W),
            dd: h(n.weekdaysMin, this.$W, o, 2),
            ddd: h(n.weekdaysShort, this.$W, o, 3),
            dddd: o[this.$W],
            H: String(s),
            HH: O.s(s, 2, "0"),
            h: c(1),
            hh: c(2),
            a: d(s, u, !0),
            A: d(s, u, !1),
            m: String(u),
            mm: O.s(u, 2, "0"),
            s: String(this.$s),
            ss: O.s(this.$s, 2, "0"),
            SSS: O.s(this.$ms, 3, "0"),
            Z: i
          };

          return r.replace(y, function (t, e) {
            return e || l[t] || i.replace(":", "");
          });
        }, m.utcOffset = function () {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, m.diff = function (r, d, $) {
          var l,
              y = O.p(d),
              M = w(r),
              m = (M.utcOffset() - this.utcOffset()) * e,
              g = this - M,
              v = O.m(this, M);
          return v = (l = {}, l[c] = v / 12, l[f] = v, l[h] = v / 3, l[o] = (g - m) / 6048e5, l[a] = (g - m) / 864e5, l[u] = g / n, l[s] = g / e, l[i] = g / t, l)[y] || g, $ ? v : O.a(v);
        }, m.daysInMonth = function () {
          return this.endOf(f).$D;
        }, m.$locale = function () {
          return D[this.$L];
        }, m.locale = function (t, e) {
          if (!t) return this.$L;
          var n = this.clone(),
              r = S(t, e, !0);
          return r && (n.$L = r), n;
        }, m.clone = function () {
          return O.w(this.$d, this);
        }, m.toDate = function () {
          return new Date(this.valueOf());
        }, m.toJSON = function () {
          return this.isValid() ? this.toISOString() : null;
        }, m.toISOString = function () {
          return this.$d.toISOString();
        }, m.toString = function () {
          return this.$d.toUTCString();
        }, M;
      }(),
          T = _.prototype;

      return w.prototype = T, [["$ms", r], ["$s", i], ["$m", s], ["$H", u], ["$W", a], ["$M", f], ["$y", c], ["$D", d]].forEach(function (t) {
        T[t[1]] = function (e) {
          return this.$g(e, t[0], t[1]);
        };
      }), w.extend = function (t, e) {
        return t.$i || (t(e, _, w), t.$i = !0), w;
      }, w.locale = S, w.isDayjs = p, w.unix = function (t) {
        return w(1e3 * t);
      }, w.en = D[v], w.Ls = D, w.p = {}, w;
    });
  });

  // reference:  https://stackoverflow.com/questions/6367010/average-2-hex-colors-together-in-javascript
  // blend two hex colors together by an amount
  function blendColors(colorA, colorB, amount = 0.5) {
      const [rA, gA, bA] = colorA.match(/\w\w/g).map((c) => parseInt(c, 16));
      const [rB, gB, bB] = colorB.match(/\w\w/g).map((c) => parseInt(c, 16));
      const r = Math.round(rA + (rB - rA) * amount)
          .toString(16)
          .padStart(2, '0');
      const g = Math.round(gA + (gB - gA) * amount)
          .toString(16)
          .padStart(2, '0');
      const b = Math.round(bA + (bB - bA) * amount)
          .toString(16)
          .padStart(2, '0');
      return `#${r}${g}${b}`;
  }
  const createHelloWeekColor = (primary, secondary, selected) => {
      const css = `
.__sf-calendar > * {
  box-sizing: border-box;
}

.__sf-calendar {
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
  user-select: none;
  font-size: 1em;
}
.__sf-calendar .navigation {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
}
.__sf-calendar .prev,
.__sf-calendar .next {
  padding: 1em;
  cursor: pointer;
}
.__sf-calendar .period {
  width: 100%;
  font-size: 1.2em;
  font-weight: 400;
  text-align: center;
}
.__sf-calendar .week {
  display: flex;
  font-size: 0.9em;
}
.__sf-calendar .week.rtl {
  flex-direction: row-reverse;
}
.__sf-calendar .month {
  display: flex;
  flex-wrap: wrap;
  padding: 0.4em 0;
  cursor: pointer;
}
.__sf-calendar .month.rtl {
  flex-direction: row-reverse;
}
.__sf-calendar .day {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: calc(100% / 7);
  padding: 1em;
  cursor: pointer;
  border: 1px solid transparent;
}
.__sf-calendar .day.is-disabled {
  cursor: not-allowed;
  opacity: 0.3;
}

.__sf-calendar .week {
  color: ${primary}!important;
  font-size: 1.2em;
}

.__sf-calendar .day.is-weekend {
  color: ${selected};
}

.__sf-calendar .day.is-highlight {
  background-color: ${secondary};
  color: #000;
}

.__sf-calendar .day.is-today {
  color: #000;
  background-color: #fff;
  border-color: ${selected};
}

.__sf-calendar .day.is-selected {
  background-color: ${selected} !important;
  color: #fff !important;
}

.__sf-calendar .day.is-begin-range,
.__sf-calendar .day.is-end-range {
  background-color: ${primary} !important;
  color: #fff !important;
}

.__sf-calendar .day.is-disabled {
  cursor: not-allowed;
  opacity: 0.33;
}`;
      return css;
  };

  /* eslint-disable @typescript-eslint/comma-dangle */
  /* eslint-disable no-param-reassign */
  function useLoading(options = {}) {
      let isLoading = false;
      const run = (promise, timeout = 0) => {
          isLoading = true;
          let timer = null;
          if (timeout) {
              timer = setTimeout(() => {
                  isLoading = false;
              }, timeout);
          }
          const cleanup = () => {
              isLoading = false;
              if (timer) {
                  clearTimeout(timer);
                  timer = null;
              }
          };
          if (options.before)
              options.before();
          promise = promise
              .then((res) => {
              if (options.after)
                  options.after();
              cleanup();
              return res;
          })
              .catch((err) => {
              if (options.after)
                  options.after();
              if (options.error)
                  options.error();
              cleanup();
              throw err;
          });
          return promise;
      };
      return {
          isLoading,
          run,
      };
  }

  const SF_BTNS = '__sf-product-button-list';
  const SF_SELECT_BOOKING_DATE_CLASSES = '__sf-select-booking-date';
  const SF_ADD_TO_CART_CLASSES = '__sf-add-to-cart';
  const SF_CALENDAR_CLASSES = '__sf-calendar';
  const SF_HELLO_WEEK_STYLE = '__sf-hello-week-style';
  const SF_SCHEDULE_GRID_CONTAINER = '__sf-schedule-grid-container';
  const SF_SCHEDULE_RESOURCES = '__sf-schedule-resources';
  const SF_SCHEDULE_LOCATIONS = '__sf-schedule-resources';
  const SF_CAPACITY = '__sf-capacity';
  const SL_BTNS = 'product-button-list';
  const SL_ADD_TO_CARTS = '__sl-custom-track-add-to-cart-btn';
  const SL_BUY_NOW = '__sl-custom-track-product-detail-buy-now';

  // @ts-nocheck
  /* eslint-disable */
  const gLocale = (window.Shopline.locale || 'en').toLowerCase();
  const _translation = {
      select_booking_date: {
          en: 'Select date',
          zh: '选择日期',
      },
      hidden: {
          en: 'Hidden',
          zh: '隐藏',
      },
      add_to_cart: {
          en: 'Add to cart',
          zh: '添加到购物车',
      },
      please_select_a_sku_first: {
          en: 'Please select a sku first',
          zh: '请先选择一个商品的 sku',
      },
      got_it_on: {
          en: 'Got it on',
          zh: '预定于',
      },
      please_select_a_valid_booking_date: {
          en: 'Please select a valid booking date',
          zh: '请选择有效的预约日期',
      },
      failed_to_add_to_cart: {
          en: 'Failed to add to cart',
          zh: '加入购物车失败',
      },
      failed_to_find_the_schedule: {
          en: 'Failed to find the schedule',
          zh: '找不到排期信息',
      },
      capacity_exceed: {
          en: 'The capacity is excessive, the effective capacity is {{capacity}}, and the current purchase quantity is {{quantity}}',
          zh: '容量超额，有效容量为{{capacity}}，当前购买的数量为{{quantity}}。',
      },
      capacity: {
          en: 'Capacity',
          zh: '容量',
      },
      location: {
          en: 'Location',
          zh: '位置',
      },
      resource: {
          en: 'Resource',
          zh: '资源',
      },
      please_select: {
          en: 'Please select',
          zh: '请选择',
      },
  };
  const translation = Object.keys(_translation).reduce((prev, key) => {
      const locale = gLocale.includes('zh') ? 'zh' : 'en';
      // @ts-ignore
      prev[key] = _translation[key][locale];
      return prev;
  }, Object.create(null));

  /* eslint-disable @typescript-eslint/indent */
  const delay = (timeout = 400) => new Promise((resolve) => {
      setTimeout(resolve, timeout);
  });
  // @ts-ignore
  const GHelloWeek = window.HelloWeek;
  /* eslint-disable import/prefer-default-export */
  const createCalendar = async (insert, options = {}) => {
      const calendarEl = document.createElement('div');
      calendarEl.style.transition = 'all 200ms';
      calendarEl.style.opacity = '0';
      calendarEl.classList.add(SF_CALENDAR_CLASSES);
      await insert(calendarEl);
      await delay();
      calendarEl.style.opacity = '1';
      const calendar = new GHelloWeek(Object.assign({ selector: `.${SF_CALENDAR_CLASSES}`, format: 'YYYY-MM-DD' }, options));
      const _destroy = calendar.destroy;
      // eslint-disable-next-line func-names
      calendar.destroy = async function (...args) {
          const el = document.querySelector(`.${SF_CALENDAR_CLASSES}`);
          if (el) {
              el.style.opacity = '0';
              await delay(400);
              el.remove();
              _destroy.apply(this, args);
          }
      };
      return calendar;
  };
  class Schedule {
      constructor(insert, scheduleItems, ctx) {
          this.scheduleItems = scheduleItems;
          this.ctx = ctx;
          this.capacity = Number.MAX_SAFE_INTEGER;
          this.active = null;
          this.currentLocation = null;
          this.currentResource = null;
          if (!this.scheduleItems || !this.scheduleItems.length)
              return;
          const container = document.createElement('div');
          container.classList.add(SF_SCHEDULE_GRID_CONTAINER);
          const { primary, activeColor, secondary } = this.ctx.colors;
          const { locations, resources } = this.ctx;
          const content = scheduleItems
              .map((item, index) => {
              const { startTime, endTime } = item;
              const start = dayjs_min(startTime).format('HH:mm');
              const end = dayjs_min(endTime).format('HH:mm');
              const date = dayjs_min(startTime).format('YYYY-MM-DD');
              const data = `data-type="schedule-item" data-index="${index}" data-start="${start} data-end="${end}"`;
              return `<div class="schedule-item" 
            style="background: ${secondary}; color: #000; width: 96px; height: 96px; cursor: pointer; display: flex; flex-direction: column; justify-content: center; line-height: 1.5; margin-bottom: 8px; text-align: center;"
            ${data}
          >
            <div ${data}>${translation.got_it_on}</div>
            <div ${data}>${ctx.selectedDate || date}</div>
            <div ${data}>${start}~${end}</div>
            <div ${data}></div>
          </div>`;
          })
              .join('');
          let resourcesContent = '';
          let locationsContent = '';
          if (locations.length) {
              locationsContent = `
<div style="vertical-align: middle; font-size: 1.2em">
  <span style="color: red;">*</span>
  <span>
    ${translation.location}:
  </span>
  <select style="min-width: 120px; text-align: center; height: 2.2em;" class=${SF_SCHEDULE_LOCATIONS} data-type="location">
    ${locations
                .map((location) => `<option value="${location.id}">${location.name}</option>`)
                .join('')}
  </select>
</div>
`;
          }
          if (resources.length) {
              resourcesContent = `
<div style="vertical-align: middle; font-size: 1.2em">
  <span style="color: red;">*</span>
  <span>
    ${translation.resource}:
  </span>
  <select style="min-width: 120px; text-align: center; height: 2.2em;" class=${SF_SCHEDULE_RESOURCES} data-type="resource">
    ${resources
                .map((resource) => `<option value="${resource.id}">${resource.name}</option>`)
                .join('')}
  </select>
</div>
`;
          }
          container.innerHTML = `
<div style="display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 16px;">${content}</div>
<div style="display: flex; gap: 16px; margin-bottom: 16px;">${locationsContent}${resourcesContent}</div>
<div style="color: #171f2b; font-size: 14px; margin-bottom: 16px;" class="${SF_CAPACITY}"></div>
`;
          insert(container);
          this.selectListener = (e) => {
              const target = e.target;
              this.initSelect(target);
              // const type = target.getAttribute('data-type');
              // const value = target.value;
              // if (type === 'location') {
              //   const location = locations.find((item: any) => String(item.id) === String(value));
              //   this.currentLocation = location;
              // } else {
              //   const resource = resources.find((item: any) => String(item.id) === String(value));
              //   this.currentResource = resource;
              // }
          };
          container.querySelectorAll('select').forEach((select) => {
              this.initSelect(select);
              select.addEventListener('change', this.selectListener);
          });
          this.listener = (e) => {
              const target = e.target;
              const type = target.getAttribute('data-type');
              if (type !== 'schedule-item')
                  return;
              const index = Number(target.getAttribute('data-index'));
              this.active = this.scheduleItems[index];
              const els = container.querySelectorAll('.schedule-item');
              els.forEach((el, idx) => {
                  if (String(idx) === String(index)) {
                      el.classList.add('active');
                      el.style.background = activeColor;
                      el.style.color = '#fff';
                  }
                  else {
                      el.style.background = secondary;
                      el.style.color = '#000';
                      el.classList.remove('active');
                  }
              });
          };
          container.addEventListener('click', this.listener);
      }
      destroy() {
          const container = document.querySelector(`.${SF_SCHEDULE_GRID_CONTAINER}`);
          this.active = null;
          this.currentLocation = null;
          this.currentResource = null;
          this.capacity = Number.MAX_SAFE_INTEGER;
          if (!container)
              return;
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          this.listener && container.removeEventListener('click', this.listener);
          if (this.selectListener) {
              container
                  .querySelectorAll('select')
                  .forEach((select) => select.removeEventListener('change', this.selectListener));
          }
          container.remove();
      }
      initSelect(target) {
          // logger.log('init select');
          const type = target.getAttribute('data-type');
          const value = target.value;
          const locations = this.ctx.locations;
          const resources = this.ctx.resources;
          if (type === 'location') {
              const location = locations.find((item) => String(item.id) === String(value));
              this.currentLocation = location;
          }
          else {
              const resource = resources.find((item) => String(item.id) === String(value));
              this.currentResource = resource;
          }
          this.capacity = Number.MAX_SAFE_INTEGER;
          if (this.active) {
              this.capacity = Math.min(this.capacity, this.active.capacity || Number.MAX_SAFE_INTEGER);
          }
          if (this.currentLocation) {
              this.capacity = Math.min(this.capacity, this.currentLocation.capacity || Number.MAX_SAFE_INTEGER);
          }
          if (this.currentResource) {
              this.capacity = Math.min(this.capacity, this.currentResource.capacity || Number.MAX_SAFE_INTEGER);
          }
          if (this.capacity === Number.MAX_SAFE_INTEGER)
              this.capacity = 0;
          const el = document.querySelector(`.${SF_CAPACITY}`);
          if (el)
              el.innerHTML = `${translation.capacity}: ${this.capacity}`;
          // logger.log('location: ', this.currentLocation);
          // logger.log('resource: ', this.currentResource);
      }
  }
  async function message(msg, timeout, colors) {
      const id = 'sf-message';
      const existedEl = document.getElementById(id);
      if (existedEl) {
          existedEl.style.opacity = '0';
          await delay(200);
          existedEl.remove();
      }
      const el = document.createElement('div');
      el.id = id;
      el.innerHTML = msg;
      el.style.position = 'fixed';
      el.style.zIndex = '10001';
      el.style.position = '0';
      el.style.top = '20px';
      el.style.left = '50%';
      el.style.border = '1px solid black';
      el.style.color = colors.color;
      el.style.background = colors.background;
      el.style.borderColor = colors.border;
      el.style.transform = 'translateX(-50%)';
      el.style.minWidth = '300px';
      el.style.maxWidth = '420px';
      el.style.transition = 'all 200ms';
      el.style.lineHeight = '1.5';
      el.style.padding = '16px 24px';
      el.style.opacity = '1';
      document.body.appendChild(el);
      setTimeout(async () => {
          const _el = document.getElementById(id);
          if (!_el)
              return;
          _el.style.opacity = '0';
          await delay(400);
          if (_el)
              _el.remove();
      }, timeout);
  }
  // export function createScheduleGrid(scheduleItems: ScheduleItem[], ctx: { colors: any }) {}
  function warning(msg, timeout = 4000) {
      return message(msg, timeout, {
          color: '#663c00',
          background: '#fff4e5',
          border: '#f5dab1',
      });
  }
  function getQuantity(defaultVal = 1) {
      const el = document.querySelector('#product-detail-sku-stepper_productDetail input');
      if (!el)
          return defaultVal;
      const value = Number(el.value);
      if (value <= 0)
          return defaultVal;
      return value;
  }
  function isValidDate(date) {
      return /\d{2}-\d{2}-\d{2}/.test(date);
  }

  /* eslint-disable no-console */
  /* eslint-disable import/prefer-default-export */
  const logger = {
      log: (...args) => console.log('[SHOPFLEX LOG]: ', ...args),
      warn: (...args) => console.warn('[SHOPFLEX WARN]: ', ...args),
      error: (...args) => console.error('[SHOPFLEX ERROR]: ', ...args),
  };

  /* eslint-disable object-curly-newline */
  /* eslint-disable import/prefer-default-export */
  /* eslint-disable no-debugger */
  /* eslint-disable operator-linebreak */
  /* eslint-disable no-param-reassign */
  /* eslint-disable prefer-const */
  /* eslint-disable no-unused-vars */
  /* eslint-disable prefer-destructuring */
  /* eslint-disable @typescript-eslint/no-unused-vars */
  /* eslint-disable no-console */
  /* eslint-disable @typescript-eslint/comma-dangle */
  /* eslint-disable no-underscore-dangle */
  /* eslint-disable @typescript-eslint/naming-convention */
  var _a, _b, _c;
  // import './dayjs';
  // import './hello.week.theme.min.css';
  const ctx = {
      gCurrentCalendar: null,
      gCurrentSku: null,
      gProduct: null,
      gCurrentSchedules: null,
      gCurrentSchedule: null,
      gSelectedDate: null,
  };
  const BASE_URL = window.origin;
  const _fetch = window.fetch;
  const makeUrl = (url, params = {}) => {
      const searchParams = new URLSearchParams(params);
      const query = searchParams.toString();
      return url.endsWith('?') ? `${url}${query}` : `${url}?${query}`;
  };
  const fetcher = (url, _options = {}) => {
      const options = Object.assign({}, _options);
      options.mode = _options.mode || 'cors';
      options.method = options.method || 'get';
      return _fetch(url, options).then((res) => res.json());
  };
  // @ts-ignore
  const gShopline = window.Shopline;
  const gEventBus = gShopline.event;
  const gColors = ((_b = (_a = gShopline.theme) === null || _a === void 0 ? void 0 : _a.settings) === null || _b === void 0 ? void 0 : _b.colors) || {};
  let { primary = '#42a298', pageBg = '#fff', secondary = blendColors(primary, pageBg, 0.4), } = gColors;
  let activeColor = gColors.activeColor || ((_c = gShopline.theme) === null || _c === void 0 ? void 0 : _c.settings.color_tag_background) || '#e32619';
  primary = '#1a73e8';
  pageBg = '#fff';
  secondary = '#d2e3fc';
  activeColor = primary;
  logger.log('primary color: ', primary);
  logger.log('secondary color: ', secondary);
  logger.log('activeColor color: ', activeColor);
  // global init
  gShopline.handle;
  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
  const _productURL = decodeURIComponent(window.location.pathname).split('/');
  let gProductHandle = '';
  if (_productURL && _productURL.length) {
      gProductHandle = _productURL[_productURL.length - 1];
  }
  // let gCurrentSku: SkuData | null = null;
  // let gProduct: any = null;
  // let gCurrentCalendar: null | HelloWeek = null;
  function _initStyle() {
      logger.log('init style');
      return new Promise((resolve) => {
          if (!document.head.querySelector(`.${SF_HELLO_WEEK_STYLE}`)) {
              const helloWeekCss = createHelloWeekColor(primary, secondary, activeColor);
              const el = document.createElement('style');
              el.classList.add(SF_HELLO_WEEK_STYLE);
              el.innerHTML = helloWeekCss;
              document.head.appendChild(el);
          }
          // if (!document.head.querySelector(`.${SF_JQUERY_TOAST_STYLE}`)) {
          //   const el = document.createElement('style');
          //   el.classList.add(SF_JQUERY_TOAST_STYLE);
          //   el.innerHTML = jqueryToastCss;
          //   document.head.appendChild(el);
          // }
          resolve(true);
      });
  }
  function getProduct() {
      return fetcher(`${BASE_URL}/api/product/products.json?handle=${gProductHandle}`).then((res) => res.products[0]);
  }
  function prepare() {
      logger.log('prepare...');
      if (window.location.href.includes('shopflex_testing')) {
          logger.log('testing..');
          throw new Error('Shopflex testing...');
      }
  }
  async function initBooking() {
      // gEventBus.on('DataReport::InitiateCheckout', (data: any) => {
      //   console.log('DataReport::InitiateCheckout: ', data);
      // });
      // gEventBus.on('DataReport::CompleteOrder', (data: any) => {
      //   console.log('DataReport::CompleteOrder', data);
      // });
      const product = await getProduct();
      ctx.gProduct = product;
      logger.log('product: ', product);
      if (!product) {
          // logger.error('Failed to find current product: ');
          throw new Error('Failed to find current product: ');
      }
      if (!Array.isArray(product.tags)) {
          throw new Error('Current product is not a booking product');
      }
      if (!product.tags.includes('booking')) {
          throw new Error('Current product is not a booking product');
      }
  }
  async function injectDep() {
      logger.log('injectDep...');
      _initStyle();
      // if (!$) {
      //   await loadScript('https://code.jquery.com/jquery-3.6.0.min.js', 'sf-jquery', {
      //     crossOrigin: 'anonymous',
      //     integrity: 'sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=',
      //     async: true,
      //   });
      //   // @ts-ignore
      //   $ = window.$;
      // }
      // initJqueryToast($);
  }
  function resetEl() {
      // TODO(rushui 2022-07-26): create element by self
      const slBtns = document.querySelector(`.${SL_BTNS}`);
      slBtns.style.position;
      slBtns.classList.add(SF_BTNS);
      // if (!['fixed', 'relative', 'absolute', 'sticky'].includes(_position)) {
      //   slBtns.style.position = 'relative';
      // }
      const slAddToCartBtn = slBtns.querySelector(`.${SL_ADD_TO_CARTS}`);
      const slBuyNowBtn = slBtns.querySelector(`.${SL_BUY_NOW}`);
      slAddToCartBtn.classList.remove(SL_ADD_TO_CARTS);
      slAddToCartBtn.classList.remove(SF_SELECT_BOOKING_DATE_CLASSES);
      slAddToCartBtn.classList.add(SF_ADD_TO_CART_CLASSES);
      slBuyNowBtn.classList.remove(SL_BUY_NOW);
      slBuyNowBtn.classList.remove(SF_ADD_TO_CART_CLASSES);
      slBuyNowBtn.classList.add(SF_SELECT_BOOKING_DATE_CLASSES);
      const sfAddToCartBtn = slAddToCartBtn.cloneNode(true);
      const sfSelectDateBtn = slBuyNowBtn.cloneNode(true);
      sfAddToCartBtn.textContent = translation.add_to_cart;
      sfSelectDateBtn.textContent = translation.select_booking_date;
      slAddToCartBtn.replaceWith(sfSelectDateBtn);
      slBuyNowBtn.replaceWith(sfAddToCartBtn);
  }
  function initEvent() {
      // gEventBus.on('DataReport::ViewContent', (content: ViewContent) => {
      //   console.log('DataReport::ViewContent: ', content);
      // });
      gEventBus.on('Product::SkuChanged', ({ data }) => {
          ctx.gCurrentSku = data;
          logger.log('change sku: ', ctx.gCurrentSku);
      });
      const sfBtns = document.querySelector(`.${SF_BTNS}`);
      const sfAddToCartBtn = sfBtns.querySelector(`.${SF_ADD_TO_CART_CLASSES}`);
      const sfSelectDateBtn = sfBtns.querySelector(`.${SF_SELECT_BOOKING_DATE_CLASSES}`);
      let content;
      const { isLoading: isAddingToCartLoading, run: runAddToCart } = useLoading({
          before: () => {
              content = sfAddToCartBtn.innerHTML;
              sfAddToCartBtn.innerHTML = 'Loading...';
              sfAddToCartBtn.disabled = true;
          },
          after: () => {
              sfAddToCartBtn.innerHTML = content;
              sfAddToCartBtn.disabled = false;
              content = null;
          },
      });
      sfSelectDateBtn.addEventListener('click', async () => {
          var _a, _b;
          logger.log('click select booking btn.. ');
          if (ctx.gCurrentCalendar) {
              ctx.gCurrentCalendar.destroy();
              (_a = ctx.gCurrentSchedule) === null || _a === void 0 ? void 0 : _a.destroy();
              ctx.gSelectedDate = null;
              sfSelectDateBtn.innerHTML = translation.select_booking_date;
              ctx.gCurrentCalendar = null;
              return;
          }
          const sku = (_b = ctx.gCurrentSku) === null || _b === void 0 ? void 0 : _b.skuSeq;
          if (!sku) {
              // eslint-disable-next-line no-alert
              warning(translation.please_select_a_sku_first);
              return;
          }
          // const variant = findVariant(ctx.gProduct, sku)!;
          // logger.log('variant: ', variant);
          const scheduleData = await fetcher(makeUrl('https://api.shopflex.io/reserve/sku/datePlanList', {
              platformProductId: ctx.gProduct.id,
              platformVariantId: sku,
          }))
              .then((res) => {
              if (res.code === 200)
                  return res.data;
              return Promise.reject(new Error(`Failed to fetch schedule data, platformProductId = ${ctx.gProduct.id}, platformVariantId = ${sku}`));
          })
              .catch((err) => {
              warning(translation.failed_to_find_the_schedule);
              throw err;
          });
          logger.log('scheduleData: ', scheduleData);
          ctx.gCurrentSchedules = scheduleData;
          const schedules = ctx.gCurrentSchedules || {};
          const days = Object.keys(schedules).filter(isValidDate);
          // console.log('days: ', days);
          const locations = scheduleData.locations || [];
          const resources = scheduleData.resources || [];
          ctx.gCurrentCalendar = await createCalendar((calendarEl) => {
              sfBtns.insertBefore(calendarEl, sfAddToCartBtn);
          }, {
              daysHighlight: [
                  {
                      days,
                      // backgroundColor: '#f08080',
                  },
              ],
              onSelect() {
                  var _a;
                  const calendar = ctx.gCurrentCalendar;
                  const selectedDate = calendar.getDaySelected()[0];
                  const schedule = ctx.gCurrentSchedules[selectedDate];
                  if (ctx.gSelectedDate !== selectedDate) {
                      ctx.gSelectedDate = selectedDate;
                      (_a = ctx.gCurrentSchedule) === null || _a === void 0 ? void 0 : _a.destroy();
                      ctx.gCurrentSchedule = new Schedule((el) => {
                          // sfBtns.insertBefore(el, runAddToCart);
                          sfBtns.insertBefore(el, sfAddToCartBtn);
                      }, schedule, {
                          selectedDate: ctx.gSelectedDate,
                          colors: { primary, secondary, activeColor },
                          locations,
                          resources,
                      });
                  }
              },
          });
          sfSelectDateBtn.innerHTML = translation.hidden;
      });
      console.log('sfAddToCartBtn: ', sfAddToCartBtn);
      sfAddToCartBtn.addEventListener('click', async () => {
          var _a, _b;
          logger.log('click add to cart btn, current context: ', ctx);
          const currentSchedule = (_a = ctx.gCurrentSchedule) === null || _a === void 0 ? void 0 : _a.active;
          // 没有选择有效的时间段
          if (!currentSchedule) {
              warning(translation.please_select_a_valid_booking_date);
              return;
          }
          const scheduleInstance = ctx.gCurrentSchedule;
          const { capacity, currentLocation, currentResource } = scheduleInstance;
          const quantity = getQuantity();
          if (quantity > capacity) {
              warning(translation.capacity_exceed
                  .replace('{{capacity}}', `${capacity}`)
                  .replace('{{quantity}}', `${quantity}`));
              return;
          }
          logger.log(`add to cart - sku = ${(_b = ctx.gCurrentSku) === null || _b === void 0 ? void 0 : _b.skuSeq}, quantity: ${quantity}`);
          try {
              const ids = `${currentSchedule.id}_${currentSchedule.adminId}_${currentSchedule.productId}_${currentSchedule.variantId}_${(currentLocation === null || currentLocation === void 0 ? void 0 : currentLocation.id) || 0}_${(currentResource === null || currentResource === void 0 ? void 0 : currentResource.id) || 0}`;
              const extra = [];
              if (currentLocation) {
                  extra.push({
                      name: 'Location',
                      value: currentLocation.name,
                      type: 'text',
                      show: true,
                      export: true,
                  });
              }
              if (currentResource) {
                  extra.push({
                      name: 'Resource',
                      value: currentResource.name,
                      type: 'text',
                      show: true,
                      export: true,
                  });
              }
              await runAddToCart(fetcher(`${BASE_URL}/api/carts/ajax-cart/add.js`, {
                  method: 'post',
                  headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      items: [
                          {
                              id: ctx.gCurrentSku.skuSeq,
                              quantity,
                              properties: [
                                  {
                                      name: 'Booking',
                                      value: dayjs_min(currentSchedule.startTime).format('YYYY-MM-DD'),
                                      type: 'text',
                                  },
                                  ...extra,
                                  {
                                      name: 'Date',
                                      value: dayjs_min(currentSchedule.startTime).format('YYYY-MM-DD'),
                                      type: 'text',
                                      show: true,
                                      export: true,
                                      extInfo: '',
                                  },
                                  {
                                      name: 'Time Range',
                                      value: `${dayjs_min(currentSchedule.startTime).format('HH:mm')}-${dayjs_min(currentSchedule.endTime).format('HH:mm')}`,
                                      type: 'text',
                                      show: true,
                                      export: true,
                                      extInfo: '',
                                  },
                                  {
                                      name: 'planIds',
                                      // addressId_resourceId
                                      value: ids,
                                      type: 'text',
                                      show: false,
                                      export: true,
                                      extInfo: '',
                                  },
                                  {
                                      name: 'uniqueCode',
                                      value: ids,
                                      type: 'text',
                                      show: true,
                                      export: true,
                                      extInfo: '',
                                  },
                              ],
                          },
                      ],
                  }),
              }));
              logger.log('Add to cart successfully');
              gEventBus.emit('Cart::NavigateCart');
          }
          catch (err) {
              warning(translation.failed_to_add_to_cart);
              throw err;
          }
      });
  }
  async function main() {
      try {
          logger.log('booking start...');
          logger.log('current version: 1.3');
          await prepare();
          await initBooking();
          // await injectDep();
          await injectDep();
          await resetEl();
          await initEvent();
          logger.log('booking end...');
      }
      catch (err) {
          logger.warn('booking error with ', err);
      }
  }
  main();

  exports.ctx = ctx;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.umd.js.map
