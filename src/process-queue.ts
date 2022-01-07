export class DeferredPromise<T> {
  promise: Promise<T>;
  resolve: any;
  reject: any;

  constructor() {
    this.promise = new Promise<T>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

interface DeferredDictionary<T> {
  [key: string]: {
    id: string;
    deferredList: DeferredPromise<T>[];
    isProcessing: boolean;
  };
}

export abstract class ProcessQueue<T, TResult> {
  protected deferredDict: DeferredDictionary<TResult> = {};

  isProcessing(payload: T): boolean {
    const key = this.getKey(payload);
    const proc = this.deferredDict[key];
    if (proc) {
      return proc.isProcessing;
    }
    return false;
  }

  queue(payload: T): Promise<TResult> {
    const deferred = new DeferredPromise<TResult>();
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
          const list = proc.deferredList.clone(true);
          proc.isProcessing = false;
          proc.deferredList = [];
          list.forEach(d => d.resolve(r));
        })
        .catch(e => {
          const list = proc.deferredList.clone(true);
          proc.isProcessing = false;
          proc.deferredList = [];
          list.forEach(d => d.reject(e));
        });
    }

    return deferred.promise;
  }

  protected abstract performAction(payload: T): Promise<TResult>;

  protected abstract getKey(payload: T): string;
}
