/* eslint-disable */
// @ts-nocheck
// reference: https://hello-week.com/#/
// ../resources/hell-week-master: 源码修改后的代码

!(function (t) {
  'use strict';
  const e = 'hello-week',
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
    D = { FRIDAY: 5, MONDAY: 1, SATURDAY: 6, SUNDAY: 0, THURSDAY: 4, TUESDAY: 2, WEDNESDAY: 3 },
    S = 'margin-right',
    m = 'margin-left';
  function v(t) {
    return null != t;
  }
  function M(t) {
    return null !== t && 'object' == typeof t;
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
    return v(e) ? e.querySelector(`.${t}`) : document.querySelector(`.${t}`);
  }
  function H(t, e, s) {
    for (const a of Object.keys(t.attributes[s])) O(e, `data-${a}`, t.attributes[s][a]);
  }
  function T(t, e, s) {
    Y(t.attributes[s])
      ? (e.className = t.attributes[s])
      : k(t.attributes[s]) &&
        t.attributes[s].forEach((t) => {
          R(e, t);
        });
  }
  function x(t, e, s) {
    if (Y(t.attributes[s])) e.style = t.attributes[s];
    else if (M(t.attributes[s])) for (const a of Object.keys(t.attributes[s])) e.style[a] = t.attributes[s][a];
  }
  function C(t, e, ...s) {
    const a = { nodeName: t };
    return e && (a.attributes = e), s.length && (a.children = [].concat(...s)), a;
  }
  function F(t, e) {
    if (t.split) return document.createTextNode(t);
    const s = document.createElement(t.nodeName);
    return (
      v(t.attributes) &&
        (function (t, e) {
          for (const s of Object.keys(t.attributes))
            'class' === s
              ? T(t, e, s)
              : 'style' === s
              ? x(t, e, s)
              : 'data' === s
              ? H(t, e, s)
              : O(e, s, t.attributes[s]);
        })(t, s),
      (t.children || []).forEach((t) => s.appendChild(F(t))),
      e ? e.appendChild(s) : s
    );
  }
  function N(t, e) {
    return Object.assign(t, e);
  }
  function L(t, e) {
    return Array.prototype.slice.call(t).indexOf(e) + 1;
  }
  function j(t) {
    let e = [];
    function s(t) {
      const s = [];
      for (const a of e) e[a] === t ? (t = null) : s.push(e[a]);
      e = s;
    }
    return (
      (t = t || {}),
      {
        setState: function (s, a) {
          t = a ? s : N(N({}, t), s);
          const n = e;
          for (const e of n) n[e](t);
        },
        subscribe: (t) => (
          e.push(t),
          () => {
            s(t);
          }
        ),
        unsubscribe: s,
        getState: () => t,
      }
    );
  }
  const E = {
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
        beforeLoad: () => {},
        onLoad: () => {},
        onNavigation: () => {},
        onSelect: (t) => t,
        beforeCreateDay: (t) => t,
      }),
      set(t) {
        this.store.setState(t);
      },
      get() {
        return this.store.getState();
      },
    },
    W = {
      store: j({}),
      set(t) {
        this.store.setState(t);
      },
      get() {
        return this.store.getState();
      },
    };
  function U(t, e) {
    const s = v(t) ? new Date(t) : new Date();
    return (e = e || s.getTimezoneOffset()), s.setTime(s.getTime() + 60 * e * 1e3), s;
  }
  function I(t, e) {
    const s = U(t, e);
    return (
      (a = s.getDate()), (n = s.getMonth()), `${s.getFullYear()}-${('0' + (n + 1)).slice(-2)}-${('0' + a).slice(-2)}`
    );
    var a, n;
  }
  function J(t, e, s) {
    const { format: a } = E.get(),
      { months: n, monthsShort: i } = W.get(),
      r = U(t, s);
    return (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = e || a).replace(
      'dd',
      r.getDate().toString()
    )).replace('DD', (r.getDate() > 9 ? r.getDate() : '0' + r.getDate()).toString())).replace(
      'mm',
      (r.getMonth() + 1).toString()
    )).replace('MMM', n[r.getMonth()])).replace(
      'MM',
      (r.getMonth() + 1 > 9 ? r.getMonth() + 1 : '0' + (r.getMonth() + 1)).toString()
    )).replace('mmm', i[r.getMonth()])).replace('yyyy', r.getFullYear().toString())).replace(
      'YYYY',
      r.getFullYear().toString()
    )).replace('YY', r.getFullYear().toString().substring(2))).replace('yy', r.getFullYear().toString().substring(2)));
  }
  function P(t) {
    const e = new Date(t);
    return Number(
      '' + e.getFullYear() + (e.getMonth() + 1) + (e.getDate() > 9 ? e.getDate() : '0' + e.getDate()).toString()
    );
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
    const e = G(t);
    return I(e.setDate(e.getDate() - 1));
  }
  function Q(t) {
    const e = G(t);
    return I(e.setDate(e.getDate() + 1));
  }
  class V {
    options;
    langs;
    selector;
    daysOfMonth;
    todayDate = I(new Date());
    date = new Date();
    defaultDate;
    calendar;
    days;
    isRTL;
    daysHighlight;
    intervalRange = {};
    daysSelected = [];
    lastSelectedDay;
    constructor(t) {
      (this.langs = W), (this.options = E), this.options.set(t);
      const { calendar: s, selector: d } = (function (t, s) {
        const d = {};
        if (!v(t.selector)) throw new Error('You need to specify a selector!');
        return (
          Y(t.selector)
            ? (d.selector = t.selector ? document.querySelector(t.selector) : t.selector)
            : (d.selector = t.selector),
          v(d.selector) ? t.selector !== e && R(d.selector, e) : (d.selector = F(C('div', { class: [t.selector, e] }))),
          (d.calendar = {}),
          (d.calendar.navigation = A(n, d.selector)),
          v(d.calendar.navigation) || (d.calendar.navigation = F(C('div', { class: n }), d.selector)),
          v(t.nav[0]) &&
            ((d.calendar.prevMonth = F(C('div', { class: o }, t.nav[0]), d.calendar.navigation)),
            d.calendar.prevMonth.addEventListener('click', () => s.prev.cb())),
          (d.calendar.period = A(r, d.selector)),
          v(d.calendar.period) || (d.calendar.period = F(C('div', { class: r }), d.calendar.navigation)),
          v(t.nav[1]) &&
            ((d.calendar.nextMonth = F(C('div', { class: i }, t.nav[1]), d.calendar.navigation)),
            d.calendar.nextMonth.addEventListener('click', () => s.next.cb())),
          (d.calendar.week = A(h, d.selector)),
          v(d.calendar.week) || (d.calendar.week = F(C('div', { class: h }), d.selector)),
          (d.calendar.month = A(a, d.selector)),
          v(d.calendar.month) || (d.calendar.month = F(C('div', { class: a }), d.selector)),
          t.rtl && (R(d.calendar.week, l), R(d.calendar.month, l)),
          d
        );
      })(this.options.get(), { prev: { cb: () => this.prev() }, next: { cb: () => this.next() } });
      (this.selector = d), (this.calendar = s), this.beforeCreate();
    }
    destroy() {
      this.removeStatesClass(), this.selector.remove();
    }
    prev() {
      const { onNavigation: t } = this.options.get(),
        e = this.date.getMonth() - 1;
      this.date.setMonth(e), this.update(), t();
    }
    next() {
      const { onNavigation: t } = this.options.get(),
        e = this.date.getMonth() + 1;
      this.date.setMonth(e), this.update(), t();
    }
    prevYear() {
      const { onNavigation: t } = this.options.get(),
        e = this.date.getFullYear() - 1;
      this.date.setFullYear(e), this.update(), t();
    }
    nextYear() {
      const { onNavigation: t } = this.options.get(),
        e = this.date.getFullYear() + 1;
      this.date.setFullYear(e), this.update(), t();
    }
    update() {
      this.clearCalendar(), this.mounted();
    }
    goToDate(t = this.todayDate) {
      (this.date = new Date(t)), this.date.setDate(1), this.update();
    }
    getDaySelected() {
      const { format: t } = this.options.get();
      return this.daysSelected.sort((t, e) => P(t) - P(e)).map((e) => J(e, t));
    }
    getLastDaySelected() {
      return this.lastSelectedDay;
    }
    getDaysHighlight() {
      return this.daysHighlight;
    }
    getMonth() {
      return this.date.getMonth() + 1;
    }
    getYear() {
      return this.date.getFullYear();
    }
    setOptions(t, e) {
      M(t) && this.options.set(t), 'function' == typeof e && this.options.set(e(this.options.get())), this.update();
    }
    setDaysHighlight(t) {
      (this.daysHighlight = [...this.daysHighlight, ...t]), this.update();
    }
    setIntervalRange(t) {
      const { range: e } = this.options.get();
      if (e && t && k(t)) {
        const [e, s] = t;
        this.intervalRange = { begin: e, end: s };
      }
    }
    setMinDate(t) {
      this.options.set({ minDate: K(t) });
    }
    setMaxDate(t) {
      this.options.set({ maxDate: Q(t) });
    }
    beforeCreate() {
      const { rtl: t } = this.options.get();
      (this.isRTL = t ? S : m),
        Promise.resolve({
          default: {
            days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            daysShort: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            months: [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December',
            ],
            monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          },
        })
          .then((t) => t)
          .then((t) => {
            this.langs.set(t.default);
          })
          .then(() => this.beforeMount());
    }
    beforeMount() {
      const {
        daysHighlight: t,
        daysSelected: e,
        defaultDate: s,
        timezoneOffset: a,
        minDate: n,
        maxDate: i,
        beforeLoad: r,
        onLoad: o,
      } = this.options.get();
      (this.daysHighlight = t || []),
        (this.daysSelected = e || []),
        r(),
        s &&
          ((this.date = U(s, a)), (this.defaultDate = U(s, a)), this.defaultDate.setDate(this.defaultDate.getDate())),
        this.date.setDate(1),
        n && this.setMinDate(n),
        i && this.setMaxDate(i),
        this.mounted(),
        o();
    }
    selectDay(t) {
      const { range: e } = this.options.get();
      this.daysOfMonth = this.selector.querySelectorAll('.' + a + ' .' + s);
      for (const s of Object.keys(this.daysOfMonth))
        this.handleClickInteraction(this.daysOfMonth[s], t), e && this.handleMouseInteraction(this.daysOfMonth[s]);
    }
    handleClickInteraction(t, e) {
      const { range: s, multiplePick: a, onSelect: n } = this.options.get();
      t.addEventListener('click', (t) => {
        const i = L(this.daysOfMonth, t.target);
        var r, o;
        this.days[i].locked ||
          ((this.lastSelectedDay = this.days[i].date),
          s ||
            (a
              ? (this.days[i].date &&
                  (this.daysSelected = this.daysSelected.filter((t) => P(t) !== P(this.lastSelectedDay))),
                this.days[i].isSelected || this.daysSelected.push(this.lastSelectedDay))
              : (this.days[i].locked || this.removeStatesClass(),
                (this.daysSelected = []),
                this.daysSelected.push(this.lastSelectedDay))),
          (r = t.target),
          (o = y),
          r.classList.toggle(o),
          (this.days[i].isSelected = !this.days[i].isSelected),
          s &&
            (this.intervalRange.begin &&
              this.intervalRange.end &&
              ((this.intervalRange = {}), this.removeStatesClass()),
            this.intervalRange.begin &&
              !this.intervalRange.end &&
              ((this.intervalRange.end = this.days[i].date),
              (this.daysSelected = (function (t, e) {
                const s = [];
                let a = t;
                const n = function (t) {
                  const e = new Date(this.valueOf());
                  return e.setDate(e.getDate() + t), e.getTime();
                };
                for (; a <= e; ) s.push(J(a)), (a = n.call(a, 1));
                return s;
              })(this.intervalRange.begin, this.intervalRange.end)),
              R(t.target, g),
              this.intervalRange.begin > this.intervalRange.end &&
                ((this.intervalRange = {}), this.removeStatesClass())),
            this.intervalRange.begin || (this.intervalRange.begin = this.days[i].date),
            R(t.target, y)),
          n(this.days[i]),
          e && e(this.days[i]));
      });
    }
    handleMouseInteraction(t) {
      t.addEventListener('mouseover', (t) => {
        const e = L(this.daysOfMonth, t.target);
        if (!(!this.intervalRange.begin || (this.intervalRange.begin && this.intervalRange.end))) {
          this.removeStatesClass();
          for (let t = 1; t <= Object.keys(this.days).length; t++)
            (this.days[t].isSelected = !1),
              _(this.days[e].date, this.intervalRange.begin) &&
                _(this.days[t].date, this.intervalRange.begin) &&
                B(this.days[t].date, this.days[e].date) &&
                (R(this.days[t].element, y),
                R(this.days[t].element, f),
                z(this.days[t].date, this.intervalRange.begin) && R(this.days[t].element, d));
        }
      });
    }
    creatWeek(t) {
      F(C('span', { class: s }, t), this.calendar.week);
    }
    createMonth() {
      const t = this.date.getMonth();
      for (; this.date.getMonth() === t; ) this.createDay(this.date), this.date.setDate(this.date.getDate() + 1);
      this.date.setMonth(this.date.getMonth() - 1), this.selectDay();
    }
    createDay(t) {
      const e = t.getDate(),
        a = t.getDay();
      let n = {
        day: e,
        date: I(t),
        isWeekend: !1,
        locked: !1,
        isToday: !1,
        isRange: !1,
        isSelected: !1,
        isHighlight: !1,
        events: void 0,
        attributes: { class: [s], style: {} },
        node: void 0,
        element: void 0,
      };
      const {
        locked: i,
        disableDaysOfWeek: r,
        disablePastDays: o,
        minDate: l,
        maxDate: h,
        disableDates: u,
        todayHighlight: S,
        weekStart: m,
        beforeCreateDay: v,
      } = this.options.get();
      (this.days = this.days || {}),
        (a !== D.SUNDAY && a !== D.SATURDAY) || (n.attributes.class.push(b), (n.isWeekend = !0)),
        (i ||
          (r && r.includes(a)) ||
          (o && B(this.date, this.defaultDate)) ||
          (l && _(l, n.date)) ||
          (h && B(h, n.date))) &&
          (n.attributes.class.push(c), (n.locked = !0)),
        u && this.disabledDays(n),
        z(this.todayDate, n.date) && ((n.isToday = !0), S && n.attributes.class.push(p)),
        this.daysSelected.find((t) => {
          z(t, n.date) && (n.attributes.class.push(y), (n.isSelected = !0));
        }),
        (function (t, e, s) {
          return $(s, t) && q(s, e);
        })(this.intervalRange.begin, this.intervalRange.end, n.date) && (n.attributes.class.push(f), (n.isRange = !0)),
        z(n.date, this.intervalRange.begin) && n.attributes.class.push(d),
        z(n.date, this.intervalRange.end) && n.attributes.class.push(g),
        this.daysHighlight && this.highlightDays(n),
        1 === n.day &&
          (n.attributes.style[this.isRTL] =
            m === D.SUNDAY
              ? a * (100 / Object.keys(D).length) + '%'
              : a === D.SUNDAY
              ? (Object.keys(D).length - m) * (100 / Object.keys(D).length) + '%'
              : (a - 1) * (100 / Object.keys(D).length) + '%'),
        (n.node = C('div', n.attributes, n.day.toString())),
        (n = v(n)),
        (n.element = F(n.node, this.calendar.month)),
        (this.days[n.day] = n);
    }
    disabledDays(t) {
      const { disableDates: e } = this.options.get();
      k(e[0])
        ? e.map((e) => {
            _(t.date, e[0]) && B(t.date, e[1]) && (t.attributes.class.push(c), (t.locked = !0));
          })
        : e.map((e) => {
            z(t.date, e) && (t.attributes.class.push(c), (t.locked = !0));
          });
    }
    highlightDays(t) {
      for (const e in this.daysHighlight)
        this.daysHighlight[e].days[0] instanceof Array
          ? this.daysHighlight[e].days.map((s) => {
              _(t.date, s[0]) && B(t.date, s[1]) && this.computedAttributes(e, t);
            })
          : this.daysHighlight[e].days.map((s) => {
              z(t.date, s) && this.computedAttributes(e, t);
            });
    }
    computedAttributes(t, e) {
      const { attributes: s, ...a } = this.daysHighlight[t];
      delete a.days, (e = N(e, a));
      for (const t in s)
        e.attributes[t] && s[t] ? (e.attributes[t] = N(e.attributes[t], s[t])) : s[t] && (e.attributes[t] = s[t]);
      e.attributes.class.push(u), (e.isHighlight = !0);
    }
    monthsAsString(t) {
      const { monthShort: e } = this.options.get(),
        { monthsShort: s, months: a } = this.langs.get();
      return e ? s[t] : a[t];
    }
    weekAsString(t) {
      const { weekShort: e } = this.options.get(),
        { daysShort: s, days: a } = this.langs.get();
      return e ? s[t] : a[t];
    }
    mounted() {
      this.calendar.period &&
        (this.calendar.period.innerHTML = this.monthsAsString(this.date.getMonth()) + ' ' + this.date.getFullYear());
      const t = [],
        { weekStart: e } = this.options.get(),
        { daysShort: s } = this.langs.get();
      this.calendar.week.textContent = '';
      for (let a = e; a < s.length; a++) t.push(a);
      for (let s = 0; s < e; s++) t.push(s);
      for (const e of t) this.creatWeek(this.weekAsString(e));
      this.createMonth();
    }
    clearCalendar() {
      this.calendar.month.textContent = '';
    }
    removeStatesClass() {
      for (const t of Object.keys(this.daysOfMonth))
        w(this.daysOfMonth[t], y),
          w(this.daysOfMonth[t], f),
          w(this.daysOfMonth[t], d),
          w(this.daysOfMonth[t], g),
          (this.days[+t + 1].isSelected = !1);
    }
  }
  const X = V;
  (window.HelloWeek = X),
    (t.HelloWeek = X),
    (t.createElement = C),
    (t.default = V),
    (t.el = C),
    (t.render = F),
    Object.defineProperty(t, '__esModule', { value: !0 });
})({});
