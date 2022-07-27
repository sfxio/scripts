"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
;
(function () {
    function inject() {
        !(function (t) {
            'use strict';
            const e = 'hello-week', s = 'day', a = 'month', n = 'navigation', i = 'next', r = 'period', o = 'prev', l = 'rtl', h = 'week', d = 'is-begin-range', c = 'is-disabled', g = 'is-end-range', u = 'is-highlight', y = 'is-selected', f = 'is-range', p = 'is-today', b = 'is-weekend', D = {
                FRIDAY: 5,
                MONDAY: 1,
                SATURDAY: 6,
                SUNDAY: 0,
                THURSDAY: 4,
                TUESDAY: 2,
                WEDNESDAY: 3,
            }, S = 'margin-right', m = 'margin-left';
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
                for (const a of Object.keys(t.attributes[s]))
                    O(e, `data-${a}`, t.attributes[s][a]);
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
                if (Y(t.attributes[s]))
                    e.style = t.attributes[s];
                else if (M(t.attributes[s]))
                    for (const a of Object.keys(t.attributes[s]))
                        e.style[a] = t.attributes[s][a];
            }
            function C(t, e, ...s) {
                const a = { nodeName: t };
                return (e && (a.attributes = e), s.length && (a.children = [].concat(...s)), a);
            }
            function F(t, e) {
                if (t.split)
                    return document.createTextNode(t);
                const s = document.createElement(t.nodeName);
                return (v(t.attributes) &&
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
                    e ? e.appendChild(s) : s);
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
                    for (const a of e)
                        e[a] === t ? (t = null) : s.push(e[a]);
                    e = s;
                }
                return ((t = t || {}),
                    {
                        setState: function (s, a) {
                            t = a ? s : N(N({}, t), s);
                            const n = e;
                            for (const e of n)
                                n[e](t);
                        },
                        subscribe: (t) => (e.push(t),
                            () => {
                                s(t);
                            }),
                        unsubscribe: s,
                        getState: () => t,
                    });
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
                    beforeLoad: () => { },
                    onLoad: () => { },
                    onNavigation: () => { },
                    onSelect: (t) => t,
                    beforeCreateDay: (t) => t,
                }),
                set(t) {
                    this.store.setState(t);
                },
                get() {
                    return this.store.getState();
                },
            }, W = {
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
                return ((e = e || s.getTimezoneOffset()),
                    s.setTime(s.getTime() + 60 * e * 1e3),
                    s);
            }
            function I(t, e) {
                const s = U(t, e);
                return ((a = s.getDate()),
                    (n = s.getMonth()),
                    `${s.getFullYear()}-${('0' + (n + 1)).slice(-2)}-${('0' + a).slice(-2)}`);
                var a, n;
            }
            function J(t, e, s) {
                const { format: a } = E.get(), { months: n, monthsShort: i } = W.get(), r = U(t, s);
                return (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e =
                    e || a).replace('dd', r.getDate().toString())).replace('DD', (r.getDate() > 9 ? r.getDate() : '0' + r.getDate()).toString())).replace('mm', (r.getMonth() + 1).toString())).replace('MMM', n[r.getMonth()])).replace('MM', (r.getMonth() + 1 > 9
                    ? r.getMonth() + 1
                    : '0' + (r.getMonth() + 1)).toString())).replace('mmm', i[r.getMonth()])).replace('yyyy', r.getFullYear().toString())).replace('YYYY', r.getFullYear().toString())).replace('YY', r.getFullYear().toString().substring(2))).replace('yy', r.getFullYear().toString().substring(2)));
            }
            function P(t) {
                const e = new Date(t);
                return Number('' +
                    e.getFullYear() +
                    (e.getMonth() + 1) +
                    (e.getDate() > 9 ? e.getDate() : '0' + e.getDate()).toString());
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
                constructor(t) {
                    this.todayDate = I(new Date());
                    this.date = new Date();
                    this.intervalRange = {};
                    this.daysSelected = [];
                    ;
                    (this.langs = W), (this.options = E), this.options.set(t);
                    const { calendar: s, selector: d } = (function (t, s) {
                        const d = {};
                        if (!v(t.selector))
                            throw new Error('You need to specify a selector!');
                        return (Y(t.selector)
                            ? (d.selector = t.selector
                                ? document.querySelector(t.selector)
                                : t.selector)
                            : (d.selector = t.selector),
                            v(d.selector)
                                ? t.selector !== e && R(d.selector, e)
                                : (d.selector = F(C('div', { class: [t.selector, e] }))),
                            (d.calendar = {}),
                            (d.calendar.navigation = A(n, d.selector)),
                            v(d.calendar.navigation) ||
                                (d.calendar.navigation = F(C('div', { class: n }), d.selector)),
                            v(t.nav[0]) &&
                                ((d.calendar.prevMonth = F(C('div', { class: o }, t.nav[0]), d.calendar.navigation)),
                                    d.calendar.prevMonth.addEventListener('click', () => s.prev.cb())),
                            (d.calendar.period = A(r, d.selector)),
                            v(d.calendar.period) ||
                                (d.calendar.period = F(C('div', { class: r }), d.calendar.navigation)),
                            v(t.nav[1]) &&
                                ((d.calendar.nextMonth = F(C('div', { class: i }, t.nav[1]), d.calendar.navigation)),
                                    d.calendar.nextMonth.addEventListener('click', () => s.next.cb())),
                            (d.calendar.week = A(h, d.selector)),
                            v(d.calendar.week) ||
                                (d.calendar.week = F(C('div', { class: h }), d.selector)),
                            (d.calendar.month = A(a, d.selector)),
                            v(d.calendar.month) ||
                                (d.calendar.month = F(C('div', { class: a }), d.selector)),
                            t.rtl && (R(d.calendar.week, l), R(d.calendar.month, l)),
                            d);
                    })(this.options.get(), {
                        prev: { cb: () => this.prev() },
                        next: { cb: () => this.next() },
                    });
                    (this.selector = d), (this.calendar = s), this.beforeCreate();
                }
                destroy() {
                    this.removeStatesClass(), this.selector.remove();
                }
                prev() {
                    const { onNavigation: t } = this.options.get(), e = this.date.getMonth() - 1;
                    this.date.setMonth(e), this.update(), t();
                }
                next() {
                    const { onNavigation: t } = this.options.get(), e = this.date.getMonth() + 1;
                    this.date.setMonth(e), this.update(), t();
                }
                prevYear() {
                    const { onNavigation: t } = this.options.get(), e = this.date.getFullYear() - 1;
                    this.date.setFullYear(e), this.update(), t();
                }
                nextYear() {
                    const { onNavigation: t } = this.options.get(), e = this.date.getFullYear() + 1;
                    this.date.setFullYear(e), this.update(), t();
                }
                update() {
                    this.clearCalendar(), this.mounted();
                }
                goToDate(t = this.todayDate) {
                    ;
                    (this.date = new Date(t)), this.date.setDate(1), this.update();
                }
                getDaySelected() {
                    const { format: t } = this.options.get();
                    return this.daysSelected
                        .sort((t, e) => P(t) - P(e))
                        .map((e) => J(e, t));
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
                    M(t) && this.options.set(t),
                        'function' == typeof e && this.options.set(e(this.options.get())),
                        this.update();
                }
                setDaysHighlight(t) {
                    ;
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
                                monthsShort: [
                                    'Jan',
                                    'Feb',
                                    'Mar',
                                    'Apr',
                                    'May',
                                    'Jun',
                                    'Jul',
                                    'Aug',
                                    'Sep',
                                    'Oct',
                                    'Nov',
                                    'Dec',
                                ],
                            },
                        })
                            .then((t) => t)
                            .then((t) => {
                            this.langs.set(t.default);
                        })
                            .then(() => this.beforeMount());
                }
                beforeMount() {
                    const { daysHighlight: t, daysSelected: e, defaultDate: s, timezoneOffset: a, minDate: n, maxDate: i, beforeLoad: r, onLoad: o, } = this.options.get();
                    (this.daysHighlight = t || []),
                        (this.daysSelected = e || []),
                        r(),
                        s &&
                            ((this.date = U(s, a)),
                                (this.defaultDate = U(s, a)),
                                this.defaultDate.setDate(this.defaultDate.getDate())),
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
                        this.handleClickInteraction(this.daysOfMonth[s], t),
                            e && this.handleMouseInteraction(this.daysOfMonth[s]);
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
                                            this.days[i].isSelected ||
                                                this.daysSelected.push(this.lastSelectedDay))
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
                                                    for (; a <= e;)
                                                        s.push(J(a)), (a = n.call(a, 1));
                                                    return s;
                                                })(this.intervalRange.begin, this.intervalRange.end)),
                                                R(t.target, g),
                                                this.intervalRange.begin > this.intervalRange.end &&
                                                    ((this.intervalRange = {}), this.removeStatesClass())),
                                        this.intervalRange.begin ||
                                            (this.intervalRange.begin = this.days[i].date),
                                        R(t.target, y)),
                                n(this.days[i]),
                                e && e(this.days[i]));
                    });
                }
                handleMouseInteraction(t) {
                    t.addEventListener('mouseover', (t) => {
                        const e = L(this.daysOfMonth, t.target);
                        if (!(!this.intervalRange.begin ||
                            (this.intervalRange.begin && this.intervalRange.end))) {
                            this.removeStatesClass();
                            for (let t = 1; t <= Object.keys(this.days).length; t++)
                                (this.days[t].isSelected = !1),
                                    _(this.days[e].date, this.intervalRange.begin) &&
                                        _(this.days[t].date, this.intervalRange.begin) &&
                                        B(this.days[t].date, this.days[e].date) &&
                                        (R(this.days[t].element, y),
                                            R(this.days[t].element, f),
                                            z(this.days[t].date, this.intervalRange.begin) &&
                                                R(this.days[t].element, d));
                        }
                    });
                }
                creatWeek(t) {
                    F(C('span', { class: s }, t), this.calendar.week);
                }
                createMonth() {
                    const t = this.date.getMonth();
                    for (; this.date.getMonth() === t;)
                        this.createDay(this.date),
                            this.date.setDate(this.date.getDate() + 1);
                    this.date.setMonth(this.date.getMonth() - 1), this.selectDay();
                }
                createDay(t) {
                    const e = t.getDate(), a = t.getDay();
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
                    const { locked: i, disableDaysOfWeek: r, disablePastDays: o, minDate: l, maxDate: h, disableDates: u, todayHighlight: S, weekStart: m, beforeCreateDay: v, } = this.options.get();
                    (this.days = this.days || {}),
                        (a !== D.SUNDAY && a !== D.SATURDAY) ||
                            (n.attributes.class.push(b), (n.isWeekend = !0)),
                        (i ||
                            (r && r.includes(a)) ||
                            (o && B(this.date, this.defaultDate)) ||
                            (l && _(l, n.date)) ||
                            (h && B(h, n.date))) &&
                            (n.attributes.class.push(c), (n.locked = !0)),
                        u && this.disabledDays(n),
                        z(this.todayDate, n.date) &&
                            ((n.isToday = !0), S && n.attributes.class.push(p)),
                        this.daysSelected.find((t) => {
                            z(t, n.date) && (n.attributes.class.push(y), (n.isSelected = !0));
                        }),
                        (function (t, e, s) {
                            return $(s, t) && q(s, e);
                        })(this.intervalRange.begin, this.intervalRange.end, n.date) &&
                            (n.attributes.class.push(f), (n.isRange = !0)),
                        z(n.date, this.intervalRange.begin) && n.attributes.class.push(d),
                        z(n.date, this.intervalRange.end) && n.attributes.class.push(g),
                        this.daysHighlight && this.highlightDays(n),
                        1 === n.day &&
                            (n.attributes.style[this.isRTL] =
                                m === D.SUNDAY
                                    ? a * (100 / Object.keys(D).length) + '%'
                                    : a === D.SUNDAY
                                        ? (Object.keys(D).length - m) *
                                            (100 / Object.keys(D).length) +
                                            '%'
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
                            _(t.date, e[0]) &&
                                B(t.date, e[1]) &&
                                (t.attributes.class.push(c), (t.locked = !0));
                        })
                        : e.map((e) => {
                            z(t.date, e) && (t.attributes.class.push(c), (t.locked = !0));
                        });
                }
                highlightDays(t) {
                    for (const e in this.daysHighlight)
                        this.daysHighlight[e].days[0] instanceof Array
                            ? this.daysHighlight[e].days.map((s) => {
                                _(t.date, s[0]) &&
                                    B(t.date, s[1]) &&
                                    this.computedAttributes(e, t);
                            })
                            : this.daysHighlight[e].days.map((s) => {
                                z(t.date, s) && this.computedAttributes(e, t);
                            });
                }
                computedAttributes(t, e) {
                    const _a = this.daysHighlight[t], { attributes: s } = _a, a = __rest(_a, ["attributes"]);
                    delete a.days, (e = N(e, a));
                    for (const t in s)
                        e.attributes[t] && s[t]
                            ? (e.attributes[t] = N(e.attributes[t], s[t]))
                            : s[t] && (e.attributes[t] = s[t]);
                    e.attributes.class.push(u), (e.isHighlight = !0);
                }
                monthsAsString(t) {
                    const { monthShort: e } = this.options.get(), { monthsShort: s, months: a } = this.langs.get();
                    return e ? s[t] : a[t];
                }
                weekAsString(t) {
                    const { weekShort: e } = this.options.get(), { daysShort: s, days: a } = this.langs.get();
                    return e ? s[t] : a[t];
                }
                mounted() {
                    this.calendar.period &&
                        (this.calendar.period.innerHTML =
                            this.monthsAsString(this.date.getMonth()) +
                                ' ' +
                                this.date.getFullYear());
                    const t = [], { weekStart: e } = this.options.get(), { daysShort: s } = this.langs.get();
                    this.calendar.week.textContent = '';
                    for (let a = e; a < s.length; a++)
                        t.push(a);
                    for (let s = 0; s < e; s++)
                        t.push(s);
                    for (const e of t)
                        this.creatWeek(this.weekAsString(e));
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
        if (document.head.querySelector(`#shopflex-hello-week-style`))
            return;
        const style = document.createElement('style');
        style.id = 'shopflex-hello-week-style';
        style.innerHTML = `.hello-week .week {
color: #42a298;
font-size: 1.2em;
}
.hello-week .day.is-weekend {
  color: #ff3860;
}
.hello-week .day.is-highlight {
  background-color: #8fbc8f;
  color: #fff;
}
.hello-week .day.is-today {
  background-color: #ff3860;
  color: #fff;
}
.hello-week .day.is-selected {
  background-color: #7fcbc3 !important;
  color: #fff !important;
}
.hello-week .day.is-begin-range,
.hello-week .day.is-end-range {
  background-color: #42a298 !important;
  color: #fff !important;
}
.hello-week .day.is-disabled {
  cursor: not-allowed;
  opacity: 0.33;
}`;
        document.head.append(style);
    }
    inject();
    const _fetch = window.fetch;
    const fetch = (endpoint, option = {}) => {
        option.mode = option.mode || 'cors';
        return _fetch(endpoint, option);
    };
    const SL_PREFIX = window.origin;
    const eventBus = window.Shopline.event;
    eventBus.on('DataReport::ViewContent', (...args) => {
        console.log('DataReport::ViewContent: ', args);
    });
    const logger = {
        log: (...args) => console.log(`[SHOPFLEX LOG]: `, ...args),
        warn: (...args) => console.warn(`[SHOPFLEX WARN]: `, ...args),
        error: (...args) => console.error(`[SHOPFLEX ERROR]: `, ...args),
    };
    const canInject = (product) => {
        return (product &&
            product.tags &&
            (product.tags === 'booking' ||
                (Array.isArray(product.tags) && product.tags.includes('booking'))));
    };
    const _productURL = decodeURIComponent(window.location.pathname).split('/');
    const gShopHandle = window.Shopline.handle;
    const gProductHandle = _productURL[_productURL.length - 1];
    let gStartTime = [];
    let gProductDetail;
    let gScheduleData;
    let gCurrentVariant;
    let gCurrentSelectedDate;
    let gIsCalendarVisible = false;
    if (!gShopHandle || !gProductHandle) {
        return logger.warn(`Failed to init global data: shop_handle = ${gShopHandle}, product_handle = ${gProductHandle}`);
    }
    const SF_SELECT_BOOKING_DATE_CLASSES = '__sf-select-booking-date';
    const SF_ADD_TO_CART_CLASSES = '__sf-add-to-cart';
    const SF_CALENDAR_CLASSES = '__sf-calendar';
    const SF_BOOKING_DATE_CLASSES = '__sf-booking-date';
    const SF_BOOKING_DATE_ACTIVE_CLASSES = '__sf-booking-active-date';
    function resetEl() {
        logger.log('resetEl...');
        const _addToCartBtn = document.querySelector('.__sl-custom-track-add-to-cart-btn');
        const _buyNowBtn = document.querySelector('.__sl-custom-track-product-detail-buy-now');
        _addToCartBtn.classList.add(SF_SELECT_BOOKING_DATE_CLASSES);
        _buyNowBtn.classList.add(SF_ADD_TO_CART_CLASSES);
        const _sfBookingDateBtn = _addToCartBtn.cloneNode(true);
        const _sfAddToCartBtn = _buyNowBtn.cloneNode(true);
        _sfBookingDateBtn.textContent = 'Select booking date';
        _sfAddToCartBtn.textContent = 'Add to cart';
        _addToCartBtn.replaceWith(_sfBookingDateBtn);
        _buyNowBtn.replaceWith(_sfAddToCartBtn);
        return Promise.resolve();
    }
    function initProductDetail() {
        return fetch(`${SL_PREFIX}/api/product/products.json?handle=${gProductHandle}`)
            .then((response) => response.json())
            .then((json) => {
            return json.products[0];
        })
            .then((product) => {
            gProductDetail = product;
            logger.log('product: ', gProductDetail);
        });
    }
    function _handleDateSelectorBtnClick(dateSelectorBtn, addToCartBtn, parent, e) {
        if (gIsCalendarVisible) {
            const els = document.querySelectorAll(`.${SF_BOOKING_DATE_CLASSES}`);
            const calendarEl = document.querySelector(`.${SF_CALENDAR_CLASSES}`);
            els.forEach((el) => parent.removeChild(el));
            gStartTime = [];
            if (calendarEl) {
                parent.removeChild(calendarEl);
                dateSelectorBtn.textContent = 'Select booking date';
            }
            gIsCalendarVisible = false;
            return;
        }
        const selectedOptionsEl = document.getElementsByClassName('attr-value active');
        let selectedOptions = [];
        for (let i = 0; i < selectedOptionsEl.length; i++) {
            selectedOptions.push(selectedOptionsEl[i].outerText);
        }
        const { id } = gProductDetail;
        const variant = gProductDetail.variants.find((item) => {
            const variantOptions = item.options || [];
            return selectedOptions.every((option) => variantOptions.includes(option));
        });
        gCurrentVariant = variant || gProductDetail.variants[0];
        logger.log(`click dateSelectorBtn: product_id=$${id}, variant = `, variant);
        return fetch('https://api.shopflex.io/reserve/sku/datePlanList?platformProductId=' +
            id +
            '&platformVariantId=' +
            variant.id)
            .then((res) => res.json())
            .then((response) => {
            if (response.code === 200) {
                return response.data;
            }
            alert(`${response.message}`);
            return Promise.reject(new Error(response.message));
        })
            .then((data) => {
            dateSelectorBtn.textContent = 'Hidden';
            const calendar = document.createElement('div');
            calendar.className = [
                'calendar ',
                'hello-week',
                SF_CALENDAR_CLASSES,
            ].join(' ');
            parent.insertBefore(calendar, addToCartBtn);
            gIsCalendarVisible = true;
            gScheduleData = data || {};
            logger.log('schedule: ', gScheduleData);
            const keys = Object.keys(gScheduleData);
            const oCalendar = new HelloWeek({
                selector: `.${SF_CALENDAR_CLASSES}`,
                format: 'YYYY-MM-DD',
                daysHighlight: [
                    {
                        days: keys,
                        backgroundColor: '#f08080',
                    },
                ],
                onSelect: () => {
                    const selectedDate = oCalendar.getDaySelected()[0];
                    if (gCurrentSelectedDate === selectedDate)
                        return;
                    const els = document.querySelectorAll(`.${SF_BOOKING_DATE_CLASSES}`);
                    els.forEach((el) => {
                        el.remove();
                    });
                    gCurrentSelectedDate = selectedDate;
                    const schedule = gScheduleData[selectedDate] || [];
                    schedule.forEach((element) => {
                        let hh = new Date(element.startTime).getHours();
                        let mm = new Date(element.startTime).getMinutes() < 10
                            ? '0' + new Date(element.startTime).getMinutes()
                            : +new Date(element.startTime).getMinutes();
                        let startTime = hh + ':' + mm;
                        hh = new Date(element.endTime).getHours();
                        mm =
                            new Date(element.endTime).getMinutes() < 10
                                ? '0' + new Date(element.endTime).getMinutes()
                                : +new Date(element.endTime).getMinutes();
                        let endTime = hh + ':' + mm;
                        let time = selectedDate + ' ' + startTime + '-' + endTime;
                        let timeBtn = document.createElement('button');
                        timeBtn.classList.add(SF_BOOKING_DATE_CLASSES);
                        timeBtn.innerHTML = `Buy it now,Get it on ${time}`;
                        timeBtn.style.background = '#ff3860';
                        timeBtn.style.cursor = 'pointer';
                        parent.insertBefore(timeBtn, addToCartBtn);
                        timeBtn.addEventListener('click', () => {
                            const activeEl = document.querySelector(`.${SF_BOOKING_DATE_ACTIVE_CLASSES}`);
                            if (activeEl) {
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
                },
            });
        });
    }
    function _handleAddToCartSelectorBtnClick(dateSelectorBtn, addToCartBtn, parent, e) {
        if (!gCurrentSelectedDate) {
            window.alert(`Select booking data first`);
            return;
        }
        const el = document.querySelector(`#product-detail-sku-quantity_productDetail input`);
        console.log('el: ', el);
        const quantity = Number((el === null || el === void 0 ? void 0 : el.value) || 1);
        const schedule = gScheduleData[gCurrentSelectedDate] || [];
        let timeRange;
        let planIds;
        schedule.forEach((element) => {
            let hh = new Date(element.startTime).getHours();
            let mm = new Date(element.startTime).getMinutes() < 10
                ? '0' + new Date(element.startTime).getMinutes()
                : +new Date(element.startTime).getMinutes();
            let startTime = hh + ':' + mm;
            hh = new Date(element.endTime).getHours();
            mm =
                new Date(element.endTime).getMinutes() < 10
                    ? '0' + new Date(element.endTime).getMinutes()
                    : +new Date(element.endTime).getMinutes();
            let endTime = hh + ':' + mm;
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
        logger.log(`properties: variant = `, gCurrentVariant);
        logger.log(`properties: startTime = `, gStartTime.join(' '));
        logger.log(`properties: selectedDate = `, gCurrentSelectedDate);
        logger.log(`properties: timeRange = `, timeRange);
        logger.log(`properties: planIds = `, planIds);
        fetch(`${SL_PREFIX}/api/carts/ajax-cart/add.js`, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                items: [
                    {
                        id: gCurrentVariant.id,
                        quantity,
                        properties: [
                            {
                                name: 'booking',
                                value: gStartTime.join(' '),
                                type: 'text',
                            },
                            {
                                name: 'Date',
                                value: gCurrentSelectedDate,
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
        }).catch((err) => logger.error('add to cart error: ', err));
        eventBus.emit('Cart::NavigateCart');
    }
    function initEvent() {
        const dateSelectorBtn = document.querySelector(`.${SF_SELECT_BOOKING_DATE_CLASSES}`);
        const addToCartBtn = document.querySelector(`.${SF_ADD_TO_CART_CLASSES}`);
        const btns = document.querySelector(`.product-button-list`);
        dateSelectorBtn.addEventListener('click', (e) => _handleDateSelectorBtnClick(dateSelectorBtn, addToCartBtn, btns, e));
        addToCartBtn.addEventListener('click', (e) => _handleAddToCartSelectorBtnClick(dateSelectorBtn, addToCartBtn, btns, e));
        return Promise.resolve();
    }
    async function main() {
        await initProductDetail();
        if (!canInject(gProductDetail))
            throw new Error('is not a booking product');
        await resetEl();
        await initEvent();
    }
    main()
        .then(() => logger.log('booking is running...'))
        .catch((err) => logger.warn('error with: ', err));
})();
