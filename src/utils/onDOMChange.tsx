import { listen } from './listen';
import { call } from './call';

export const onDOMChange = (
  obj: Node,
  callback: (arg0: MutationRecord[] | Event) => void
) => {
  const unlistens: (() => any)[] = [];
  if (MutationObserver) {
    // define a new observer
    let obs: MutationObserver | null = new MutationObserver(function (
      mutations,
      observer
    ) {
      callback(mutations);
    });

    // have the observer observe foo for changes in children
    obs.observe(obj, { childList: true, subtree: true });
    unlistens.push(() => {
      if (obs) {
        obs.disconnect();
        obs = null;
      }
    });
  } else if (window.addEventListener != null) {
    // obj.addEventListener('DOMNodeInserted', callback, false);
    unlistens.push(listen(obj, 'DOMNodeInserted', callback, false));
    // obj.addEventListener('DOMNodeRemoved', callback, false);
    unlistens.push(listen(obj, 'DOMNodeRemoved', callback, false));
  }

  return function unlisten() {
    unlistens.forEach(call);
  };
};
