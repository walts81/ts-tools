import { expect } from 'chai';
import 'mocha';
import { EditableValue } from './editable-value';

describe('EditableValue', () => {
  describe('isEmpty', () => {
    it('should return true when no value', () => {
      const service = new EditableValue(x => {});
      const result = service.isEmpty();
      expect(result).to.equal(true);
    });

    it('should return true when whitespace', () => {
      const service = new EditableValue(x => {});
      service.value = '   ';
      const result = service.isEmpty();
      expect(result).to.equal(true);
    });

    it('should return false when non-whitespace', () => {
      const service = new EditableValue(x => {});
      service.value = 'test';
      const result = service.isEmpty();
      expect(result).to.equal(false);
    });

    it('should return true when not a string or number', () => {
      const service = new EditableValue(x => {});
      (service as any).value = { value: 'not a string ;)' };
      const result = service.isEmpty();
      expect(result).to.equal(true);
    });

    it('should return false when value is number type', () => {
      const service = new EditableValue(x => {});
      (service as any).value = 1;
      const result = service.isEmpty();
      expect(result).to.equal(false);
    });
  });

  describe('hasValueChanged', () => {
    it('should return false when value has not changed', () => {
      const service = new EditableValue(x => {});
      service.initValue('test');
      const result = service.hasValueChanged();
      expect(result).to.equal(false);
    });

    it('should return true when value changes', () => {
      const service = new EditableValue(x => {});
      service.initValue('test');
      service.value = 'another test';
      const result = service.hasValueChanged();
      expect(result).to.equal(true);
    });
  });

  describe('getValue', () => {
    it('should return trimmed value', () => {
      const orig = 'test';
      const service = new EditableValue(x => {});
      service.initValue(orig);
      service.value = ' test ';
      const result = service.getValue();
      expect(result).to.equal(orig);
    });

    it('should return empty string when no value and no default specified', () => {
      const service = new EditableValue(x => {});
      service.initValue();
      const result = service.getValue();
      expect(result).to.equal('');
    });

    it('should return specified default when no value', () => {
      const service = new EditableValue(x => {});
      const def = 'test';
      const result = service.getValue(def);
      expect(result).to.equal(def);
    });

    it('should not return specified default when value exists', () => {
      const service = new EditableValue(x => {});
      const orig = 'test';
      const def = 'default';
      service.initValue(orig);
      const result = service.getValue(def);
      expect(result).to.not.equal(def);
      expect(result).to.equal(orig);
    });

    it('should return inited default when specified and no value', () => {
      const service = new EditableValue(x => {});
      const def = 'default';
      service.initValue(def, true);
      (service as any).value = undefined;
      const result = service.getValue();
      expect(result).to.equal(def);
    });

    it('should return string value when numeric', () => {
      const service = new EditableValue(x => {});
      (service as any).value = 1;
      const result = service.getValue();
      expect(result).to.equal('1');
    });
  });

  describe('sync', () => {
    it('should reset hasValueChanged', () => {
      const service = new EditableValue(x => {});
      const orig = 'test';
      const val = 'another test';
      service.initValue(orig);
      service.value = val;
      expect(service.hasValueChanged()).to.equal(true);
      service.sync();
      expect(service.hasValueChanged()).to.equal(false);
      const result = service.getValue();
      expect(result).to.equal(val);
    });

    it('should set external value', () => {
      let external = '';
      const service = new EditableValue(x => (external = x.getValue()));
      const val = 'test';
      service.value = val;
      service.sync();
      expect(external).to.equal(val);
    });

    it('should reset revert value', () => {
      const service = new EditableValue(x => {});
      const orig = 'test';
      const val = 'another test';
      service.initValue(orig);
      service.value = val;
      service.sync();
      service.revertValue(); // <-- should do nothing since we "synced"
      expect(service.getValue()).to.equal(val);
    });
  });

  describe('revertValue', () => {
    it('should reset value to previous inited value', () => {
      const orig = 'test';
      const service = new EditableValue(x => {});
      service.initValue(orig);
      service.value = 'another test';
      expect(service.getValue()).to.not.equal(orig);
      service.revertValue();
      expect(service.getValue()).to.equal(orig);
    });

    it('should set external value', () => {
      let external = '';
      const orig = 'test';
      const service = new EditableValue(x => (external = x.getValue()));
      service.initValue(orig);
      service.value = 'another test';
      service.revertValue();
      expect(external).to.equal(orig);
    });
  });

  describe('getValueAsNumber', () => {
    it('should return zero when empty', () => {
      const service = new EditableValue(x => {});
      const result = service.getValueAsNumber();
      expect(result).to.equal(0);
    });

    it('should return zero when value is not a number', () => {
      const service = new EditableValue(x => {});
      (service as any).value = { value: 'not a number ;)' };
      const result = service.getValueAsNumber();
      expect(result).to.equal(0);
    });

    it('should return numeric version of value', () => {
      const service = new EditableValue(x => {});
      service.value = '1';
      const result = service.getValueAsNumber();
      expect(result).to.equal(1);
    });
  });
});
