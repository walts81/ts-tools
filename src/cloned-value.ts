import { Logger } from './logging/logger';
import { LogLevel } from './logging/log-level';
import { cloneValue } from './clone-value';
import { areObjectsEquivalent } from './equivalent-objects';

export class ClonedValue<T> {
  private _orig: T;
  private _clonedValue: T;

  get value(): T {
    if (this._clonedValue) {
      return this._clonedValue;
    }
    const orig = this.originalValue;
    if (orig != null) {
      this.updateValue(orig, false);
    }
    return (this._clonedValue || this.defaultValue) as T;
  }

  get originalValue(): T {
    if (!this._orig) {
      this._orig = cloneValue(this.getOriginalValueFn());
      this.logAtLevel(LogLevel.Info, `${this.name}: updated original value`);
    }
    return cloneValue(this._orig);
  }

  constructor(
    private name: string,
    private getOriginalValueFn: () => T,
    private defaultValue: any = {},
    private onCloned: (val: T) => void = () => {},
    private logger?: Logger
  ) {}

  revert() {
    this.updateValue(this.originalValue, false);
  }

  update(val: T) {
    this.updateValue(val, true);
  }

  hasChanged() {
    const a = cloneValue(this._orig);
    const b = cloneValue(this._clonedValue);
    const areSame = areObjectsEquivalent(a, b);
    return !areSame;
  }

  logDiff(level: LogLevel = LogLevel.Info) {
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

  protected logAtLevel(level: LogLevel, message: any) {
    const logger = this.logger as any;
    if (!!logger && !!logger.logAtLevel) {
      logger.logAtLevel(level, message);
    }
  }

  private updateValue(val: T, isExternalUpdate: boolean) {
    this._orig = val;
    const clone = cloneValue(val);
    if (!!clone) {
      this.onCloned(clone);
    }
    this._clonedValue = clone;
    if (isExternalUpdate) {
      this.logAtLevel(LogLevel.Info, `${this.name}: updated externally`);
    }
    this.logDiff();
  }
}
