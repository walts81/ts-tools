import { Logger } from './logging/logger';
import { LogLevel } from './logging/log-level';
export declare class ClonedValue<T> {
    private name;
    private getOriginalValueFn;
    private defaultValue;
    private onCloned;
    private logger?;
    private _orig;
    private _clonedValue;
    readonly value: T;
    readonly originalValue: T;
    constructor(name: string, getOriginalValueFn: () => T, defaultValue?: any, onCloned?: (val: T) => void, logger?: Logger | undefined);
    revert(): void;
    update(val: T): void;
    hasChanged(): boolean;
    logDiff(level?: LogLevel): void;
    protected logAtLevel(level: LogLevel, message: any): void;
    private updateValue;
}
