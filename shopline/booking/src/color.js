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
    exports.createHelloWeekColor = void 0;
    function blendColors(colorA, colorB, amount) {
        if (amount === void 0) { amount = 0.5; }
        var _a = colorA.match(/\w\w/g).map(function (c) { return parseInt(c, 16); }), rA = _a[0], gA = _a[1], bA = _a[2];
        var _b = colorB.match(/\w\w/g).map(function (c) { return parseInt(c, 16); }), rB = _b[0], gB = _b[1], bB = _b[2];
        var r = Math.round(rA + (rB - rA) * amount)
            .toString(16)
            .padStart(2, '0');
        var g = Math.round(gA + (gB - gA) * amount)
            .toString(16)
            .padStart(2, '0');
        var b = Math.round(bA + (bB - bA) * amount)
            .toString(16)
            .padStart(2, '0');
        return "#".concat(r).concat(g).concat(b);
    }
    exports.default = blendColors;
    var createHelloWeekColor = function (primary, secondary, selected) {
        var css = "\n.__sf-calendar .week {\n  color: ".concat(primary, "!important;\n  font-size: 1.2em;\n}\n\n.__sf-calendar .day.is-weekend {\n  color: ").concat(selected, ";\n}\n\n.__sf-calendar .day.is-highlight {\n  background-color: ").concat(secondary, ";\n  color: #fff;\n}\n\n.__sf-calendar .day.is-today {\n  background-color: ").concat(primary, ";\n  color: #fff;\n}\n\n.__sf-calendar .day.is-selected {\n  background-color: ").concat(selected, " !important;\n  color: #fff !important;\n}\n\n.__sf-calendar .day.is-begin-range,\n.__sf-calendar .day.is-end-range {\n  background-color: ").concat(primary, " !important;\n  color: #fff !important;\n}\n\n.__sf-calendar .day.is-disabled {\n  cursor: not-allowed;\n  opacity: 0.33;\n}");
        return css;
    };
    exports.createHelloWeekColor = createHelloWeekColor;
});
