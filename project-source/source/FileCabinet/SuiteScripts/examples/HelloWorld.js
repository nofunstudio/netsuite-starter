/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "N/log"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.onRequest = void 0;
    var log = require("N/log");
    var onRequest = function (context) {
        log.debug({
            title: "Hello World",
            details: "This is a sample SuiteScript 2.1 file"
        });
        context.response.write({
            output: JSON.stringify({
                message: "Hello from NetSuite!",
                accountId: context.request.parameters.accountId
            })
        });
    };
    exports.onRequest = onRequest;
});
