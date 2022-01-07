import * as EncryptionHelper from './encryption-wrappers';

export class Encryption {
  encrypt(data: string) {
    return EncryptionHelper.encrypt(data);
  }

  decrypt(data: string) {
    return EncryptionHelper.decrypt(data);
  }

  encryptAsync(data: string) {
    return new Promise<string>(resolve => {
      const result = this.encrypt(data);
      resolve(result);
    });
  }

  decryptAsync(data: string) {
    return new Promise<string>(resolve => {
      const result = this.decrypt(data);
      resolve(result);
    });
  }
}
