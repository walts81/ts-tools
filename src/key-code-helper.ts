const ENTER_KEY = 13;
const ESC_KEY = 27;

export class KeyCodeHelper {
  static isEnterKey($event: any): boolean {
    return KeyCodeHelper.isKeyCode($event, ENTER_KEY);
  }

  static isEscKey($event: any): boolean {
    return KeyCodeHelper.isKeyCode($event, ESC_KEY);
  }

  static isKeyCode($event: any, code: number): boolean {
    let keyCode = KeyCodeHelper.getKeyCode($event);
    return keyCode === code;
  }

  static getKeyCode($event: any): number {
    let keyCode = $event.which;
    if (!keyCode && keyCode !== 0) {
      keyCode = $event.keyCode;
      if (!keyCode && keyCode !== 0) {
        keyCode = $event.charCode;
      }
    }
    return keyCode;
  }
}
