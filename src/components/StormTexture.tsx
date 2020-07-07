/**
Copyright (c) 2020 by Liam Egan (https://codepen.io/shubniggurath/pen/BVKgJK)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import React, { FC, useRef, useEffect } from 'react';

import { initialSceneState, init, createRenderer } from '../stormAnimation';

const useStormScene = () => {
  const sceneState = useRef(initialSceneState);
  const element = useRef(null);
  useEffect(() => {
    console.log('effect started');
    console.log(element.current);
    if (element.current == null)
      throw new Error(
        'Make sure to pass the ref returned from useStormScene to a domElement'
      );
    init(element.current!, sceneState.current).then(() => {
      // animate();
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
  });

  return element;
};

export const StormTexture: FC = (props) => {
  const el = useStormScene();

  return <div style={{ position: 'fixed', top: 0, zIndex: -1 }} ref={el}></div>;
};
