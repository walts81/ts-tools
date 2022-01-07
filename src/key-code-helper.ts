export const ENTER_KEY = 13;
export const ESC_KEY = 27;

export const getKeyCode = ($event: any): number => {
  let keyCode = $event.which;
  if (!keyCode && keyCode !== 0) {
    keyCode = $event.keyCode;
    if (!keyCode && keyCode !== 0) {
      keyCode = $event.charCode;
    }
  }
  return keyCode;
};

export const isKeyCode = ($event: any, code: number): boolean => {
  return code === getKeyCode($event);
};

export const isEnterKey = ($event: any): boolean => {
  return isKeyCode($event, ENTER_KEY);
};

export const isEscKey = ($event: any): boolean => {
  return isKeyCode($event, ESC_KEY);
};
