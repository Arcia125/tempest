export const onDOMChange = (
  obj: Node,
  callback: (arg0: MutationRecord[] | Event) => void
) => {
  if (MutationObserver) {
    // define a new observer
    const obs = new MutationObserver(function (mutations, observer) {
      callback(mutations);
    });

    // have the observer observe foo for changes in children
    obs.observe(obj, { childList: true, subtree: true });
  } else if (window.addEventListener != null) {
    obj.addEventListener('DOMNodeInserted', callback, false);
    obj.addEventListener('DOMNodeRemoved', callback, false);
  }
};
