import { Logger } from './logging/logger';
import { LogLevel } from './logging/log-level';
import { cloneValue } from './clone-value';
import { areObjectsEquivalent } from './equivalent-objects';

export class ClonedValue<T> {
  private _orig: T;
  private _clonedValue: T;

  get value(): T {
    if (!!this._clonedValue) {
      return this._clonedValue;
    }
    const orig = this.originalValue;
    if (orig != null) {
      this.updateValue(orig, false);
    }
    return this._clonedValue || this.defaultValue;
  }
  set value(val: T) {
    this.updateValue(val, true);
  }

  get originalValue(): T {
    if (!this._orig) {
      this.initValue();
    }
    return cloneValue(this._orig);
  }

  constructor(
    public readonly name: string,
    private readonly getOriginalValueFn: () => T,
    private readonly defaultValue: T = null as any,
    private readonly onCloned: (val: T) => void = () => {},
    private readonly logger?: Logger
  ) {
    this.initValue();
  }

  revert() {
    this.updateValue(this.originalValue, false);
  }

  hasChanged() {
    const a = cloneValue(this.value);
    const b = cloneValue(this.originalValue);
    const areSame = areObjectsEquivalent(a, b);
    return !areSame;
  }

  sync() {
    this._orig = cloneValue(this._clonedValue);
  }

  logDiff(level: LogLevel = LogLevel.Info) {
    if (!this.canLog()) return;
    if (this.hasChanged()) {
      this.logAtLevel(level, `${this.name}: Has differences`);
      this.logAtLevel(level, `${this.name} - Original:`);
      this.logAtLevel(level, cloneValue(this._orig));
      this.logAtLevel(level, `  ${this.name} - Cloned:`);
      this.logAtLevel(level, cloneValue(this._clonedValue));
    } else {
      this.logAtLevel(level, `${this.name}: No differences`);
    }
  }

  private initValue() {
    this._orig = cloneValue(this.getOriginalValueFn());
    this.logAtLevel(LogLevel.Info, `${this.name}: updated original value`);
  }

  protected logAtLevel(level: LogLevel, message: any) {
    if (this.canLog()) {
      (this.logger as any).logAtLevel(level, message);
    }
  }

  private updateValue(val: T, isExternalUpdate: boolean) {
    const clone = cloneValue(val);
    if (!!clone && isExternalUpdate) {
      this.onCloned(clone);
    }
    this._clonedValue = clone;
    if (isExternalUpdate) {
      this.logAtLevel(LogLevel.Info, `${this.name}: updated externally`);
    }
    this.logDiff();
  }

  private canLog() {
    const logger = this.logger as any;
    return !!logger && !!logger.logAtLevel;
  }
}
