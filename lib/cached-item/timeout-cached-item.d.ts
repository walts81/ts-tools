declare enum TimeoutType {
    InSeconds = 1,
    InMinutes = 2,
    InHours = 3,
    InDays = 4
}
declare const MILLISECONDS_IN_SECOND = 1000;
declare const MILLISECONDS_IN_MINUTE: number;
declare const MILLISECONDS_IN_HOUR: number;
declare const MILLISECONDS_IN_DAY: number;
declare class TimeoutCachedItem<TKey, TValue> {
    key: TKey;
    private timeout;
    private timeoutType;
    private getValueDelegate;
    protected lastRenewed: Date;
    protected value: TValue;
    constructor(key: TKey, timeout: number, timeoutType: TimeoutType, getValueDelegate: (key: TKey) => Promise<TValue>);
    getValue(): Promise<TValue>;
    protected getValueImplementation(): Promise<TValue>;
    protected shouldRenew(lastRenewed: Date, timeout: number, timeoutType: TimeoutType): boolean;
    protected getDateOffset(fromDate: Date, timeout: number, timeoutType: TimeoutType, offsetAfter: boolean): Date;
}
export { TimeoutType, MILLISECONDS_IN_SECOND, MILLISECONDS_IN_MINUTE, MILLISECONDS_IN_HOUR, MILLISECONDS_IN_DAY, TimeoutCachedItem, };
