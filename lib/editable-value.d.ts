export declare class EditableValue {
    private expression;
    value: string;
    private valueTemp;
    private defaultValue;
    constructor(expression: (editable: EditableValue) => void);
    initValue(val?: any, isDefault?: boolean): void;
    getValue(defaultValue?: any): string;
    sync(): void;
    hasValueChanged(): boolean;
    revertValue(): void;
    isEmpty(): boolean;
    getValueAsNumber(): number;
}
