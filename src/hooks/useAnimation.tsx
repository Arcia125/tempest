import { useRef, useEffect, MutableRefObject } from 'react';

import { Animation } from '../types';

export function useAnimation(
  initialScene: Animation.SceneState,
  initFn: (
    container: HTMLElement,
    sceneRef: Animation.SceneState
  ) => Promise<void>,
  createRenderFn: (sceneRef: Animation.SceneState) => (delta?: number) => void
): [
  MutableRefObject<HTMLElement | null>,
  MutableRefObject<Animation.SceneState>
] {
  const sceneRef = useRef(initialScene);
  const elRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (elRef.current == null)
      throw new Error(
        'Make sure to pass the ref returned from useAnimation to a domElement'
      );

    initFn(elRef.current!, sceneRef.current).then(() => {
      const render = createRenderFn(sceneRef.current);
      const animate = function animate(delta?: number) {
        requestAnimationFrame(animate);
        render(delta);
      };
      animate();
    });

    return () => {
      console.log('effect cleanup');
    };
  }, [createRenderFn, initFn]);

  return [elRef, sceneRef];
}
