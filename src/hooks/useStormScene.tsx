import { useAnimation } from './useAnimation';
import { createRenderer, init, initialSceneState } from '../stormAnimation';

/**
 * @example
 * const MyComponent = () => {
 *  const [elRef, sceneRef] = useStormScene();
 *  return <button ref={elRef} />
 * }
 */
export const useStormScene = () => {
  return useAnimation(initialSceneState, init, createRenderer);
};
