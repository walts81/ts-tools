enum TimeoutType {
  InSeconds = 1,
  InMinutes = 2,
  InHours = 3,
  InDays = 4,
}

const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const MILLISECONDS_IN_MINUTE = MILLISECONDS_IN_SECOND * SECONDS_IN_MINUTE;
const MINUTES_IN_HOUR = 60;
const MILLISECONDS_IN_HOUR = MILLISECONDS_IN_MINUTE * MINUTES_IN_HOUR;
const HOURS_IN_DAY = 24;
const MILLISECONDS_IN_DAY = MILLISECONDS_IN_HOUR * HOURS_IN_DAY;

class TimeoutCachedItem<TKey, TValue> {
  protected lastRenewed: Date;
  protected value!: TValue;

  constructor(
    public key: TKey,
    private timeout: number,
    private timeoutType: TimeoutType,
    private getValueDelegate: (key: TKey) => Promise<TValue>
  ) {
    const now = new Date();
    this.lastRenewed = this.getDateOffset(now, this.timeout, this.timeoutType, false);
  }

  public async getValue(): Promise<TValue> {
    if (this.shouldRenew(this.lastRenewed, this.timeout, this.timeoutType)) {
      this.value = await this.getValueImplementation();
      this.lastRenewed = new Date();
    }
    return this.value;
  }

  protected getValueImplementation(): Promise<TValue> {
    return this.getValueDelegate(this.key);
  }

  protected shouldRenew(lastRenewed: Date, timeout: number, timeoutType: TimeoutType): boolean {
    const offset = this.getDateOffset(lastRenewed, timeout, timeoutType, true);
    const now = new Date();
    return offset <= now;
  }

  protected getDateOffset(fromDate: Date, timeout: number, timeoutType: TimeoutType, offsetAfter: boolean): Date {
    let milliseconds = 0;
    if (timeoutType === TimeoutType.InSeconds) {
      milliseconds = timeout * MILLISECONDS_IN_SECOND;
    } else if (timeoutType === TimeoutType.InHours) {
      milliseconds = timeout * MILLISECONDS_IN_HOUR;
    } else if (timeoutType === TimeoutType.InDays) {
      milliseconds = timeout * MILLISECONDS_IN_DAY;
    } else {
      milliseconds = timeout * MILLISECONDS_IN_MINUTE;
    }
    const offset = offsetAfter ? fromDate.getTime() + milliseconds : fromDate.getTime() - milliseconds;
    return new Date(offset);
  }
}

export {
  TimeoutType,
  MILLISECONDS_IN_SECOND,
  MILLISECONDS_IN_MINUTE,
  MILLISECONDS_IN_HOUR,
  MILLISECONDS_IN_DAY,
  TimeoutCachedItem,
};
