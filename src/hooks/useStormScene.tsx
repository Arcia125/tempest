import { initialSceneState, init, createRenderer } from '../stormAnimation';
import { useAnimation } from './useAnimation';

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
