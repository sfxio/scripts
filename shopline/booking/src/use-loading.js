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
    function useLoading() {
        var isLoading = false;
        var run = function (promise, timeout) {
            if (timeout === void 0) { timeout = 0; }
            isLoading = true;
            var timer = null;
            if (timeout) {
                timer = setTimeout(function () {
                    isLoading = false;
                }, timeout);
            }
            var cleanup = function () {
                isLoading = false;
                if (timer) {
                    clearTimeout(timer);
                    timer = null;
                }
            };
            promise = promise
                .then(function (res) {
                cleanup();
                return res;
            })
                .catch(function (err) {
                cleanup();
                throw err;
            });
            return promise;
        };
        return {
            isLoading: isLoading,
            run: run,
        };
    }
    exports.default = useLoading;
});
