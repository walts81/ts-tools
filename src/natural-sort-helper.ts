export class NaturalSortHelper {
  getNaturalValueFn = (field1: any, field2?: any): ((item: any) => string) => {
    return (item: any) => {
      let val = item[field1];
      if (field2) {
        val = val[field2];
      }
      return this.getNaturalValue(val);
    };
  }

  naturalSort = (a: any, b: any, desc?: boolean): number => {
    a = this.getNaturalValue(a);
    b = this.getNaturalValue(b);
    if (a < b) { return desc ? 1 : -1; }

    if (a > b) { return desc ? -1 : 1; }

    return 0;
  }

  getNaturalValue = (value: any): string => {
    return this.safeString(value).replace(/(\d+)((\.\d+)+)?/g, ($0: any, integer: any, decimal: any, $3: any) => {
      if (decimal !== $3) {
        return $0.replace(/(\d+)/g, ($d: any) => {
          return this.padding($d) + $d;
        });
      } else {
        if (!decimal) {
          decimal = '.0';
        }
        for (let i = decimal.length - 1; i >= 0; i--) {
          if (decimal[i] === '0') {
            if (i - 1 >= 0 && decimal[i - 1] !== '.') {
              decimal = decimal.substr(0, i);
            }
          }
        }
        return this.padding(integer) + integer + decimal + this.padding(decimal);
      }
    });
  }

  private padding(value: any): string {
    return '00000000000000000000'.slice(0, value.length);
  }

  private safeString(value: any): string {
    if (value == null) {
      return '';
    }
    return ('' + value).trim();
  }
}
