export declare class NaturalSortHelper {
    getNaturalValueFn: (field1: any, field2?: any) => (item: any) => string;
    naturalSort: (a: any, b: any, desc?: boolean | undefined) => number;
    getNaturalValue: (value: any) => string;
    private padding;
    private safeString;
}
