import { useRef, useEffect } from 'react';

import { initialSceneState, init, createRenderer } from '../stormAnimation';

/**
 * @example
 * const MyComponent = () => {
 *  const ref = useStormScene();
 *  return <button ref={ref} />
 * }
 */
export const useStormScene = () => {
  const sceneState = useRef(initialSceneState);
  const element = useRef(null);

  useEffect(() => {
    if (element.current == null)
      throw new Error(
        'Make sure to pass the ref returned from useStormScene to a domElement'
      );

    init(element.current!, sceneState.current).then(() => {
      const render = createRenderer(sceneState.current);
      const animate = function animate(delta?: number) {
        requestAnimationFrame(animate);
        render(delta);
      };
      animate();
    });

    return () => {
      console.log('effect cleanup');
    };
  }, []);

  return element;
};
