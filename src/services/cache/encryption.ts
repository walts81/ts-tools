export class Encryption {
  encrypt(data: string) {
    return btoa(data);
  }

  decrypt(data: string) {
    return atob(data);
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
