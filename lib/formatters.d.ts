declare enum PercentOperation {
    NoOp = 0,
    DivideBy100 = 1,
    MultiplyBy100 = 2
}
declare const formatCurrency: (value: number | string, cents?: boolean, locale?: string, currency?: string) => string;
declare const isDate: (value: any) => boolean;
declare const isValidDate: (date: any) => boolean;
declare const formatDate: (date: string | Date, format?: string) => string;
declare const formatPercent: (value: number | string, decimals?: number, operation?: PercentOperation, includeSymbol?: boolean) => string;
export { PercentOperation, formatCurrency, formatPercent, formatDate, isDate, isValidDate };
