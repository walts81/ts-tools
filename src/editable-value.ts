export class EditableValue {
  // for binding purposes only
  value: string = '';

  // for ability to cancel an edit (revert)
  private valueTemp: string = '';

  private defaultValue: any;

  // expression is a delegate for setting external value
  constructor(private expression: (editable: EditableValue) => void) {}

  initValue(val?: any, isDefault = false): void {
    this.value = val == null ? '' : val.toString().trim();
    if (this.value && isDefault) {
      this.defaultValue = this.value;
    }

    this.valueTemp = this.value;
    this.expression(this);
  }

  getValue(defaultValue?: any): string {
    if (this.isEmpty()) {
      return defaultValue || this.defaultValue || '';
    }
    return ('' + this.value).trim();
  }

  sync(): void {
    this.initValue(this.value);
  }

  hasValueChanged(): boolean {
    return this.value !== this.valueTemp;
  }

  revertValue(): void {
    this.value = this.valueTemp;
    this.expression(this);
  }

  isEmpty(): boolean {
    return String.isNullOrWhitespace(this.value) || (typeof this.value !== 'string' && typeof this.value !== 'number');
  }

  getValueAsNumber(): number {
    if (this.isEmpty()) {
      return 0;
    }

    return Number(this.getValue());
  }
}
