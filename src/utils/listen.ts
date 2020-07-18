type AddEventListenerParams = Parameters<typeof window["addEventListener"]>;

export const listen = (target: Window | Node, eventName: AddEventListenerParams[0], handler: AddEventListenerParams[1], opts?: AddEventListenerParams[2]) => {
  target.addEventListener(eventName, handler, opts);
  return function unlisten() {
    target.removeEventListener(eventName, handler);
  };
};
