import { expect } from 'chai';
import 'mocha';
import sinon from 'sinon';
import * as EncryptionHelper from './encryption-wrappers';
import { Encryption } from './encryption';

describe('Encryption', () => {
  describe('encrypt', () => {
    it('should encrypt', () => {
      const stub = sinon.stub(EncryptionHelper, 'encrypt');
      const service = new Encryption();
      service.encrypt('test');
      expect(stub.calledOnceWithExactly('test')).to.be.true;
      stub.restore();
    });
  });
  describe('decrypt', () => {
    it('should decrypt', () => {
      const stub = sinon.stub(EncryptionHelper, 'decrypt');
      const service = new Encryption();
      service.decrypt('test');
      expect(stub.calledOnceWithExactly('test')).to.be.true;
      stub.restore();
    });
  });
});
