"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DeferredPromise = /** @class */ (function () {
    function DeferredPromise() {
        var _this = this;
        this.promise = new Promise(function (resolve, reject) {
            _this.resolve = resolve;
            _this.reject = reject;
        });
    }
    return DeferredPromise;
}());
exports.DeferredPromise = DeferredPromise;
var ProcessQueue = /** @class */ (function () {
    function ProcessQueue() {
        this.deferredDict = {};
    }
    ProcessQueue.prototype.isProcessing = function (payload) {
        var key = this.getKey(payload);
        var proc = this.deferredDict[key];
        if (proc) {
            return proc.isProcessing;
        }
        return false;
    };
    ProcessQueue.prototype.queue = function (payload) {
        var deferred = new DeferredPromise();
        var key = this.getKey(payload);
        var proc = this.deferredDict[key];
        if (!proc) {
            proc = { id: key, deferredList: [], isProcessing: false };
            this.deferredDict[key] = proc;
        }
        proc.deferredList.push(deferred);
        if (!proc.isProcessing) {
            proc.isProcessing = true;
            this.performAction(payload)
                .then(function (r) {
                var list = proc.deferredList.clone();
                proc.isProcessing = false;
                proc.deferredList = [];
                list.forEach(function (d) { return d.resolve(r); });
            })
                .catch(function (e) {
                var list = proc.deferredList.clone();
                proc.isProcessing = false;
                proc.deferredList = [];
                list.forEach(function (d) { return d.reject(e); });
            });
        }
        return deferred.promise;
    };
    return ProcessQueue;
}());
exports.ProcessQueue = ProcessQueue;
