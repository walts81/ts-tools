declare const ENTER_KEY = 13;
declare const ESC_KEY = 27;
declare class KeyCodeHelper {
    static isEnterKey($event: any): boolean;
    static isEscKey($event: any): boolean;
    static isKeyCode($event: any, code: number): boolean;
    static getKeyCode($event: any): number;
}
export { ENTER_KEY, ESC_KEY, KeyCodeHelper };
