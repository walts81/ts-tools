"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessQueue = exports.DeferredPromise = void 0;
class DeferredPromise {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}
exports.DeferredPromise = DeferredPromise;
class ProcessQueue {
    constructor() {
        this.deferredDict = {};
    }
    isProcessing(payload) {
        const key = this.getKey(payload);
        const proc = this.deferredDict[key];
        if (proc) {
            return proc.isProcessing;
        }
        return false;
    }
    queue(payload) {
        const deferred = new DeferredPromise();
        const key = this.getKey(payload);
        let proc = this.deferredDict[key];
        if (!proc) {
            proc = { id: key, deferredList: [], isProcessing: false };
            this.deferredDict[key] = proc;
        }
        proc.deferredList.push(deferred);
        if (!proc.isProcessing) {
            proc.isProcessing = true;
            this.performAction(payload)
                .then(r => {
                const list = proc.deferredList.clone(false);
                proc.isProcessing = false;
                proc.deferredList = [];
                list.forEach(d => d.resolve(r));
            })
                .catch(e => {
                const list = proc.deferredList.clone(false);
                proc.isProcessing = false;
                proc.deferredList = [];
                list.forEach(d => d.reject(e));
            });
        }
        return deferred.promise;
    }
}
exports.ProcessQueue = ProcessQueue;
