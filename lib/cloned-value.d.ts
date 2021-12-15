import { Logger } from './logging/logger';
import { LogLevel } from './logging/log-level';
export declare class ClonedValue<T> {
    readonly name: string;
    private readonly getOriginalValueFn;
    private readonly defaultValue;
    private readonly onCloned;
    private readonly logger?;
    private _orig;
    private _clonedValue;
    get value(): T;
    set value(val: T);
    get originalValue(): T;
    constructor(name: string, getOriginalValueFn: () => T, defaultValue?: T, onCloned?: (val: T) => void, logger?: Logger | undefined);
    revert(): void;
    hasChanged(): boolean;
    sync(): void;
    logDiff(level?: LogLevel): void;
    private initValue;
    protected logAtLevel(level: LogLevel, message: any): void;
    private updateValue;
    private canLog;
}
